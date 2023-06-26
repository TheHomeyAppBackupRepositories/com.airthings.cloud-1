"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const homey_oauth2app_1 = require("homey-oauth2app");
const AirthingsDefinitions_1 = require("../../types/AirthingsDefinitions");
const Capabilities_1 = require("../Capabilities");
class CloudDriver extends homey_oauth2app_1.OAuth2Driver {
    async onPairListDevices({ oAuth2Client }) {
        const devices = (await oAuth2Client.getDevices().catch(this.error)) ?? [];
        this.log('Cloud devices found', JSON.stringify(devices));
        return devices
            .filter(device => this.filterOnType(device.deviceType))
            .map(device => this.convertDevice(device));
    }
    convertDevice(device) {
        const units = this.homey.i18n.getUnits();
        this.log('Homey language/units', this.homey.i18n.getLanguage(), units);
        const oAuthDeviceResult = {
            name: `${device.location.name} - ${device.segment.name}`,
            data: {
                id: device.id,
            },
            capabilities: this.getCapabilities(device.sensors),
            capabilitiesOptions: {
                "measure_co2": {
                    "icon": "/assets/icons/co2.svg"
                },
                "measure_pm25": {
                    "icon": "/assets/icons/pm.svg"
                },
                "measure_temperature": {
                    "icon": "/assets/icons/temp.svg"
                },
                "measure_humidity": {
                    "icon": "/assets/icons/humidity.svg"
                },
                "measure_pressure": {
                    "icon": "/assets/icons/pressure.svg"
                },
                "alarm_co2": {
                    "icon": "/assets/icons/co2.svg"
                },
                "alarm_pm25": {
                    "icon": "/assets/icons/pm.svg"
                }
            },
            settings: {
                [AirthingsDefinitions_1.setting_radon_units]: units,
            }
        };
        this.log('Device result', JSON.stringify(oAuthDeviceResult));
        return oAuthDeviceResult;
    }
    getCapabilities(sensors) {
        const capabilities = new Set([AirthingsDefinitions_1.airthingsCapability_measure_battery]);
        sensors.forEach((sensor) => {
            (0, Capabilities_1.sensorToCapabilities)(sensor).forEach(capability => capabilities.add(capability));
        });
        return (0, Capabilities_1.sortCapabilities)([...capabilities]);
    }
}
exports.default = CloudDriver;
//# sourceMappingURL=CloudDriver.js.map