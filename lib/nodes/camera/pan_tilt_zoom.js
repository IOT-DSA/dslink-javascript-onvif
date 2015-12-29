import DS, { SimpleNode } from 'dslink';
import { cameras } from '../add_device';

import { promiseify } from '../../utils';

import logger from 'winston';

export class PanTiltZoom extends DS.SimpleNode.class {
  constructor(path, provider) {
    super(path, provider);
    this.serializable = false;
  }

  onInvoke(params) {
    var obj = {};
    if(params.pan)
      obj.x = parseInt(params.pan);
    if(params.tilt)
      obj.y = parseInt(params.tilt);
    if(params.zoom)
      obj.zoom = parseInt(params.zoom);

    const cam = cameras[this.configs.$$name];
    const { promise, _ } = promiseify({
      returnedData: {}
    });
    cam.continuousMove(obj, _);

    promise.then(() => {
      if(!params.duration)
        return {};

      const { promise, _ } = promiseify();
      setTimeout(() => {
        cam.stop({
          panTilt: typeof(obj.zoom) === 'undefined',
          zoom: typeof(obj.zoom) !== 'undefined'
        }, _);
      }, parseInt(params.duration) * 1000);

      return promise;
    }).catch((err) => {
      logger.error(`${err}:\n${err.stack}`);
    });
  }
}
