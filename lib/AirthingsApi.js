"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
const homey_oauth2app_1 = require("homey-oauth2app");
class AirthingsApiImpl extends homey_oauth2app_1.OAuth2Client {
    async getDevices() {
        const data = await this.get({
            path: '/devices',
        });
        return data.devices;
    }
    async getDeviceLatestValues(deviceId) {
        const data = await this.get({
            path: `/devices/${deviceId}/latest-samples`,
        });
        return data.data;
    }
}
AirthingsApiImpl.AUTHORIZATION_URL = homey_1.default.env.OAUTH_AUTHORIZATION_URL;
AirthingsApiImpl.TOKEN_URL = homey_1.default.env.OAUTH_TOKEN_URL;
AirthingsApiImpl.API_URL = homey_1.default.env.API_BASE_URL;
AirthingsApiImpl.SCOPES = ['read:device'];
module.exports = AirthingsApiImpl;
//# sourceMappingURL=AirthingsApi.js.map