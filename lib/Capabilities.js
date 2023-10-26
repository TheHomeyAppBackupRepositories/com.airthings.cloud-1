"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sensorDataKeyToCapability = exports.sensorToCapabilities = exports.sortCapabilities = void 0;
const AirthingsDefinitions_1 = require("../types/AirthingsDefinitions");
const capabilityOrder = {
    [AirthingsDefinitions_1.airthingsCapability_measure_mold_risk]: 90,
    [AirthingsDefinitions_1.airthingsCapability_alarm_mold_risk]: 89,
    [AirthingsDefinitions_1.airthingsCapability_measure_radon_display]: 81,
    [AirthingsDefinitions_1.airthingsCapability_measure_radon]: 80,
    [AirthingsDefinitions_1.airthingsCapability_measure_radon_us]: 79,
    [AirthingsDefinitions_1.airthingsCapability_alarm_radon_display]: 78,
    [AirthingsDefinitions_1.airthingsCapability_alarm_radon]: 77,
    [AirthingsDefinitions_1.airthingsCapability_alarm_radon_us]: 76,
    [AirthingsDefinitions_1.airthingsCapability_measure_co2]: 70,
    [AirthingsDefinitions_1.airthingsCapability_alarm_co2]: 69,
    [AirthingsDefinitions_1.airthingsCapability_measure_voc]: 60,
    [AirthingsDefinitions_1.airthingsCapability_alarm_voc]: 59,
    [AirthingsDefinitions_1.airthingsCapability_measure_pm25]: 50,
    [AirthingsDefinitions_1.airthingsCapability_alarm_pm25]: 49,
    [AirthingsDefinitions_1.airthingsCapability_measure_pm1]: 40,
    [AirthingsDefinitions_1.airthingsCapability_alarm_pm1]: 39,
    [AirthingsDefinitions_1.airthingsCapability_measure_humidity]: 30,
    [AirthingsDefinitions_1.airthingsCapability_alarm_humidity]: 29,
    [AirthingsDefinitions_1.airthingsCapability_measure_temperature]: 20,
    [AirthingsDefinitions_1.airthingsCapability_alarm_temperature]: 19,
    [AirthingsDefinitions_1.airthingsCapability_measure_pressure]: 10,
    [AirthingsDefinitions_1.airthingsCapability_measure_battery]: 0,
    [AirthingsDefinitions_1.airthingsCapability_measure_luminance]: -10,
};
function sortCapabilities(capabilities) {
    return capabilities.sort((a, b) => capabilityOrder[b] - capabilityOrder[a]);
}
exports.sortCapabilities = sortCapabilities;
function sensorToCapabilities(sensor) {
    switch (sensor) {
        case AirthingsDefinitions_1.airthingsSensorType_radonShortTermAvg:
            return [
                AirthingsDefinitions_1.airthingsCapability_measure_radon_display,
                AirthingsDefinitions_1.airthingsCapability_measure_radon,
                AirthingsDefinitions_1.airthingsCapability_measure_radon_us,
                AirthingsDefinitions_1.airthingsCapability_alarm_radon_display,
                AirthingsDefinitions_1.airthingsCapability_alarm_radon,
                AirthingsDefinitions_1.airthingsCapability_alarm_radon_us,
            ];
        case AirthingsDefinitions_1.airthingsSensorType_temp:
            return [AirthingsDefinitions_1.airthingsCapability_measure_temperature, AirthingsDefinitions_1.airthingsCapability_alarm_temperature];
        case AirthingsDefinitions_1.airthingsSensorType_humidity:
            return [AirthingsDefinitions_1.airthingsCapability_measure_humidity, AirthingsDefinitions_1.airthingsCapability_alarm_humidity];
        case AirthingsDefinitions_1.airthingsSensorType_pressure:
            return [AirthingsDefinitions_1.airthingsCapability_measure_pressure];
        case AirthingsDefinitions_1.airthingsSensorType_co2:
            return [AirthingsDefinitions_1.airthingsCapability_measure_co2, AirthingsDefinitions_1.airthingsCapability_alarm_co2];
        case AirthingsDefinitions_1.airthingsSensorType_voc:
            return [AirthingsDefinitions_1.airthingsCapability_measure_voc, AirthingsDefinitions_1.airthingsCapability_alarm_voc];
        case AirthingsDefinitions_1.airthingsSensorType_pm1:
            return [AirthingsDefinitions_1.airthingsCapability_measure_pm1, AirthingsDefinitions_1.airthingsCapability_alarm_pm1];
        case AirthingsDefinitions_1.airthingsSensorType_pm25:
            return [AirthingsDefinitions_1.airthingsCapability_measure_pm25, AirthingsDefinitions_1.airthingsCapability_alarm_pm25];
        case AirthingsDefinitions_1.airthingsSensorType_mold:
            return [AirthingsDefinitions_1.airthingsCapability_measure_mold_risk, AirthingsDefinitions_1.airthingsCapability_alarm_mold_risk];
        default:
            return [];
    }
}
exports.sensorToCapabilities = sensorToCapabilities;
function sensorDataKeyToCapability(dataKey) {
    switch (dataKey) {
        case 'battery':
            return [AirthingsDefinitions_1.airthingsCapability_measure_battery];
        case 'co2':
            return [AirthingsDefinitions_1.airthingsCapability_measure_co2];
        case 'radonShortTermAvg':
            return [AirthingsDefinitions_1.airthingsCapability_measure_radon, AirthingsDefinitions_1.airthingsCapability_measure_radon_us];
        case 'voc':
            return [AirthingsDefinitions_1.airthingsCapability_measure_voc];
        case 'pm25':
            return [AirthingsDefinitions_1.airthingsCapability_measure_pm25];
        case 'pm1':
            return [AirthingsDefinitions_1.airthingsCapability_measure_pm1];
        case 'temp':
            return [AirthingsDefinitions_1.airthingsCapability_measure_temperature];
        case 'humidity':
            return [AirthingsDefinitions_1.airthingsCapability_measure_humidity];
        case 'pressure':
            return [AirthingsDefinitions_1.airthingsCapability_measure_pressure];
        case 'mold':
            return [AirthingsDefinitions_1.airthingsCapability_measure_mold_risk];
        default:
            // Ignored data keys
            return null;
    }
}
exports.sensorDataKeyToCapability = sensorDataKeyToCapability;
//# sourceMappingURL=Capabilities.js.map