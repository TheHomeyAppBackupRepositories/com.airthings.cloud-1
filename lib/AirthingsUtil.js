"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
const AirthingsDefinitions_1 = require("../types/AirthingsDefinitions");
class AirthingsUtil {
    static async airthingsInit(device) {
        // Setup alarm available settings labels
        device.settings = device.getSettings();
        const settingsUpdate = {};
        Object.keys(device.settings).forEach(settingKey => {
            if (settingKey.includes('_available')) {
                const available = device.hasCapability(`alarm_${settingKey.split('_available')[0]}`);
                settingsUpdate[settingKey] = device.homey.__(available ? 'yes' : 'no');
            }
        });
        await device.setSettings(settingsUpdate).catch(device.error);
        const pollMinutes = Number(homey_1.default.env.POLL_INTERVAL_MINUTES);
        let pollCounter = pollMinutes;
        // Retrieve initial device values
        await device.pollValues()
            .then(success => pollCounter = success ? 0 : pollCounter)
            .catch(device.error);
        // Setup poller
        device.poller = device.homey.setInterval(async () => {
            if (++pollCounter < pollMinutes) {
                return;
            }
            device.pollValues()
                .then(success => pollCounter = success ? 0 : pollCounter) // Reset on success
                .catch(device.error);
        }, 60 * 1000);
    }
    static async updateCapabilityValue(device, capability, value) {
        if (!device.hasCapability(capability)) {
            device.log('Capability not available', capability, value);
            return Promise.resolve();
        }
        // Special case when setting US radon value, the value needs to be converted
        if (capability === AirthingsDefinitions_1.airthingsCapability_measure_radon_us && typeof value === 'number') {
            value = Math.round(value / 37 * 100) / 100;
        }
        device.log('Setting capability value', capability, value);
        await device.setCapabilityValue(capability, value).catch(device.error);
        await AirthingsUtil.updateAlarmValue(device, capability, value).catch(device.error);
    }
    static async updateAlarmValue(device, capability, value) {
        value ??= device.getCapabilityValue(capability);
        const key = capability.split('measure_')[1];
        const alarmCapability = `alarm_${key}`;
        if (!device.hasCapability(alarmCapability)) {
            return;
        }
        let high;
        let low = null;
        switch (capability) {
            case AirthingsDefinitions_1.airthingsCapability_measure_humidity:
            case AirthingsDefinitions_1.airthingsCapability_measure_temperature:
                // High/low threshold
                high = device.settings[`${key}_high_threshold`];
                low = device.settings[`${key}_low_threshold`];
                break;
            default:
                // High threshold
                high = device.settings[`${key}_threshold`];
        }
        const alarmActive = typeof value === 'number' && ((high !== null && high <= value) || (low !== null && low > value));
        await device.setCapabilityValue(alarmCapability, alarmActive);
    }
    static async buildRadonDisplayValue(device) {
        // Use US formatting when units has been set to US and the US capabilities have been added
        const isUs = device.settings[AirthingsDefinitions_1.setting_radon_units] === AirthingsDefinitions_1.US_Units
            && device.hasCapability(AirthingsDefinitions_1.airthingsCapability_measure_radon_us)
            && device.hasCapability(AirthingsDefinitions_1.airthingsCapability_alarm_radon_us);
        let value = new Intl.NumberFormat(device.homey.i18n.getLanguage(), {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(isUs
            ? device.getCapabilityValue(AirthingsDefinitions_1.airthingsCapability_measure_radon_us)
            : device.getCapabilityValue(AirthingsDefinitions_1.airthingsCapability_measure_radon));
        if (isUs) {
            value += ' pCi/L';
        }
        else {
            value += ' Bq/m³';
        }
        await device.setCapabilityValue(AirthingsDefinitions_1.airthingsCapability_measure_radon_display, value).catch(device.error);
        await device.setCapabilityValue(AirthingsDefinitions_1.airthingsCapability_alarm_radon_display, isUs
            ? device.getCapabilityValue(AirthingsDefinitions_1.airthingsCapability_alarm_radon_us)
            : device.getCapabilityValue(AirthingsDefinitions_1.airthingsCapability_alarm_radon)).catch(device.error);
    }
    static async handleSettings(device, data) {
        device.debug('Settings update', data);
        if (data.changedKeys.includes(AirthingsDefinitions_1.setting_radon_units) && !device.hasCapability(AirthingsDefinitions_1.airthingsCapability_measure_radon_us)) {
            throw new Error(device.homey.__('unit_selection_not_available'));
        }
        device.settings = data.newSettings;
        await Promise.all(device.getCapabilities().map(async (capability) => {
            if (!capability.startsWith('measure_')) {
                return Promise.resolve();
            }
            await AirthingsUtil.updateAlarmValue(device, capability).catch(device.error);
        })).catch(device.error);
        await AirthingsUtil.buildRadonDisplayValue(device).catch(device.error);
    }
}
exports.default = AirthingsUtil;
//# sourceMappingURL=AirthingsUtil.js.map