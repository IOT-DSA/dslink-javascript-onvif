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

var GetStream = (function (_DS$SimpleNode$class) {
  _inherits(GetStream, _DS$SimpleNode$class);

  function GetStream() {
    _classCallCheck(this, GetStream);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GetStream).apply(this, arguments));
  }

  _createClass(GetStream, [{
    key: 'onInvoke',
    value: function onInvoke() {
      var cam = cameras[this.path.split("/")[1]];
      return new Promise(function (resolve, reject) {
        cam.getStreamUri({
          protocol: 'RTSP'
        }, function (e, stream) {
          if (e) return reject(e);
          console.log(stream);
          resolve({
            uri: stream.uri.toString()
          });
        });
      }).catch(function (e) {
        error(e);
      });
    }
  }]);

  return GetStream;
})(DS.SimpleNode.class);

exports.default = GetStream;
module.exports = exports['default'];