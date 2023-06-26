"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CloudDriver_1 = __importDefault(require("../../lib/cloud/CloudDriver"));
const AirthingsDefinitions_1 = require("../../types/AirthingsDefinitions");
class CloudViewSeriesDriver extends CloudDriver_1.default {
    filterOnType(deviceType) {
        return [
            AirthingsDefinitions_1.airthingsDeviceType_VIEW_PLUS,
            AirthingsDefinitions_1.airthingsDeviceType_VIEW_RADON,
            AirthingsDefinitions_1.airthingsDeviceType_VIEW_POLLUTION,
        ].includes(deviceType);
    }
}
module.exports = CloudViewSeriesDriver;
//# sourceMappingURL=driver.js.map