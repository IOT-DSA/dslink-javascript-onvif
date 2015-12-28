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

var _require2 = require('http');

var get = _require2.get;

var _require3 = require('url');

var parse = _require3.parse;

var GetSnapshot = (function (_DS$SimpleNode$class) {
  _inherits(GetSnapshot, _DS$SimpleNode$class);

  function GetSnapshot(path, nodeProvider) {
    _classCallCheck(this, GetSnapshot);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GetSnapshot).call(this, path, nodeProvider));

    var cam = cameras[_this.path.split("/")[1]];
    _this.valueReady = false;
    _this.uri = new Promise(function (resolve, reject) {
      cam.getSnapshotUri(function (e, uri) {
        if (e) return reject(e);
        resolve(uri.uri.trim());
      });
    }).catch(function (e) {
      error(e.stack);
    });
    return _this;
  }

  _createClass(GetSnapshot, [{
    key: 'onInvoke',
    value: function onInvoke() {
      var cam = cameras[this.path.split("/")[1]];
      return this.uri.then(function (uri) {
        return new Promise(function (resolve, reject) {
          var opt = parse(uri);
          opt.auth = cam.username + ':' + cam.password;

          get(opt, function (res) {
            if (typeof res.statusCode === 'number' && res.statusCode !== 200) {
              reject(res.statusCode);
              return;
            }

            var data = [];

            res.on('data', function (buf) {
              data.push(buf);
            });

            res.on('end', function () {
              resolve(Buffer.concat(data));
            });
          }).on('error', function (e) {
            error(e);
          });
        });
      }).then(function (data) {
        return {
          jpeg: data
        };
      }).catch(function (e) {
        context.error(e);
      });
    }
  }]);

  return GetSnapshot;
})(DS.SimpleNode.class);

exports.default = GetSnapshot;
module.exports = exports['default'];