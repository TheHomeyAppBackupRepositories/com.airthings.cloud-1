"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BLEDriver_1 = __importDefault(require("../../lib/ble/BLEDriver"));
class BluetoothWavePlusDriver extends BLEDriver_1.default {
    constructor() {
        super(...arguments);
        this.DISCOVERY_SERVICE_UUID = 'b42e1c08ade711e489d3123b93f75cba';
        this.DRIVER_NAME = 'Wave+';
        this.DATA_CHARACTERISTIC = 'b42e2a68ade711e489d3123b93f75cba';
    }
}
module.exports = BluetoothWavePlusDriver;
//# sourceMappingURL=driver.js.map