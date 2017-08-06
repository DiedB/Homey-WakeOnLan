'use strict'

const Homey = require('homey');
const wol = require('node-wol');

class WOLDevice extends Homey.Device {
    onInit() {
        this.registerCapabilityListener('button', this.onWake.bind(this));
    }

    onWake() {
        const macAddress = this.getData().mac;

        this.log(`Waking up ${macAddress}`);
        try {
            wol.wake(macAddress, (error) => {
                if (error !== undefined) throw error;
            });

            this.log(`Woke up ${macAddress}`);
            return Promise.resolve(true);
        } catch (error) {
            this.log(`Failed waking up ${macAddress}`);
            return Promise.reject(new Error(`Failed waking up ${macAddress}`));
        }
    }
}

module.exports = WOLDevice;