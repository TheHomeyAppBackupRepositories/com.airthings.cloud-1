"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BLEDevice_1 = __importDefault(require("../../lib/ble/BLEDevice"));
class BluetoothWaveMiniDevice extends BLEDevice_1.default {
    constructor() {
        super(...arguments);
        this.DEVICE_NAME = 'Wave mini';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    checkSensorVersion(dataCharacteristic) {
        return true; // There's no version in the data of this device
    }
    getVOCValue(dataCharacteristic) {
        return dataCharacteristic.readUInt16LE(8);
    }
    getPressureValue(dataCharacteristic) {
        return dataCharacteristic.readUInt16LE(4) / 50.0;
    }
    getTemperatureValue(dataCharacteristic) {
        return (dataCharacteristic.readUInt16LE(2) / 100.0) - 273.15;
    }
    getLuminanceValue(dataCharacteristic) {
        return dataCharacteristic.readUInt16LE(0);
    }
    getHumidityValue(dataCharacteristic) {
        return dataCharacteristic.readUInt16LE(6) / 100.0;
    }
}
module.exports = BluetoothWaveMiniDevice;
//# sourceMappingURL=device.js.map