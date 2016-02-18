"use strict";

function init() {

	var wol = require('node-wol');

	Homey.manager('flow').on('action.wol', function( callback, args ){
		var mac = args.mac;

		// Remove div tags, probably a bug in Homey
		mac = mac.replace('<div>', '');
		mac = mac.replace('</div>', '');

		Homey.log("Waking up: ", mac);
		
		wol.wake(mac);

		callback(null, true);
	});
	
}

module.exports.init = init;