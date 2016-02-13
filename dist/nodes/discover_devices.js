'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscoverDevices = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dslink = require('dslink');

var _dslink2 = _interopRequireDefault(_dslink);

var _onvif = require('onvif');

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _structure = require('../structure');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DiscoverDevices = exports.DiscoverDevices = function (_SimpleNode$class) {
  _inherits(DiscoverDevices, _SimpleNode$class);

  function DiscoverDevices() {
    _classCallCheck(this, DiscoverDevices);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DiscoverDevices).apply(this, arguments));
  }

  _createClass(DiscoverDevices, [{
    key: 'onInvoke',
    value: function onInvoke() {
      var _promiseify = (0, _utils.promiseify)();

      var promise = _promiseify.promise;
      var _ = _promiseify._;

      _onvif.Discovery.probe({ resolve: false }, _);

      return promise.then(function (cams) {
        console.log('Successfully probed ' + cams.length + ' devices.');
        return cams.map(function (data) {
          var camUri = _url2.default.parse(data.probeMatches.probeMatch.XAddrs);
          return {
            hostname: camUri.hostname,
            port: parseInt(camUri.port, 10)
          };
        });
      });
    }
  }]);

  return DiscoverDevices;
}(_dslink.SimpleNode.class);