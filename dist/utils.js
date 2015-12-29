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

function promiseify() {
  var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var returnedData = obj.returnedData;
  var allowAdditionalData = obj.allowAdditionalData;

  allowAdditionalData = allowAdditionalData || false;

  var resolve = undefined,
      reject = undefined;

  return {
    promise: new Promise(function (resolve_cb, reject_cb) {
      resolve = resolve_cb;
      reject = reject_cb;
    }),
    _: function _(err, data, additionalData) {
      if (err) {
        if (allowAdditionalData) return reject({ err: err, additionalData: additionalData });
        return reject(err);
      }

      resolve(returnedData || data);
    }
  };
}