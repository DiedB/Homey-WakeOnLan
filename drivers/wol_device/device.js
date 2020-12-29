"use strict";

const Homey = require("homey");
const wol = require("wol");

class LANDevice extends Homey.Device {
  async onInit() {
    this.registerCapabilityListener("button", async () => {
      const macAddress = this.getData().mac;
      this.log(`Waking up ${macAddress}`);

      try {
        wol.wake(macAddress, (error) => {
          if (error) throw error;
        });

        this.log(`Woke up ${macAddress}`);
        return Promise.resolve();
      } catch (error) {
        this.log(`Failed waking up ${macAddress}`);
        return Promise.reject(error);
      }
    });
  }
}

module.exports = LANDevice;
