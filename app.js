"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
const homey_log_1 = require("homey-log");
const homey_oauth2app_1 = require("homey-oauth2app");
const source_map_support_1 = __importDefault(require("source-map-support"));
const AirthingsDefinitions_1 = require("./types/AirthingsDefinitions");
source_map_support_1.default.install();
class AirthingsApp extends homey_oauth2app_1.OAuth2App {
    constructor() {
        super(...arguments);
        this.deviceIds = [];
    }
    async onOAuth2Init() {
        try {
            await super.onOAuth2Init();
            this.homeyLog = new homey_log_1.Log({ homey: this.homey });
            // Register condition listeners
            [
                AirthingsDefinitions_1.airthingsCapability_alarm_humidity,
                AirthingsDefinitions_1.airthingsCapability_alarm_mold_risk,
                AirthingsDefinitions_1.airthingsCapability_alarm_pm1,
                AirthingsDefinitions_1.airthingsCapability_alarm_radon,
                AirthingsDefinitions_1.airthingsCapability_alarm_temperature,
                AirthingsDefinitions_1.airthingsCapability_alarm_voc,
            ].forEach(id => this.homey.flow
                .getConditionCard(id)
                .registerRunListener((args) => args.device.getCapabilityValue(id)));
            this.log('Airthings has been initialized');
        }
        catch (e) {
            this.log('Airthings failed to initialize');
            this.error(e);
        }
    }
    checkDuplications(id) {
        if (!this.deviceIds.includes(id)) {
            // Not duplicated
            this.deviceIds.push(id);
            return;
        }
        // Duplicated!
        this.log('Duplicated device id found, letting devices know...', id);
        Object.values(this.homey.drivers.getDrivers()).forEach(driver => {
            driver.getDevices().forEach(device => {
                try {
                    device.markDuplicated(id);
                }
                catch (e) {
                    this.log('Failed to call markDuplicated', JSON.stringify(e));
                }
            });
        });
    }
}
AirthingsApp.OAUTH2_CLIENT = require('./lib/AirthingsApi');
AirthingsApp.OAUTH2_DRIVERS = ['cloud_view_series'];
AirthingsApp.OAUTH2_DEBUG = homey_1.default.env.DEBUG === '1';
module.exports = AirthingsApp;
//# sourceMappingURL=app.js.map