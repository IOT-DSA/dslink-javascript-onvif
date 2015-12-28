'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddDevice = exports.cameras = undefined;

var _dslink = require('dslink');

var _dslink2 = _interopRequireDefault(_dslink);

var _onvif = require('onvif');

var _structure = require('../structure');

var _utils = require('../utils');

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cameras = exports.cameras = {};

var AddDevice = exports.AddDevice = (function (_SimpleNode$class) {
  _inherits(AddDevice, _SimpleNode$class);

  function AddDevice() {
    _classCallCheck(this, AddDevice);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AddDevice).apply(this, arguments));
  }

  _createClass(AddDevice, [{
    key: 'onInvoke',
    value: function onInvoke(params) {
      var _this2 = this;

      var prettyName = '@' + params.hostname + ':' + params.port;
      return new Promise(function (accept, reject) {
        console.log('Adding new camera ' + prettyName + ', with username ' + params.username + '.');

        var _promiseify = (0, _utils.promiseify)(camera);

        var promise = _promiseify.promise;
        var _ = _promiseify._;

        var camera = new _onvif.Cam({
          hostname: params.hostname,
          username: params.username,
          port: parseInt(params.port),
          password: params.password
        }, _);

        return promise;
      }).then(function (camera) {
        console.log('Camera ' + prettyName + ' loaded successfully, getting device information.');
        cameras[params.name] = camera;

        var _promiseify2 = (0, _utils.promiseify)();

        var promise = _promiseify2.promise;
        var _ = _promiseify2._;

        camera.getDeviceInformation(_);

        return promise;
      }).then(function (data) {
        console.log('Camera ' + prettyName + ' device information added successfully, adding node.');
        _this2.provider.addNode('/' + params.name, (0, _structure.cameraStructure)(params, data));

        return {};
      }).catch(function (err) {
        _winston2.default.error(err + ':\n' + err.stack);
      });
    }
  }]);

  return AddDevice;
})(_dslink.SimpleNode.class);

;