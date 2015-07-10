export const CAMERA_STRUCTURE = (params, data) => {
  return {
    $$username: params.username,
    $$password: params.password,
    $$hostname: params.hostname,
    $$port: parseInt(params.port),
    platform: {
      manufacturer: {
        $name: 'Manufacturer',
        $type: 'string',
        '?value': data.manufacturer
      },
      model: {
        $name: 'Model',
        $type: 'string',
        '?value': data.manufacturer
      },
      firmwareVersion: {
        $name: 'Firmware Version',
        $type: 'string',
        '?value': data.firmwareVersion
      },
      serialNumber: {
        $name: 'Serial Number',
        $type: 'string',
        '?value': data.serialNumber
      },
      hardwareId: {
        $name: 'Hardware ID',
        $type: 'string',
        '?value': data.hardwareId
      }
    },
    getSnapshot: {
      $is: 'getSnapshot',
      $name: 'Get JPEG Snapshot',
      $invokable: 'write',
      $columns: [
        {
          name: 'jpeg',
          type: 'binary'
        }
      ]
    },
    getStream: {
      $is: 'getStream',
      $name: 'Get MPEG Stream',
      $invokable: 'write',
      $columns: [
        {
          // temp
          name: 'uri',
          type: 'string'
        }
      ]
    },
    pan: {
      $is: 'panTiltZoom',
      $name: 'Pan Device',
      $invokable: 'write',
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
