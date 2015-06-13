process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;

var context = require('./lib/context'),
    AddDevice = require('./lib/nodes/add_device'),
    PanTiltZoom = require('./lib/nodes/pan_tilt_zoom'),
    GetSnapshot = require('./lib/nodes/get_snapshot'),
    GetStream = require('./lib/nodes/get_stream'),
    DS = require('dslink');

var link = new DS.LinkProvider(process.argv.slice(2), 'onvif-', {
  defaultNodes: {
    addDevice: {
      $name: 'Add ONVIF Device',
      $is: 'addDevice',
      $invokable: 'write',
      $params: [
        {
          name: 'name',
          type: 'string'
        }, {
          name: 'hostname',
          type: 'string'
        }, {
          name: 'port',
          type: 'int',
          default: 80
        }, {
          name: 'username',
          type: 'string'
        }, {
          name: 'password',
          type: 'string',
          editor: 'password'
        }
      ]
    }
  },
  profiles: {
    addDevice: function(path) {
      return new AddDevice(path);
    },
    panTiltZoom: function(path) {
      return new PanTiltZoom(path);
    },
    getSnapshot: function(path) {
      return new GetSnapshot(path);
    },
    getStream: function(path) {
      return new GetStream(path);
    }
  }
});

link.connect().then(function() {
  context.link = link;
});
