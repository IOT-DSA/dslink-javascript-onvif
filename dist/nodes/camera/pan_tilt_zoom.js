'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('../../context');

var error = _require.error;
var cameras = _require.cameras;
var DS = _require.DS;

var PanTiltZoom = (function (_DS$SimpleNode$class) {
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

      var cam = cameras[this.path.split("/")[1]];
      return new Promise(function (resolve, reject) {
        cam.continuousMove(obj, function (e) {
          if (e) return reject(e);
          resolve({});
        });
      }).then(function () {
        return new Promise(function (resolve, reject) {
          if (params.duration) {
            setTimeout(function () {
              cam.stop({
                panTilt: typeof obj.zoom === 'undefined',
                zoom: typeof obj.zoom !== 'undefined'
              }, function () {
                resolve();
              });
            }, parseInt(params.duration) * 1000);
          } else {
            resolve();
          }
        });
      }).catch(function (e) {
        error(e);
      });
    }
  }]);

  return PanTiltZoom;
})(DS.SimpleNode.class);

exports.default = PanTiltZoom;
module.exports = exports['default'];