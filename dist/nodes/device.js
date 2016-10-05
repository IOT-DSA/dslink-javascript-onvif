'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeviceNode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dslink = require('dslink');

var _dslink2 = _interopRequireDefault(_dslink);

var _structure = require('../structure');

var _add_device = require('./add_device');

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wasCalled = {};

var DeviceNode = exports.DeviceNode = function (_SimpleNode) {
  _inherits(DeviceNode, _SimpleNode);

  function DeviceNode() {
    _classCallCheck(this, DeviceNode);

    return _possibleConstructorReturn(this, (DeviceNode.__proto__ || Object.getPrototypeOf(DeviceNode)).apply(this, arguments));
  }

  _createClass(DeviceNode, [{
    key: 'load',
    value: function load(map) {
      var _this2 = this;

      if (!map.platform && !wasCalled[this.path]) {
        (function () {
          wasCalled[_this2.path] = true;

          var params = {
            hostname: map.$$hostname,
            username: map.$$username,
            password: map.$$password,
            port: map.$$port,
            name: map.$$name
          };
          var prettyName = '@' + params.hostname + ':' + params.port;

          (0, _add_device.addCamera)(params).then(function (obj) {
            var data = obj.data;
            var uri = obj.uri;
            var rtsp = obj.rtsp;

            console.log('Camera ' + prettyName + ' loaded successfully from nodes.json, populating node.');
            _this2.load((0, _structure.cameraStructure)(params, data, uri, rtsp), false);
          }).catch(function (err) {
            _this2.provider.removeNode(_this2.path);

            if (err.additionalData) _winston2.default.error(err.err + ':\n' + err.err.stack + '\n' + err.additionalData);else _winston2.default.error(err + ':\n' + err.stack);
            _winston2.default.error('Camera ' + prettyName + ' loaded from nodes.json but not able to connect.');
          });
        })();
      }

      _get(DeviceNode.prototype.__proto__ || Object.getPrototypeOf(DeviceNode.prototype), 'load', this).call(this, map);
    }
  }]);

  return DeviceNode;
}(_dslink.SimpleNode);