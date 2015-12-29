'use strict';

require('babel-polyfill');

var _dslink = require('dslink');

var _dslink2 = _interopRequireDefault(_dslink);

var _add_device = require('./nodes/add_device');

var _device = require('./nodes/device');

var _pan_tilt_zoom = require('./nodes/camera/pan_tilt_zoom');

var _get_snapshot = require('./nodes/camera/get_snapshot');

var _get_stream = require('./nodes/camera/get_stream');

var _structure = require('./structure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnserializableNode = (function (_SimpleNode$class) {
  _inherits(UnserializableNode, _SimpleNode$class);

  function UnserializableNode(path, provider) {
    _classCallCheck(this, UnserializableNode);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UnserializableNode).call(this, path, provider));

    _this.serializable = false;
    return _this;
  }

  return UnserializableNode;
})(_dslink.SimpleNode.class);

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
      return new UnserializableNode(path, provider);
    },
    device: function device(path, provider) {
      return new _device.DeviceNode(path, provider);
    }
  }
});

link.init();
link.connect().then(function () {
  setInterval(function () {
    link.save();
  }, 1000 * 5);
});