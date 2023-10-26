"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BLEDevice_1 = __importDefault(require("../../lib/ble/BLEDevice"));
class BluetoothWavePlusDevice extends BLEDevice_1.default {
    constructor() {
        super(...arguments);
        this.DEVICE_NAME = 'Wave+';
    }
    checkSensorVersion(dataCharacteristic) {
        return dataCharacteristic.readUInt8(0) === 1;
    }
    getVOCValue(dataCharacteristic) {
        return dataCharacteristic.readUInt16LE(14);
    }
    getCO2Value(dataCharacteristic) {
        return dataCharacteristic.readUInt16LE(12);
    }
    getPressureValue(dataCharacteristic) {
        return dataCharacteristic.readUInt16LE(10) / 50.0;
    }
    getTemperatureValue(dataCharacteristic) {
        return dataCharacteristic.readUInt16LE(8) / 100.0;
    }
    getRadonValue(dataCharacteristic) {
        return dataCharacteristic.readUInt16LE(6);
    }
    getLuminanceValue(dataCharacteristic) {
        return dataCharacteristic.readUInt8(2);
    }
    getHumidityValue(dataCharacteristic) {
        return dataCharacteristic.readUInt8(1) / 2.0;
    }
}
module.exports = BluetoothWavePlusDevice;
//# sourceMappingURL=device.js.map