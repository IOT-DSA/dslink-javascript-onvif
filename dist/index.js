'use strict';

require('babel-polyfill');

var _dslink = require('dslink');

var _dslink2 = _interopRequireDefault(_dslink);

var _add_device = require('./nodes/add_device');

var _discover_devices = require('./nodes/discover_devices');

var _device = require('./nodes/device');

var _pan_tilt_zoom = require('./nodes/camera/pan_tilt_zoom');

var _get_snapshot = require('./nodes/camera/get_snapshot');

var _get_stream = require('./nodes/camera/get_stream');

var _structure = require('./structure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var link = new _dslink.LinkProvider(process.argv.slice(2), 'onvif-', {
  defaultNodes: _structure.defaultNodes,
  profiles: {
    addDevice: function addDevice(path, provider) {
      return new _add_device.AddDevice(path, provider);
    },
    panTiltZoom: function panTiltZoom(path, provider) {
      return new _pan_tilt_zoom.PanTiltZoom(path, provider);
    },
    getSnapshot: function getSnapshot(path, provider) {
      return new _get_snapshot.GetSnapshot(path, provider);
    },
    getStream: function getStream(path, provider) {
      return new _get_stream.GetStream(path, provider);
    },
    unserializable: function unserializable(path, provider) {
      return new _dslink.UnserializableNode(path, provider);
    },
    device: function device(path, provider) {
      return new _device.DeviceNode(path, provider);
    },
    discoverDevices: function discoverDevices(path, provider) {
      return new _discover_devices.DiscoverDevices(path, provider);
    }
  }
});

link.init();
link.connect().then(function () {
  setInterval(function () {
    link.save();
  }, 1000 * 5);
});