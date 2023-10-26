"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
const homey_oauth2app_1 = require("homey-oauth2app");
const AirthingsDefinitions_1 = require("../../types/AirthingsDefinitions");
const Capabilities_1 = require("../Capabilities");
const AirthingsUtil_1 = __importDefault(require("../AirthingsUtil"));
const ignoredDataKeys = ['relayDeviceType', 'rssi'];
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
        await AirthingsUtil_1.default.airthingsInit(this);
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
        await AirthingsUtil_1.default.handleSettings(this, data);
    }
    async pollValues() {
        this.log('Polling for values');
        const data = await this.oAuth2Client.getDeviceLatestValues(this.deviceId);
        this.debug('Retrieved data', JSON.stringify(data));
        await Promise.all(Object.keys(data)
            .map((k) => this.parseDataValue(k, data[k]).catch(this.error)));
        await AirthingsUtil_1.default.buildRadonDisplayValue(this);
        return true;
    }
    async parseDataValue(dataKey, value) {
        this.debug('Parsing data value', dataKey, value);
        if (dataKey === 'time' && typeof value === 'number') {
            const deviceTime = value + (homey_1.default.env.DEVICE_OFFLINE_MINUTES * 60);
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
                await AirthingsUtil_1.default.updateCapabilityValue(this, capability, value).catch(this.error);
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