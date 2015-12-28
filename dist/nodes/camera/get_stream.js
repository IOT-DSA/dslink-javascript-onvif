'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetStream = undefined;

var _dslink = require('dslink');

var _dslink2 = _interopRequireDefault(_dslink);

var _add_device = require('../add_device');

var _utils = require('../../utils');

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GetStream = exports.GetStream = (function (_SimpleNode$class) {
  _inherits(GetStream, _SimpleNode$class);

  function GetStream() {
    _classCallCheck(this, GetStream);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GetStream).apply(this, arguments));
  }

  _createClass(GetStream, [{
    key: 'onInvoke',
    value: function onInvoke() {
      var cam = _add_device.cameras[this.configs.$$name];

      var _promiseify = (0, _utils.promiseify)();

      var promise = _promiseify.promise;
      var _ = _promiseify._;

      cam.getStreamUri({
        protocol: 'RTSP'
      }, _);

      return promise.then(function (stream) {
        return {
          uri: stream.uri.toString()
        };
      }).catch(function (err) {
        _winston2.default.error(err + ':\n' + err.stack);
      });
    }
  }]);

  return GetStream;
})(_dslink.SimpleNode.class);