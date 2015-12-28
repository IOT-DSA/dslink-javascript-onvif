import DS, { SimpleNode } from 'dslink';
import { cameras } from '../add_device';

import { promiseify } from '../../utils';

import logger from 'winston';

export class PanTiltZoom extends DS.SimpleNode.class {
  onInvoke(params) {
    var obj = {};
    if(params.pan)
      obj.x = parseInt(params.pan);
    if(params.tilt)
      obj.y = parseInt(params.tilt);
    if(params.zoom)
      obj.zoom = parseInt(params.zoom);

    var cam = cameras[this.configs.$$name];
    return new Promise((resolve, reject) => {
      const { promise, _ } = promiseify({});
      cam.continuousMove(obj, _);

      return promise;
    }).then(() => {
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
