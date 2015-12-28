'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var context = require('../context');
var error = context.error;
var cameras = context.cameras;
var DS = context.DS;

var _require = require('../structure');

var CAMERA_STRUCTURE = _require.CAMERA_STRUCTURE;
var Camera = require('onvif').Cam;exports.default = DS.createNode({
  onInvoke: function onInvoke(params) {
    var prettyName = '@' + params.hostname + ':' + params.port;
    return new Promise(function (accept, reject) {
      console.log('Adding new camera ' + prettyName + ', with username ' + params.username + '.');
      var camera = new Camera({
        hostname: params.hostname,
        username: params.username,
        port: parseInt(params.port),
        password: params.password
      }, function (err) {
        if (err) {
          reject(err);
          return;
        }
        accept(camera);
      });
    }).then(function (camera) {
      console.log('Camera ' + prettyName + ' loaded successfully, getting device information.');
      cameras[params.name] = camera;

      return new Promise(function (accept, reject) {
        camera.getDeviceInformation(function (err, data) {
          if (err) {
            reject(err);
            return;
          }
          accept(data);
        });
      });
    }).then(function (data) {
      console.log('Camera ' + prettyName + ' device information added successfully, adding node.');
      context.link.addNode('/' + params.name, CAMERA_STRUCTURE(params, data));

      return {};
    }).catch(function (err) {
      error(err.stack);
    });
  }
});
module.exports = exports['default'];