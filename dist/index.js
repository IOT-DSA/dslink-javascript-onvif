'use strict';

require('babel-polyfill');

var context = require('./context'),
    AddDevice = require('./nodes/add_device'),
    PanTiltZoom = require('./nodes/camera/pan_tilt_zoom'),
    GetSnapshot = require('./nodes/camera/get_snapshot'),
    GetStream = require('./nodes/camera/get_stream'),
    DS = context.DS;

var link = new DS.LinkProvider(process.argv.slice(2), 'onvif-', {
  defaultNodes: {
    addDevice: {
      $name: 'Add ONVIF Device',
      $is: 'addDevice',
      $invokable: 'write',
      $params: [{
        name: 'name',
        type: 'string'
      }, {
        name: 'hostname',
        type: 'string'
      }, {
        name: 'port',
        type: 'int',
        default: 80
      }, {
        name: 'username',
        type: 'string'
      }, {
        name: 'password',
        type: 'string',
        editor: 'password'
      }]
    }
  },
  profiles: {
    addDevice: function addDevice(path, provider) {
      return new AddDevice(path, provider);
    },
    panTiltZoom: function panTiltZoom(path, provider) {
      return new PanTiltZoom(path, provider);
    },
    getSnapshot: function getSnapshot(path, provider) {
      return new GetSnapshot(path, provider);
    },
    getStream: function getStream(path, provider) {
      return new GetStream(path, provider);
    }
  }
});

link.connect().then(function () {
  // process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;
  context.link = link;
});