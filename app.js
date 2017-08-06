'use strict'

const Homey = require('homey');
const wol = require('node-wol');

class WakeOnLAN extends Homey.App {
	onInit() {
		this.log('Running');
	}
}

module.exports = WakeOnLAN;