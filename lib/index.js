var context = require('./context'),
    AddDevice = require('./nodes/add_device'),
    PanTiltZoom = require('./nodes/camera/pan_tilt_zoom'),
    GetSnapshot = require('./nodes/camera/get_snapshot'),
    GetStream = require('./nodes/camera/get_stream'),
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
    addDevice: (path, provider) => {
      return new AddDevice(path, provider);
    },
    panTiltZoom: (path, provider) => {
      return new PanTiltZoom(path, provider);
    },
    getSnapshot: (path, provider) => {
      return new GetSnapshot(path, provider);
    },
    getStream: (path, provider) => {
      return new GetStream(path, provider);
    }
  }
});

link.connect().then(() => {
  // process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;
  context.link = link;
});
