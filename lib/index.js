process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;

var context = require('./context'),
    AddDevice = require('./nodes/add_device'),
    PanTiltZoom = require('./nodes/pan_tilt_zoom'),
    GetSnapshot = require('./nodes/get_snapshot'),
    GetStream = require('./nodes/get_stream'),
    DS = context.DS;

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
    addDevice: (path) => {
      return new AddDevice(path);
    },
    panTiltZoom: (path) => {
      return new PanTiltZoom(path);
    },
    getSnapshot: (path) => {
      return new GetSnapshot(path);
    },
    getStream: (path) => {
      return new GetStream(path);
    }
  }
});

link.connect().then(() => {
  context.link = link;
});
