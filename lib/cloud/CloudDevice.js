"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
const homey_oauth2app_1 = require("homey-oauth2app");
const AirthingsDefinitions_1 = require("../../types/AirthingsDefinitions");
const Capabilities_1 = require("../Capabilities");
const ignoredDataKeys = ['relayDeviceType', 'rssi'];
const DEVICE_OFFLINE_MINUTES = 30;
class CloudDevice extends homey_oauth2app_1.OAuth2Device {
    constructor() {
        super(...arguments);
        this.debugEnabled = false;
        this.oldData = false;
    }
    async onOAuth2Init() {
        this.debugEnabled = homey_1.default.env.DEBUG === '1';
        await super.onOAuth2Init();
        // Add new display capabilities, but not the US variants
        const radonCapabilities = [
            AirthingsDefinitions_1.airthingsCapability_measure_radon_display,
            AirthingsDefinitions_1.airthingsCapability_measure_radon_us,
            AirthingsDefinitions_1.airthingsCapability_alarm_radon_display,
            AirthingsDefinitions_1.airthingsCapability_alarm_radon_us,
        ];
        if (this.hasCapability(AirthingsDefinitions_1.airthingsCapability_measure_radon)) {
            await this.addCapabilityWhenNotAdded(radonCapabilities);
        }
        else {
            await this.removeCapabilityWhenAdded(radonCapabilities);
        }
        // Always clear warning on start
        this.setWarning(null).catch(this.error);
        const dataStore = this.getData();
        if (dataStore.id) {
            this.deviceId = dataStore.id;
            this.log('This device was added with the new device data');
        }
        else {
            this.oldData = true;
            this.deviceId = dataStore.apiDevice.id;
            this.log('This device was added with the old device data');
        }
        this.debug('Language/units/device units', this.homey.i18n.getLanguage(), this.homey.i18n.getUnits());
        this.debug('Device id', this.deviceId);
        // Setup alarm available settings labels
        this.settings = this.getSettings();
        const settingsUpdate = {};
        Object.keys(this.settings).forEach(settingKey => {
            if (settingKey.includes('_available')) {
                const available = this.hasCapability(`alarm_${settingKey.split('_available')[0]}`);
                settingsUpdate[settingKey] = this.homey.__(available ? 'yes' : 'no');
            }
        });
        await this.setSettings(settingsUpdate).catch(this.error);
        // Retrieve initial device values
        await this.pollValues().catch(this.error);
        this.poller = this.homey.setInterval(() => this.pollValues().catch(this.error), Number(homey_1.default.env.POLL_INTERVAL_MINUTES) * 60 * 1000);
        this.homey.setTimeout(() => this.homey.app.checkDuplications(this.deviceId), 5000);
    }
    async onOAuth2Uninit() {
        if (this.poller) {
            this.homey.clearInterval(this.poller);
        }
        await super.onOAuth2Uninit();
    }
    markDuplicated(id) {
        if (!this.oldData || id !== this.deviceId) {
            return;
        }
        this.log('Marking this device as duplicated');
        this.setWarning(this.homey.__('duplicated')).catch(this.error);
    }
    async onSettings(data) {
        this.debug('Settings update', data);
        if (data.changedKeys.includes(AirthingsDefinitions_1.setting_radon_units) && !this.hasCapability(AirthingsDefinitions_1.airthingsCapability_measure_radon_us)) {
            throw new Error(this.homey.__('unit_selection_not_available'));
        }
        this.settings = data.newSettings;
        await Promise.all(this.getCapabilities().map(async (capability) => {
            if (!capability.startsWith('measure_')) {
                return Promise.resolve();
            }
            await this.updateAlarmValue(capability).catch(this.error);
        })).catch(this.error);
        await this.buildRadonDisplayValue().catch(this.error);
    }
    async pollValues() {
        this.log('Polling for values');
        const data = await this.oAuth2Client.getDeviceLatestValues(this.deviceId);
        this.debug('Retrieved data', JSON.stringify(data));
        await Promise.all(Object.keys(data)
            .map((k) => this.parseDataValue(k, data[k]).catch(this.error)));
        await this.buildRadonDisplayValue();
    }
    async buildRadonDisplayValue() {
        // Use US formatting when units has been set to US and the US capabilities have been added
        const isUs = this.settings[AirthingsDefinitions_1.setting_radon_units] === AirthingsDefinitions_1.US_Units
            && this.hasCapability(AirthingsDefinitions_1.airthingsCapability_measure_radon_us)
            && this.hasCapability(AirthingsDefinitions_1.airthingsCapability_alarm_radon_us);
        let value = new Intl.NumberFormat(this.homey.i18n.getLanguage(), {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(isUs
            ? this.getCapabilityValue(AirthingsDefinitions_1.airthingsCapability_measure_radon_us)
            : this.getCapabilityValue(AirthingsDefinitions_1.airthingsCapability_measure_radon));
        if (isUs) {
            value += ' pCi/L';
        }
        else {
            value += ' Bq/m³';
        }
        await this.setCapabilityValue(AirthingsDefinitions_1.airthingsCapability_measure_radon_display, value).catch(this.error);
        await this.setCapabilityValue(AirthingsDefinitions_1.airthingsCapability_alarm_radon_display, isUs
            ? this.getCapabilityValue(AirthingsDefinitions_1.airthingsCapability_alarm_radon_us)
            : this.getCapabilityValue(AirthingsDefinitions_1.airthingsCapability_alarm_radon)).catch(this.error);
    }
    async parseDataValue(dataKey, value) {
        this.debug('Parsing data value', dataKey, value);
        if (dataKey === 'time' && typeof value === 'number') {
            const deviceTime = value + (DEVICE_OFFLINE_MINUTES * 60);
            const localTime = (new Date()).getTime() / 1000;
            this.debug('Time information', JSON.stringify({ deviceTime, localTime }));
            if (deviceTime < localTime) {
                this.log('Device is unavailable');
                if (this.getAvailable()) {
                    this.setUnavailable(this.homey.__('unavailable')).catch(this.error);
                }
            }
            else {
                this.log('Device is available');
                if (!this.getAvailable()) {
                    this.setAvailable().catch(this.error);
                }
            }
            return;
        }
        const capabilities = (0, Capabilities_1.sensorDataKeyToCapability)(dataKey);
        if (capabilities) {
            for (const capability of capabilities) {
                await this.updateCapabilityValue(capability, value).catch(this.error);
            }
            // Data was handled
            return;
        }
        if (ignoredDataKeys.includes(dataKey)) {
            // Ignored data keys
            return;
        }
        this.log('Unknown data key', dataKey, value);
    }
    async updateCapabilityValue(capability, value) {
        if (!this.hasCapability(capability)) {
            this.log('Capability not available', capability, value);
            return Promise.resolve();
        }
        // Special case when setting US radon value, the value needs to be converted
        if (capability === AirthingsDefinitions_1.airthingsCapability_measure_radon_us && typeof value === 'number') {
            value = Math.round(value / 37 * 100) / 100;
        }
        this.log('Setting capability value', capability, value);
        await this.setCapabilityValue(capability, value).catch(this.error);
        await this.updateAlarmValue(capability, value).catch(this.error);
    }
    async updateAlarmValue(capability, value) {
        value ??= this.getCapabilityValue(capability);
        const key = capability.split('measure_')[1];
        const alarmCapability = `alarm_${key}`;
        if (!this.hasCapability(alarmCapability)) {
            return;
        }
        let high;
        let low = null;
        switch (capability) {
            case 'measure_humidity':
            case 'measure_temperature':
                // High/low threshold
                high = this.settings[`${key}_high_threshold`];
                low = this.settings[`${key}_low_threshold`];
                break;
            default:
                // High threshold
                high = this.settings[`${key}_threshold`];
        }
        const alarmActive = typeof value === 'number' && ((high !== null && high <= value) || (low !== null && low > value));
        await this.setCapabilityValue(alarmCapability, alarmActive);
    }
    async addCapabilityWhenNotAdded(capabilities) {
        for (const capability of capabilities) {
            this.debug('Checking capability', capability);
            if (this.hasCapability(capability)) {
                continue;
            }
            this.debug('Adding capability', capability);
            await this.addCapability(capability).catch(this.error);
        }
    }
    async removeCapabilityWhenAdded(capabilities) {
        for (const capability of capabilities) {
            this.debug('Checking capability', capability);
            if (!this.hasCapability(capability)) {
                continue;
            }
            this.debug('Removing capability', capability);
            await this.removeCapability(capability).catch(this.error);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log(...args) {
        super.log(`[d:${this.deviceId}]`, ...args);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug(...args) {
        if (!this.debugEnabled) {
            return;
        }
        super.log(`[d:${this.deviceId}]`, ...args);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(...args) {
        super.error(`[d:${this.deviceId}]`, ...args);
    }
}
exports.default = CloudDevice;
//# sourceMappingURL=CloudDevice.js.map