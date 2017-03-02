"use strict";

var wol = require('node-wol');

var devices = {};

module.exports.init = function( devices_data, callback ) {
    devices_data.forEach(function(device_data){
        initDevice( device_data );
    })

    callback();
}

module.exports.added = function( device_data, callback ) {
    initDevice( device_data );
    callback( null, true );
}

module.exports.deleted = function( device_data, callback ) {
    delete devices[ device_data.id ];
    callback( null, true );
}

module.exports.pair = function( socket ) {
    Homey.log('Pairing started');
}

module.exports.capabilities = {};
module.exports.capabilities.button = {};
module.exports.capabilities.button.set = function( device_data, button, callback ) {
    Homey.log('Waking up ' + device_data.id);

    try {
      wol.wake(device_data.id);
      callback(null, true);
    } catch(err) {
      callback('MAC address malformed!', false);
    }
}


function initDevice( device_data ) {
    devices[ device_data.id ] = {};
    devices[ device_data.id ].data = device_data;
}
