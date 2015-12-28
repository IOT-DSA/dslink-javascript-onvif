"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateProfiles = generateProfiles;
exports.promiseify = promiseify;
function generateProfiles() {
  var map = {};

  for (var _len = arguments.length, nodes = Array(_len), _key = 0; _key < _len; _key++) {
    nodes[_key] = arguments[_key];
  }

  nodes.forEach(function (node) {
    map[node.profileName] = node.factory;
  });

  return map;
}

function promiseify(passed_data) {
  var promise_cb, _resolve, _reject;

  function resolve(data) {
    if (_resolve) {
      _resolve(data);
    } else {
      promise_cb = function () {
        _resolve(data);
      };
    }
  }

  function reject(err) {
    if (_reject) {
      _reject(err);
    } else {
      promise_cb = function () {
        _reject(err);
      };
    }
  }

  return {
    promise: new Promise(function (resolve_cb, reject_cb) {
      _resolve = function (data) {
        return resolve_cb(data);
      };
      _reject = function (err) {
        return reject_cb(err);
      };

      if (promise_cb) promise_cb();
    }),
    _: function _(err, data) {
      if (err) {
        return reject(err);
      }

      resolve(passed_data || data);
    }
  };
}