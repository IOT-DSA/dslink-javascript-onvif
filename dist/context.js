"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.error = error;
function error(e) {
    console.log("error:" + e);
}

var cameras = exports.cameras = {};
var link = exports.link = null;

// export let DS = require('../../sdk-dslink-javascript/dist/dslink.node.js');
var DS = exports.DS = require('dslink');