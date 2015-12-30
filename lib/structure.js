export const defaultNodes = {
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
};

export const getStreamColumns = [
  {
    name: 'data',
    type: 'binary'
  }
];

export function cameraStructure(params, data, snapshotUrl) {
  const { username, password, hostname, port, name } = params;
  const { manufacturer, firmwareVersion, serialNumber, hardwareId } = data;

  return {
    $is: 'device',
    $$username: username,
    $$password: password,
    $$hostname: hostname,
    $$port: parseInt(port),
    $$name: name,
    snapshotUrl: {
      $name: 'Snapshot URL',
      $is: 'unserializable',
      $type: 'string',
      '?value': snapshotUrl
    },
    platform: {
      $is: 'unserializable',
      manufacturer: {
        $name: 'Manufacturer',
        $type: 'string',
        '?value': manufacturer
      },
      model: {
        $name: 'Model',
        $type: 'string',
        '?value': manufacturer
      },
      firmwareVersion: {
        $name: 'Firmware Version',
        $type: 'string',
        '?value': firmwareVersion
      },
      serialNumber: {
        $name: 'Serial Number',
        $type: 'string',
        '?value': serialNumber
      },
      hardwareId: {
        $name: 'Hardware ID',
        $type: 'string',
        '?value': hardwareId
      }
    },
    getSnapshot: {
      $is: 'getSnapshot',
      $name: 'Get JPEG Snapshot',
      $invokable: 'write',
      $$name: name,
      $$snapshotUrl: snapshotUrl,
      $params: [
        {
          name: 'updateURL',
          type: 'bool',
          default: false
        }
      ],
      $columns: [
        {
          name: 'jpeg',
          type: 'binary'
        }
      ]
    },
    /*
    getStream: {
      $is: 'getStream',
      $name: 'Get Video Stream',
      $$name: name,
      $invokable: 'write',
      $result: 'stream',
      $columns: getStreamColumns
    },
    */
    pan: {
      $is: 'panTiltZoom',
      $name: 'Pan Device',
      $invokable: 'write',
      $$name: name,
      $params: [
        {
          name: 'pan',
          type: 'int',
          min: -1,
          max: 1
        }, {
          name: 'seconds',
          type: 'int',
          min: 0,
          default: 1
        }
      ]
    },
    tilt: {
      $is: 'panTiltZoom',
      $name: 'Tilt Device',
      $invokable: 'write',
      $$name: name,
      $params: [
        {
          name: 'tilt',
          type: 'int',
          min: -1,
          max: 1
        }, {
          name: 'seconds',
          type: 'int',
          min: 0,
          default: 1
        }
      ]
    },
    zoom: {
      $is: 'panTiltZoom',
      $name: 'Zoom Device',
      $invokable: 'write',
      $$name: name,
      $params: [
        {
          name: 'zoom',
          type: 'int',
          min: -1,
          max: 1
        }, {
          name: 'seconds',
          type: 'int',
          min: 0,
          default: 1
        }
      ]
    }
  };
};
