"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importStar(require("homey"));
const AirthingsDefinitions_1 = require("../../types/AirthingsDefinitions");
const AirthingsUtil_1 = __importDefault(require("../AirthingsUtil"));
class BLEDevice extends homey_1.Device {
    constructor() {
        super(...arguments);
        this.debugEnabled = false;
    }
    async onInit() {
        this.debugEnabled = homey_1.default.env.DEBUG === '1';
        await AirthingsUtil_1.default.airthingsInit(this);
        this.log(this.DEVICE_NAME + ' device has been initialized');
        if (!this.unavailableTimeout) {
            this.resetTimeout();
        }
        // Get advertisement, which is only needed once
        const { address } = this.getData();
        this.driver.getAdvertisement(address, advertisement => {
            this.log('Device has been found!');
            this.advertisement = advertisement;
            this.setAvailable().catch(this.error);
            this.pollValues().catch(this.error);
        });
        if (!this.advertisement) {
            // Driver did not have the correct advertisement yet, so resolve it later
            this.setUnavailable(this.homey.__('unavailable_ble_startup')).catch(this.error);
        }
    }
    resetTimeout() {
        this.unavailableTimeout = this.homey.setTimeout(() => this.setUnavailable(this.homey.__('unavailable_ble')).catch(this.error), Number(homey_1.default.env.DEVICE_BLE_OFFLINE_MINUTES) * 60 * 1000);
    }
    async getPeripheral(advertisement) {
        if (!advertisement) {
            throw new Error('Advertisement Unavailable');
        }
        this.debug('Triggering discovery before trying to connect...');
        await this.homey.ble.discover();
        this.debug('Connecting to peripheral...');
        const peripheral = await advertisement.connect();
        await peripheral.discoverAllServicesAndCharacteristics();
        await this.setAvailable();
        if (this.unavailableTimeout) {
            this.homey.clearTimeout(this.unavailableTimeout);
        }
        this.resetTimeout();
        return peripheral;
    }
    async pollValues() {
        this.debug('Polling for BLE values...');
        if (!this.advertisement) {
            this.log('Device has not yet been found by Homey');
            return false;
        }
        const peripheral = await this.getPeripheral(this.advertisement)
            .catch(e => this.error(`Peripheral error: ${e.message}`));
        if (!peripheral) {
            return false;
        }
        try {
            const dataService = await peripheral
                .getService(this.driver.DISCOVERY_SERVICE_UUID);
            const dataCharacteristic = await dataService
                .getCharacteristic(this.driver.DATA_CHARACTERISTIC)
                .then(characteristic => characteristic.read());
            this.debug('Data', dataCharacteristic);
            if (this.checkSensorVersion(dataCharacteristic)) {
                if (this.hasCapability(AirthingsDefinitions_1.airthingsCapability_measure_humidity)) {
                    const humidityValue = this.getHumidityValue(dataCharacteristic);
                    await AirthingsUtil_1.default.updateCapabilityValue(this, AirthingsDefinitions_1.airthingsCapability_measure_humidity, humidityValue <= 100 ? humidityValue : null);
                }
                if (this.hasCapability(AirthingsDefinitions_1.airthingsCapability_measure_luminance)) {
                    await AirthingsUtil_1.default.updateCapabilityValue(this, AirthingsDefinitions_1.airthingsCapability_measure_luminance, this.getLuminanceValue(dataCharacteristic));
                }
                if (this.hasCapability(AirthingsDefinitions_1.airthingsCapability_measure_radon)) {
                    await AirthingsUtil_1.default.updateCapabilityValue(this, AirthingsDefinitions_1.airthingsCapability_measure_radon, this.getRadonValue(dataCharacteristic));
                    await AirthingsUtil_1.default.buildRadonDisplayValue(this);
                }
                if (this.hasCapability(AirthingsDefinitions_1.airthingsCapability_measure_temperature)) {
                    const temperatureValue = this.getTemperatureValue(dataCharacteristic);
                    await AirthingsUtil_1.default.updateCapabilityValue(this, AirthingsDefinitions_1.airthingsCapability_measure_temperature, temperatureValue <= 100 ? temperatureValue : null);
                }
                if (this.hasCapability(AirthingsDefinitions_1.airthingsCapability_measure_pressure)) {
                    await AirthingsUtil_1.default.updateCapabilityValue(this, AirthingsDefinitions_1.airthingsCapability_measure_pressure, this.getPressureValue(dataCharacteristic));
                }
                if (this.hasCapability(AirthingsDefinitions_1.airthingsCapability_measure_co2)) {
                    const co2Value = this.getCO2Value(dataCharacteristic);
                    await AirthingsUtil_1.default.updateCapabilityValue(this, AirthingsDefinitions_1.airthingsCapability_measure_co2, co2Value !== 65535 ? co2Value : null);
                }
                if (this.hasCapability(AirthingsDefinitions_1.airthingsCapability_measure_voc)) {
                    const vocValue = this.getVOCValue(dataCharacteristic);
                    await AirthingsUtil_1.default.updateCapabilityValue(this, AirthingsDefinitions_1.airthingsCapability_measure_voc, vocValue !== 65535 ? vocValue : null);
                }
            }
            else {
                throw new Error('Unknown sensor version!');
            }
        }
        finally {
            await peripheral.disconnect();
        }
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getVOCValue(dataCharacteristic) {
        throw new Error('VOC value decoding not implemented');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getCO2Value(dataCharacteristic) {
        throw new Error('CO2 value decoding not implemented');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getPressureValue(dataCharacteristic) {
        throw new Error('Pressure value decoding not implemented');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getTemperatureValue(dataCharacteristic) {
        throw new Error('Temperature value decoding not implemented');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getRadonValue(dataCharacteristic) {
        throw new Error('Radon value decoding not implemented');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getLuminanceValue(dataCharacteristic) {
        throw new Error('Luminance value decoding not implemented');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getHumidityValue(dataCharacteristic) {
        throw new Error('Humidity value decoding not implemented');
    }
    async onUninit() {
        if (this.poller) {
            this.homey.clearInterval(this.poller);
        }
        if (this.unavailableTimeout) {
            this.homey.clearTimeout(this.unavailableTimeout);
        }
    }
    async onSettings(data) {
        await AirthingsUtil_1.default.handleSettings(this, data);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug(...args) {
        if (!this.debugEnabled) {
            return;
        }
        super.log(`[d:${this.getData().address}]`, ...args);
    }
}
exports.default = BLEDevice;
//# sourceMappingURL=BLEDevice.js.map