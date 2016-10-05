'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cameraStructure = cameraStructure;
var discoverColumns = exports.discoverColumns = [{
  name: 'hostname',
  type: 'string'
}, {
  name: 'port',
  type: 'int'
}];

var defaultNodes = exports.defaultNodes = {
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
  },
  discoverDevices: {
    $name: 'Discover Devices',
    $is: 'discoverDevices',
    $invokable: 'write',
    $result: 'table',
    $params: [],
    $columns: discoverColumns
  }
};

var getStreamColumns = exports.getStreamColumns = [{
  name: 'data',
  type: 'binary'
}];

function cameraStructure(params, data, snapshotUrl, streamUrl) {
  var username = params.username;
  var password = params.password;
  var hostname = params.hostname;
  var port = params.port;
  var name = params.name;
  var manufacturer = data.manufacturer;
  var firmwareVersion = data.firmwareVersion;
  var serialNumber = data.serialNumber;
  var hardwareId = data.hardwareId;


  return {
    $is: 'device',
    $$username: username,
    $$password: password,
    $$hostname: hostname,
    $$port: parseInt(port),
    $$name: name,
    snapshotUrl: {
      $name: 'Snapshot URL',
      $is: 'unserializable',
      $type: 'string',
      '?value': snapshotUrl
    },
    streamUrl: {
      $name: 'Video Stream URL (RTSP)',
      $is: 'unserializable',
      $type: 'string',
      '?value': streamUrl
    },
    platform: {
      $is: 'unserializable',
      manufacturer: {
        $name: 'Manufacturer',
        $type: 'string',
        '?value': manufacturer
      },
      model: {
        $name: 'Model',
        $type: 'string',
        '?value': manufacturer
      },
      firmwareVersion: {
        $name: 'Firmware Version',
        $type: 'string',
        '?value': firmwareVersion
      },
      serialNumber: {
        $name: 'Serial Number',
        $type: 'string',
        '?value': serialNumber
      },
      hardwareId: {
        $name: 'Hardware ID',
        $type: 'string',
        '?value': hardwareId
      }
    },
    getSnapshot: {
      $is: 'getSnapshot',
      $name: 'Get JPEG Snapshot',
      $invokable: 'write',
      $$name: name,
      $$snapshotUrl: snapshotUrl,
      $params: [{
        name: 'updateURL',
        type: 'bool',
        default: false
      }],
      $columns: [{
        name: 'jpeg',
        type: 'binary'
      }]
    },
    pan: {
      $is: 'panTiltZoom',
      $name: 'Pan Device',
      $invokable: 'write',
      $$name: name,
      $params: [{
        name: 'pan',
        type: 'int',
        min: -1,
        max: 1
      }, {
        name: 'seconds',
        type: 'int',
        min: 0,
        default: 1
      }]
    },
    tilt: {
      $is: 'panTiltZoom',
      $name: 'Tilt Device',
      $invokable: 'write',
      $$name: name,
      $params: [{
        name: 'tilt',
        type: 'int',
        min: -1,
        max: 1
      }, {
        name: 'seconds',
        type: 'int',
        min: 0,
        default: 1
      }]
    },
    zoom: {
      $is: 'panTiltZoom',
      $name: 'Zoom Device',
      $invokable: 'write',
      $$name: name,
      $params: [{
        name: 'zoom',
        type: 'int',
        min: -1,
        max: 1
      }, {
        name: 'seconds',
        type: 'int',
        min: 0,
        default: 1
      }]
    }
  };
};