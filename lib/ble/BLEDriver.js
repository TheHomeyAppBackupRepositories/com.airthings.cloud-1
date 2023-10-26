"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = require("homey");
const AirthingsDefinitions_1 = require("../../types/AirthingsDefinitions");
class BLEDriver extends homey_1.Driver {
    constructor() {
        super(...arguments);
        this.DISCOVER_INTERVAL = 1000 * 60; // 1 minute
        this.onDiscoverInterval = null;
        this.advertisements = {};
        this.waitingForAddresses = new Set();
    }
    async onInit() {
        this.onDiscoverInterval = this.homey.setInterval(() => {
            if (this.waitingForAddresses.size === 0) {
                // Only search when still waiting for a device
                return;
            }
            this.onDiscover().catch(this.error);
        }, this.DISCOVER_INTERVAL);
        await this.onDiscover().catch(this.error);
        this.log(this.DRIVER_NAME + ' driver has been initialized');
    }
    async onUninit() {
        if (!this.onDiscoverInterval) {
            return;
        }
        this.homey.clearInterval(this.onDiscoverInterval);
        this.onDiscoverInterval = null;
    }
    async onDiscover() {
        this.log('Discovering...');
        this.log('looking for service uuid:', this.DISCOVERY_SERVICE_UUID);
        const advertisements = await this.homey.ble
            .discover([this.DISCOVERY_SERVICE_UUID])
            .catch(this.error);
        if (!advertisements) {
            return;
        }
        this.log(`Found ${advertisements.length} devices.`);
        advertisements.forEach(advertisement => {
            const manufacturer = advertisement.manufacturerData.readUInt16LE(0);
            if (manufacturer !== 0x0334) {
                this.log('Unknown manufacturer', manufacturer);
                return;
            }
            // Store the advertisement in memory
            const address = advertisement.address;
            if (!this.advertisements[address]) {
                this.waitingForAddresses.delete(address);
                this.advertisements[address] = advertisement;
                this.emit(`advertisement:${address}`, advertisement);
            }
        });
    }
    async onPairListDevices() {
        const units = this.homey.i18n.getUnits();
        this.log('Homey language/units', this.homey.i18n.getLanguage(), units);
        await this.onDiscover().catch(this.error);
        return Object.entries(this.advertisements).map(([address, advertisement]) => ({
            data: { address },
            name: `${this.DRIVER_NAME} (S/N: ${advertisement.manufacturerData.readUInt32LE(2).toString(10)})`,
            settings: {
                [AirthingsDefinitions_1.setting_radon_units]: units,
            },
        }));
    }
    getAdvertisement(address, callback) {
        if (this.advertisements[address]) {
            callback(this.advertisements[address]);
            return;
        }
        this.waitingForAddresses.add(address);
        this.once(`advertisement:${address}`, callback);
    }
}
exports.default = BLEDriver;
//# sourceMappingURL=BLEDriver.js.map