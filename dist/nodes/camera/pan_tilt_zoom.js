'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanTiltZoom = undefined;

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

var PanTiltZoom = exports.PanTiltZoom = (function (_DS$SimpleNode$class) {
  _inherits(PanTiltZoom, _DS$SimpleNode$class);

  function PanTiltZoom() {
    _classCallCheck(this, PanTiltZoom);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PanTiltZoom).apply(this, arguments));
  }

  _createClass(PanTiltZoom, [{
    key: 'onInvoke',
    value: function onInvoke(params) {
      var obj = {};
      if (params.pan) obj.x = parseInt(params.pan);
      if (params.tilt) obj.y = parseInt(params.tilt);
      if (params.zoom) obj.zoom = parseInt(params.zoom);

      var cam = _add_device.cameras[this.configs.$$name];

      var _promiseify = (0, _utils.promiseify)({});

      var promise = _promiseify.promise;
      var _ = _promiseify._;

      cam.continuousMove(obj, _);

      promise.then(function () {
        if (!params.duration) return {};

        var _promiseify2 = (0, _utils.promiseify)();

        var promise = _promiseify2.promise;
        var _ = _promiseify2._;

        setTimeout(function () {
          cam.stop({
            panTilt: typeof obj.zoom === 'undefined',
            zoom: typeof obj.zoom !== 'undefined'
          }, _);
        }, parseInt(params.duration) * 1000);

        return promise;
      }).catch(function (err) {
        _winston2.default.error(err + ':\n' + err.stack);
      });
    }
  }]);

  return PanTiltZoom;
})(_dslink2.default.SimpleNode.class);