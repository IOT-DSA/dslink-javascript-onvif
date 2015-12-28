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
  var resolve, reject;

  return {
    promise: new Promise(function (resolve_cb, reject_cb) {
      resolve = resolve_cb;
      reject = reject_cb;
    }),
    _: function _(err, data) {
      if (err) {
        return reject(err);
      }

      resolve(passed_data || data);
    }
  };
}