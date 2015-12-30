'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetSnapshot = undefined;

var _dslink = require('dslink');

var _dslink2 = _interopRequireDefault(_dslink);

var _http = require('http');

var _url = require('url');

var _add_device = require('../add_device');

var _utils = require('../../utils');

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GetSnapshot = exports.GetSnapshot = (function (_SimpleNode$class) {
  _inherits(GetSnapshot, _SimpleNode$class);

  function GetSnapshot(path, provider) {
    _classCallCheck(this, GetSnapshot);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GetSnapshot).call(this, path, provider));

    _this.serializable = false;
    return _this;
  }

  _createClass(GetSnapshot, [{
    key: 'load',
    value: function load(map) {
      _get(Object.getPrototypeOf(GetSnapshot.prototype), 'load', this).call(this, map);
    }
  }, {
    key: 'onInvoke',
    value: function onInvoke(params) {
      var _this2 = this;

      var cam = _add_device.cameras[this.configs.$$name];
      var uri = this.configs.$$snapshotUrl;

      var promise = new Promise(function (resolve, reject) {
        var opt = (0, _url.parse)(uri);
        opt.auth = cam.username + ':' + cam.password;

        (0, _http.get)(opt, function (res) {
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
        }).on('error', function (err) {
          _winston2.default.error(err + ':\n' + err.stack);
        });
      }).then(function (jpeg) {
        return { jpeg: jpeg };
      }).catch(function (err) {
        _winston2.default.error(err + ':\n' + err.stack);
      });

      if (params.updateURL) {
        var pi = (0, _utils.promiseify)();var _ = pi._;var future = pi.promise;
        cam.getSnapshotUri(_);

        return future.then(function (uri) {
          _this2.configs = Object.assign(_this2.configs, {
            $$snapshotUrl: uri.uri.trim()
          });
          return promise;
        });
      } else {
        return promise;
      }
    }
  }]);

  return GetSnapshot;
})(_dslink.SimpleNode.class);