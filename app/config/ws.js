'use strict';

/**
 * WebSocket server for real-time client-server communication.
 * You can require this config file in your controllers and start sending WebSocket messages to connected clients.
 * See /controllers directory for sample usage.
 */

var WebSocketServer = require('ws').Server,
    url = require('url'),
    _ = require('lodash')

exports.listen = function (server) {
  return 12;
};  