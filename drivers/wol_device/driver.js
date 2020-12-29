'use strict';

const Homey = require('homey');

class LANDriver extends Homey.Driver {
  async onPair(session) {
    session.setHandler("validate", async data => {
      return /^([0-9a-fA-F]{2}[:.-]?){5}[0-9a-fA-F]{2}$/.test(data.mac);
    });
  }
}

module.exports = LANDriver;