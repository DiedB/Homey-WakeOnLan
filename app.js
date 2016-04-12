"use strict";

function init() {

	var wol = require('node-wol');

	

	Homey.manager('flow').on('action.wol', function(callback, args){
		var mac = args.mac;

		if (mac.match("(?:[A-Fa-f0-9]{2}[:-]){5}(?:[A-Fa-f0-9]{2})")) {
			Homey.log("Waking up: ", mac);
			
			try {
				wol.wake(mac);
			} catch(err) {
				callback('Mac address malformed!', false);
			}

			callback(null, true);
		} else {
			callback('Mac address malformed!', false);
		}
	});
	
}

module.exports.init = init;
