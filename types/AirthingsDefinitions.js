"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.airthingsSensorType_batteryPercentage = exports.airthingsSensorType_battery = exports.airthingsSensorType_lux = exports.airthingsSensorType_light = exports.airthingsSensorType_pressureDiffMax = exports.airthingsSensorType_pressureDiffMin = exports.airthingsSensorType_pressureDiffStdDev = exports.airthingsSensorType_pressureDifference = exports.airthingsSensorType_outdoorPressure = exports.airthingsSensorType_pressure = exports.airthingsSensorType_voc = exports.airthingsSensorType_co2 = exports.airthingsSensorType_outdoorHumidity = exports.airthingsSensorType_humidity = exports.airthingsSensorType_outdoorTemp = exports.airthingsSensorType_temp = exports.airthingsSensorType_radonLongTermAvg = exports.airthingsSensorType_radonShortTermAvg = exports.airthingsDeviceType_UNKNOWN = exports.airthingsDeviceType_BACNET = exports.airthingsDeviceType_BREEZOMETER_WEATHER = exports.airthingsDeviceType_AIRLY_NO = exports.airthingsDeviceType_AIRLY_CO = exports.airthingsDeviceType_AIRLY_NO2 = exports.airthingsDeviceType_AIRLY = exports.airthingsDeviceType_VENT_CONTROLLER = exports.airthingsDeviceType_INLET_AIR_CONTROL = exports.airthingsDeviceType_BALANCE_CONTROL = exports.airthingsDeviceType_ZONE_GROUP = exports.airthingsDeviceType_AGGREGATED_GROUP = exports.airthingsDeviceType_AIRTIGHT = exports.airthingsDeviceType_CLOUDBERRY = exports.airthingsDeviceType_PRO = exports.airthingsDeviceType_HOME = exports.airthingsDeviceType_HUB = exports.airthingsDeviceType_WAVE_ENHANCE = exports.airthingsDeviceType_SPACE_CO2_MINI = exports.airthingsDeviceType_VIEW_CO2 = exports.airthingsDeviceType_VIEW_RADON = exports.airthingsDeviceType_VIEW_POLLUTION = exports.airthingsDeviceType_VIEW_PLUS_BUSINESS = exports.airthingsDeviceType_VIEW_PLUS = exports.airthingsDeviceType_WAVE_CO2 = exports.airthingsDeviceType_WAVE_PLUS = exports.airthingsDeviceType_WAVE_MINI = exports.airthingsDeviceType_WAVE_GEN2 = exports.airthingsDeviceType_WAVE_MIST = exports.airthingsDeviceType_WAVE = exports.setting_radon_units = exports.US_Units = void 0;
exports.airthingsSensorType_potentialPowerSaved = exports.airthingsSensorType_moistGuard = exports.airthingsSensorType_totalPowerLost = exports.airthingsSensorType_zeroPressureHeight = exports.airthingsSensorType_regulationHeight = exports.airthingsSensorType_regulationPressure = exports.airthingsSensorType_pressureAtMaxHeight = exports.airthingsSensorType_pressureAtMinHeight = exports.airthingsSensorType_sla = exports.airthingsSensorType_aggregated = exports.airthingsSensorType_relativeVentilationRate = exports.airthingsSensorType_ventilationRunning = exports.airthingsSensorType_historicVentilationRunning = exports.airthingsSensorType_ventilationAmount = exports.airthingsSensorType_relativeOccupants = exports.airthingsSensorType_occupants = exports.airthingsSensorType_occupantsLower = exports.airthingsSensorType_occupantsUpper = exports.airthingsSensorType_ventilationRunningConfidence = exports.airthingsSensorType_historicVentilation = exports.airthingsSensorType_nightBaseline = exports.airthingsSensorType_daytimePeak = exports.airthingsSensorType_daytimeBaseline = exports.airthingsSensorType_historicVentilationConfidence = exports.airthingsSensorType_energyScenarios = exports.airthingsSensorType_energyWastage = exports.airthingsSensorType_hourlyRadon = exports.airthingsSensorType_hourlyRadonStandardDeviation = exports.airthingsSensorType_outdoorWeather = exports.airthingsSensorType_total_precipitation = exports.airthingsSensorType_precipitation_probability = exports.airthingsSensorType_visibility = exports.airthingsSensorType_cloudCover = exports.airthingsSensorType_dewPoint = exports.airthingsSensorType_windGust = exports.airthingsSensorType_windDirection = exports.airthingsSensorType_windSpeed = exports.airthingsSensorType_virusRisk = exports.airthingsSensorType_virusSurvivalRate = exports.airthingsSensorType_transmissionEfficiency = exports.airthingsSensorType_staleAir = exports.airthingsSensorType_mold = exports.airthingsSensorType_outdoorPm10 = exports.airthingsSensorType_pm10 = exports.airthingsSensorType_outdoorPm25 = exports.airthingsSensorType_pm25 = exports.airthingsSensorType_outdoorPm1 = exports.airthingsSensorType_pm1 = exports.airthingsSensorType_orientation = exports.airthingsSensorType_batteryVoltage = void 0;
exports.airthingsCapability_measure_mold_risk = exports.airthingsCapability_measure_pressure = exports.airthingsCapability_measure_humidity = exports.airthingsCapability_measure_temperature = exports.airthingsCapability_measure_pm1 = exports.airthingsCapability_measure_pm25 = exports.airthingsCapability_measure_voc = exports.airthingsCapability_measure_radon_us = exports.airthingsCapability_measure_radon_display = exports.airthingsCapability_measure_radon = exports.airthingsCapability_measure_co2 = exports.airthingsCapability_measure_battery = exports.airthingsSensorType_bacnet = exports.airthingsSensorType_airlyNo = exports.airthingsSensorType_airlyCo = exports.airthingsSensorType_airlyNo2 = exports.airthingsSensorType_airly = exports.airthingsSensorType_outdoorNo = exports.airthingsSensorType_outdoorCo = exports.airthingsSensorType_outdoorSo2 = exports.airthingsSensorType_outdoorO3 = exports.airthingsSensorType_outdoorNo2 = exports.airthingsSensorType_balanceInfo = exports.airthingsSensorType_subsamples = exports.airthingsSensorType_subsamplesCount = exports.airthingsSensorType_ventController = exports.airthingsSensorType_rsrp = exports.airthingsSensorType_powerVoltage = exports.airthingsSensorType_inletAirControl = exports.airthingsSensorType_controlSignalSlot08 = exports.airthingsSensorType_controlSignalSlot07 = exports.airthingsSensorType_controlSignalSlot06 = exports.airthingsSensorType_controlSignalSlot05 = exports.airthingsSensorType_controlSignalSlot04 = exports.airthingsSensorType_controlSignalSlot03 = exports.airthingsSensorType_controlSignalSlot02 = exports.airthingsSensorType_controlSignalSlot01 = exports.airthingsSensorType_balanceControl = exports.airthingsSensorType_messages = exports.airthingsSensorType_lastBestControlSignalRecorded = exports.airthingsSensorType_lastBestControlSignalGain = exports.airthingsSensorType_lastBestSignalError = exports.airthingsSensorType_lastBestControlSignal = exports.airthingsSensorType_appliedGain = exports.airthingsSensorType_returnState = exports.airthingsSensorType_controlStatus = exports.airthingsSensorType_controlSignal = exports.airthingsSensorType_zone = exports.airthingsSensorType_zeroHeightPercent = exports.airthingsSensorType_potentialPowerSavedPercent = void 0;
exports.airthingsCapabilities = exports.airthingsCapability_alarm_mold_risk = exports.airthingsCapability_alarm_humidity = exports.airthingsCapability_alarm_temperature = exports.airthingsCapability_alarm_pm1 = exports.airthingsCapability_alarm_pm25 = exports.airthingsCapability_alarm_voc = exports.airthingsCapability_alarm_radon_us = exports.airthingsCapability_alarm_radon_display = exports.airthingsCapability_alarm_radon = exports.airthingsCapability_alarm_co2 = void 0;
exports.US_Units = 'imperial';
exports.setting_radon_units = 'radon_units';
exports.airthingsDeviceType_WAVE = 'WAVE';
exports.airthingsDeviceType_WAVE_MIST = 'WAVE_MIST';
exports.airthingsDeviceType_WAVE_GEN2 = 'WAVE_GEN2';
exports.airthingsDeviceType_WAVE_MINI = 'WAVE_MINI';
exports.airthingsDeviceType_WAVE_PLUS = 'WAVE_PLUS';
exports.airthingsDeviceType_WAVE_CO2 = 'WAVE_CO2';
exports.airthingsDeviceType_VIEW_PLUS = 'VIEW_PLUS';
exports.airthingsDeviceType_VIEW_PLUS_BUSINESS = 'VIEW_PLUS_BUSINESS';
exports.airthingsDeviceType_VIEW_POLLUTION = 'VIEW_POLLUTION';
exports.airthingsDeviceType_VIEW_RADON = 'VIEW_RADON';
exports.airthingsDeviceType_VIEW_CO2 = 'VIEW_CO2';
exports.airthingsDeviceType_SPACE_CO2_MINI = 'SPACE_CO2_MINI';
exports.airthingsDeviceType_WAVE_ENHANCE = 'WAVE_ENHANCE';
exports.airthingsDeviceType_HUB = 'HUB';
exports.airthingsDeviceType_HOME = 'HOME';
exports.airthingsDeviceType_PRO = 'PRO';
exports.airthingsDeviceType_CLOUDBERRY = 'CLOUDBERRY';
exports.airthingsDeviceType_AIRTIGHT = 'AIRTIGHT';
exports.airthingsDeviceType_AGGREGATED_GROUP = 'AGGREGATED_GROUP';
exports.airthingsDeviceType_ZONE_GROUP = 'ZONE_GROUP';
exports.airthingsDeviceType_BALANCE_CONTROL = 'BALANCE_CONTROL';
exports.airthingsDeviceType_INLET_AIR_CONTROL = 'INLET_AIR_CONTROL';
exports.airthingsDeviceType_VENT_CONTROLLER = 'VENT_CONTROLLER';
exports.airthingsDeviceType_AIRLY = 'AIRLY';
exports.airthingsDeviceType_AIRLY_NO2 = 'AIRLY_NO2';
exports.airthingsDeviceType_AIRLY_CO = 'AIRLY_CO';
exports.airthingsDeviceType_AIRLY_NO = 'AIRLY_NO';
exports.airthingsDeviceType_BREEZOMETER_WEATHER = 'BREEZOMETER_WEATHER';
exports.airthingsDeviceType_BACNET = 'BACNET';
exports.airthingsDeviceType_UNKNOWN = 'UNKNOWN';
const airthingsDeviceTypes = [
    exports.airthingsDeviceType_WAVE,
    exports.airthingsDeviceType_WAVE_MIST,
    exports.airthingsDeviceType_WAVE_GEN2,
    exports.airthingsDeviceType_WAVE_MINI,
    exports.airthingsDeviceType_WAVE_PLUS,
    exports.airthingsDeviceType_WAVE_CO2,
    exports.airthingsDeviceType_VIEW_PLUS,
    exports.airthingsDeviceType_VIEW_PLUS_BUSINESS,
    exports.airthingsDeviceType_VIEW_POLLUTION,
    exports.airthingsDeviceType_VIEW_RADON,
    exports.airthingsDeviceType_VIEW_CO2,
    exports.airthingsDeviceType_SPACE_CO2_MINI,
    exports.airthingsDeviceType_WAVE_ENHANCE,
    exports.airthingsDeviceType_HUB,
    exports.airthingsDeviceType_HOME,
    exports.airthingsDeviceType_PRO,
    exports.airthingsDeviceType_CLOUDBERRY,
    exports.airthingsDeviceType_AIRTIGHT,
    exports.airthingsDeviceType_AGGREGATED_GROUP,
    exports.airthingsDeviceType_ZONE_GROUP,
    exports.airthingsDeviceType_BALANCE_CONTROL,
    exports.airthingsDeviceType_INLET_AIR_CONTROL,
    exports.airthingsDeviceType_VENT_CONTROLLER,
    exports.airthingsDeviceType_AIRLY,
    exports.airthingsDeviceType_AIRLY_NO2,
    exports.airthingsDeviceType_AIRLY_CO,
    exports.airthingsDeviceType_AIRLY_NO,
    exports.airthingsDeviceType_BREEZOMETER_WEATHER,
    exports.airthingsDeviceType_BACNET,
    exports.airthingsDeviceType_UNKNOWN,
];
exports.airthingsSensorType_radonShortTermAvg = 'radonShortTermAvg';
exports.airthingsSensorType_radonLongTermAvg = 'radonLongTermAvg';
exports.airthingsSensorType_temp = 'temp';
exports.airthingsSensorType_outdoorTemp = 'outdoorTemp';
exports.airthingsSensorType_humidity = 'humidity';
exports.airthingsSensorType_outdoorHumidity = 'outdoorHumidity';
exports.airthingsSensorType_co2 = 'co2';
exports.airthingsSensorType_voc = 'voc';
exports.airthingsSensorType_pressure = 'pressure';
exports.airthingsSensorType_outdoorPressure = 'outdoorPressure';
exports.airthingsSensorType_pressureDifference = 'pressureDifference';
exports.airthingsSensorType_pressureDiffStdDev = 'pressureDiffStdDev';
exports.airthingsSensorType_pressureDiffMin = 'pressureDiffMin';
exports.airthingsSensorType_pressureDiffMax = 'pressureDiffMax';
exports.airthingsSensorType_light = 'light';
exports.airthingsSensorType_lux = 'lux';
exports.airthingsSensorType_battery = 'battery';
exports.airthingsSensorType_batteryPercentage = 'batteryPercentage';
exports.airthingsSensorType_batteryVoltage = 'batteryVoltage';
exports.airthingsSensorType_orientation = 'orientation';
exports.airthingsSensorType_pm1 = 'pm1';
exports.airthingsSensorType_outdoorPm1 = 'outdoorPm1';
exports.airthingsSensorType_pm25 = 'pm25';
exports.airthingsSensorType_outdoorPm25 = 'outdoorPm25';
exports.airthingsSensorType_pm10 = 'pm10';
exports.airthingsSensorType_outdoorPm10 = 'outdoorPm10';
exports.airthingsSensorType_mold = 'mold';
exports.airthingsSensorType_staleAir = 'staleAir';
exports.airthingsSensorType_transmissionEfficiency = 'transmissionEfficiency';
exports.airthingsSensorType_virusSurvivalRate = 'virusSurvivalRate';
exports.airthingsSensorType_virusRisk = 'virusRisk';
exports.airthingsSensorType_windSpeed = 'windSpeed';
exports.airthingsSensorType_windDirection = 'windDirection';
exports.airthingsSensorType_windGust = 'windGust';
exports.airthingsSensorType_dewPoint = 'dewPoint';
exports.airthingsSensorType_cloudCover = 'cloudCover';
exports.airthingsSensorType_visibility = 'visibility';
exports.airthingsSensorType_precipitation_probability = 'precipitation_probability';
exports.airthingsSensorType_total_precipitation = 'total_precipitation';
exports.airthingsSensorType_outdoorWeather = 'outdoorWeather';
exports.airthingsSensorType_hourlyRadonStandardDeviation = 'hourlyRadonStandardDeviation';
exports.airthingsSensorType_hourlyRadon = 'hourlyRadon';
exports.airthingsSensorType_energyWastage = 'energyWastage';
exports.airthingsSensorType_energyScenarios = 'energyScenarios';
exports.airthingsSensorType_historicVentilationConfidence = 'historicVentilationConfidence';
exports.airthingsSensorType_daytimeBaseline = 'daytimeBaseline';
exports.airthingsSensorType_daytimePeak = 'daytimePeak';
exports.airthingsSensorType_nightBaseline = 'nightBaseline';
exports.airthingsSensorType_historicVentilation = 'historicVentilation';
exports.airthingsSensorType_ventilationRunningConfidence = 'ventilationRunningConfidence';
exports.airthingsSensorType_occupantsUpper = 'occupantsUpper';
exports.airthingsSensorType_occupantsLower = 'occupantsLower';
exports.airthingsSensorType_occupants = 'occupants';
exports.airthingsSensorType_relativeOccupants = 'relativeOccupants';
exports.airthingsSensorType_ventilationAmount = 'ventilationAmount';
exports.airthingsSensorType_historicVentilationRunning = 'historicVentilationRunning';
exports.airthingsSensorType_ventilationRunning = 'ventilationRunning';
exports.airthingsSensorType_relativeVentilationRate = 'relativeVentilationRate';
exports.airthingsSensorType_aggregated = 'aggregated';
exports.airthingsSensorType_sla = 'sla';
exports.airthingsSensorType_pressureAtMinHeight = 'pressureAtMinHeight';
exports.airthingsSensorType_pressureAtMaxHeight = 'pressureAtMaxHeight';
exports.airthingsSensorType_regulationPressure = 'regulationPressure';
exports.airthingsSensorType_regulationHeight = 'regulationHeight';
exports.airthingsSensorType_zeroPressureHeight = 'zeroPressureHeight';
exports.airthingsSensorType_totalPowerLost = 'totalPowerLost';
exports.airthingsSensorType_moistGuard = 'moistGuard';
exports.airthingsSensorType_potentialPowerSaved = 'potentialPowerSaved';
exports.airthingsSensorType_potentialPowerSavedPercent = 'potentialPowerSavedPercent';
exports.airthingsSensorType_zeroHeightPercent = 'zeroHeightPercent';
exports.airthingsSensorType_zone = 'zone';
exports.airthingsSensorType_controlSignal = 'controlSignal';
exports.airthingsSensorType_controlStatus = 'controlStatus';
exports.airthingsSensorType_returnState = 'returnState';
exports.airthingsSensorType_appliedGain = 'appliedGain';
exports.airthingsSensorType_lastBestControlSignal = 'lastBestControlSignal';
exports.airthingsSensorType_lastBestSignalError = 'lastBestSignalError';
exports.airthingsSensorType_lastBestControlSignalGain = 'lastBestControlSignalGain';
exports.airthingsSensorType_lastBestControlSignalRecorded = 'lastBestControlSignalRecorded';
exports.airthingsSensorType_messages = 'messages';
exports.airthingsSensorType_balanceControl = 'balanceControl';
exports.airthingsSensorType_controlSignalSlot01 = 'controlSignalSlot01';
exports.airthingsSensorType_controlSignalSlot02 = 'controlSignalSlot02';
exports.airthingsSensorType_controlSignalSlot03 = 'controlSignalSlot03';
exports.airthingsSensorType_controlSignalSlot04 = 'controlSignalSlot04';
exports.airthingsSensorType_controlSignalSlot05 = 'controlSignalSlot05';
exports.airthingsSensorType_controlSignalSlot06 = 'controlSignalSlot06';
exports.airthingsSensorType_controlSignalSlot07 = 'controlSignalSlot07';
exports.airthingsSensorType_controlSignalSlot08 = 'controlSignalSlot08';
exports.airthingsSensorType_inletAirControl = 'inletAirControl';
exports.airthingsSensorType_powerVoltage = 'powerVoltage';
exports.airthingsSensorType_rsrp = 'rsrp';
exports.airthingsSensorType_ventController = 'ventController';
exports.airthingsSensorType_subsamplesCount = 'subsamplesCount';
exports.airthingsSensorType_subsamples = 'subsamples';
exports.airthingsSensorType_balanceInfo = 'balanceInfo';
exports.airthingsSensorType_outdoorNo2 = 'outdoorNo2';
exports.airthingsSensorType_outdoorO3 = 'outdoorO3';
exports.airthingsSensorType_outdoorSo2 = 'outdoorSo2';
exports.airthingsSensorType_outdoorCo = 'outdoorCo';
exports.airthingsSensorType_outdoorNo = 'outdoorNo';
exports.airthingsSensorType_airly = 'airly';
exports.airthingsSensorType_airlyNo2 = 'airlyNo2';
exports.airthingsSensorType_airlyCo = 'airlyCo';
exports.airthingsSensorType_airlyNo = 'airlyNo';
exports.airthingsSensorType_bacnet = 'bacnet';
const airthingsSensorTypes = [
    exports.airthingsSensorType_radonShortTermAvg,
    exports.airthingsSensorType_radonLongTermAvg,
    exports.airthingsSensorType_temp,
    exports.airthingsSensorType_outdoorTemp,
    exports.airthingsSensorType_humidity,
    exports.airthingsSensorType_outdoorHumidity,
    exports.airthingsSensorType_co2,
    exports.airthingsSensorType_voc,
    exports.airthingsSensorType_pressure,
    exports.airthingsSensorType_outdoorPressure,
    exports.airthingsSensorType_pressureDifference,
    exports.airthingsSensorType_pressureDiffStdDev,
    exports.airthingsSensorType_pressureDiffMin,
    exports.airthingsSensorType_pressureDiffMax,
    exports.airthingsSensorType_light,
    exports.airthingsSensorType_lux,
    exports.airthingsSensorType_battery,
    exports.airthingsSensorType_batteryPercentage,
    exports.airthingsSensorType_batteryVoltage,
    exports.airthingsSensorType_orientation,
    exports.airthingsSensorType_pm1,
    exports.airthingsSensorType_outdoorPm1,
    exports.airthingsSensorType_pm25,
    exports.airthingsSensorType_outdoorPm25,
    exports.airthingsSensorType_pm10,
    exports.airthingsSensorType_outdoorPm10,
    exports.airthingsSensorType_mold,
    exports.airthingsSensorType_staleAir,
    exports.airthingsSensorType_transmissionEfficiency,
    exports.airthingsSensorType_virusSurvivalRate,
    exports.airthingsSensorType_virusRisk,
    exports.airthingsSensorType_windSpeed,
    exports.airthingsSensorType_windDirection,
    exports.airthingsSensorType_windGust,
    exports.airthingsSensorType_dewPoint,
    exports.airthingsSensorType_cloudCover,
    exports.airthingsSensorType_visibility,
    exports.airthingsSensorType_precipitation_probability,
    exports.airthingsSensorType_total_precipitation,
    exports.airthingsSensorType_outdoorWeather,
    exports.airthingsSensorType_hourlyRadonStandardDeviation,
    exports.airthingsSensorType_hourlyRadon,
    exports.airthingsSensorType_energyWastage,
    exports.airthingsSensorType_energyScenarios,
    exports.airthingsSensorType_historicVentilationConfidence,
    exports.airthingsSensorType_daytimeBaseline,
    exports.airthingsSensorType_daytimePeak,
    exports.airthingsSensorType_nightBaseline,
    exports.airthingsSensorType_historicVentilation,
    exports.airthingsSensorType_ventilationRunningConfidence,
    exports.airthingsSensorType_occupantsUpper,
    exports.airthingsSensorType_occupantsLower,
    exports.airthingsSensorType_occupants,
    exports.airthingsSensorType_relativeOccupants,
    exports.airthingsSensorType_ventilationAmount,
    exports.airthingsSensorType_historicVentilationRunning,
    exports.airthingsSensorType_ventilationRunning,
    exports.airthingsSensorType_relativeVentilationRate,
    exports.airthingsSensorType_aggregated,
    exports.airthingsSensorType_sla,
    exports.airthingsSensorType_pressureAtMinHeight,
    exports.airthingsSensorType_pressureAtMaxHeight,
    exports.airthingsSensorType_regulationPressure,
    exports.airthingsSensorType_regulationHeight,
    exports.airthingsSensorType_zeroPressureHeight,
    exports.airthingsSensorType_totalPowerLost,
    exports.airthingsSensorType_moistGuard,
    exports.airthingsSensorType_potentialPowerSaved,
    exports.airthingsSensorType_potentialPowerSavedPercent,
    exports.airthingsSensorType_zeroHeightPercent,
    exports.airthingsSensorType_zone,
    exports.airthingsSensorType_controlSignal,
    exports.airthingsSensorType_controlStatus,
    exports.airthingsSensorType_returnState,
    exports.airthingsSensorType_appliedGain,
    exports.airthingsSensorType_lastBestControlSignal,
    exports.airthingsSensorType_lastBestSignalError,
    exports.airthingsSensorType_lastBestControlSignalGain,
    exports.airthingsSensorType_lastBestControlSignalRecorded,
    exports.airthingsSensorType_messages,
    exports.airthingsSensorType_balanceControl,
    exports.airthingsSensorType_controlSignalSlot01,
    exports.airthingsSensorType_controlSignalSlot02,
    exports.airthingsSensorType_controlSignalSlot03,
    exports.airthingsSensorType_controlSignalSlot04,
    exports.airthingsSensorType_controlSignalSlot05,
    exports.airthingsSensorType_controlSignalSlot06,
    exports.airthingsSensorType_controlSignalSlot07,
    exports.airthingsSensorType_controlSignalSlot08,
    exports.airthingsSensorType_inletAirControl,
    exports.airthingsSensorType_powerVoltage,
    exports.airthingsSensorType_rsrp,
    exports.airthingsSensorType_ventController,
    exports.airthingsSensorType_subsamplesCount,
    exports.airthingsSensorType_subsamples,
    exports.airthingsSensorType_balanceInfo,
    exports.airthingsSensorType_outdoorNo2,
    exports.airthingsSensorType_outdoorO3,
    exports.airthingsSensorType_outdoorSo2,
    exports.airthingsSensorType_outdoorCo,
    exports.airthingsSensorType_outdoorNo,
    exports.airthingsSensorType_airly,
    exports.airthingsSensorType_airlyNo2,
    exports.airthingsSensorType_airlyCo,
    exports.airthingsSensorType_airlyNo,
    exports.airthingsSensorType_bacnet,
];
exports.airthingsCapability_measure_battery = 'measure_battery';
exports.airthingsCapability_measure_co2 = 'measure_co2';
exports.airthingsCapability_measure_radon = 'measure_radon';
exports.airthingsCapability_measure_radon_display = 'measure_radon_display';
exports.airthingsCapability_measure_radon_us = 'measure_radon_us';
exports.airthingsCapability_measure_voc = 'measure_voc';
exports.airthingsCapability_measure_pm25 = 'measure_pm25';
exports.airthingsCapability_measure_pm1 = 'measure_pm1';
exports.airthingsCapability_measure_temperature = 'measure_temperature';
exports.airthingsCapability_measure_humidity = 'measure_humidity';
exports.airthingsCapability_measure_pressure = 'measure_pressure';
exports.airthingsCapability_measure_mold_risk = 'measure_mold_risk';
exports.airthingsCapability_alarm_co2 = 'alarm_co2';
exports.airthingsCapability_alarm_radon = 'alarm_radon';
exports.airthingsCapability_alarm_radon_display = 'alarm_radon_display';
exports.airthingsCapability_alarm_radon_us = 'alarm_radon_us';
exports.airthingsCapability_alarm_voc = 'alarm_voc';
exports.airthingsCapability_alarm_pm25 = 'alarm_pm25';
exports.airthingsCapability_alarm_pm1 = 'alarm_pm1';
exports.airthingsCapability_alarm_temperature = 'alarm_temperature';
exports.airthingsCapability_alarm_humidity = 'alarm_humidity';
exports.airthingsCapability_alarm_mold_risk = 'alarm_mold_risk';
exports.airthingsCapabilities = [
    exports.airthingsCapability_measure_battery,
    exports.airthingsCapability_measure_co2,
    exports.airthingsCapability_measure_radon,
    exports.airthingsCapability_measure_radon_display,
    exports.airthingsCapability_measure_radon_us,
    exports.airthingsCapability_measure_voc,
    exports.airthingsCapability_measure_pm25,
    exports.airthingsCapability_measure_pm1,
    exports.airthingsCapability_measure_temperature,
    exports.airthingsCapability_measure_humidity,
    exports.airthingsCapability_measure_pressure,
    exports.airthingsCapability_measure_mold_risk,
    exports.airthingsCapability_alarm_co2,
    exports.airthingsCapability_alarm_radon,
    exports.airthingsCapability_alarm_radon_display,
    exports.airthingsCapability_alarm_radon_us,
    exports.airthingsCapability_alarm_voc,
    exports.airthingsCapability_alarm_pm25,
    exports.airthingsCapability_alarm_pm1,
    exports.airthingsCapability_alarm_temperature,
    exports.airthingsCapability_alarm_humidity,
    exports.airthingsCapability_alarm_mold_risk,
];
//# sourceMappingURL=AirthingsDefinitions.js.map