'use strict';

const Homey = require('homey');
const wol = require('node-wol');

class WOLDriver extends Homey.Driver {
	onPair(socket) {
        this.log('Pairing started');
        
        socket.on('validate', (data, callback) => {
            callback(this.testAddress(data.mac));
        });
    }

    testAddress(mac) {
        try {
            wol.createMagicPacket(mac);
        } catch (error) {
            return false;
        }
        
        return true;
    }
}

module.exports = WOLDriver;