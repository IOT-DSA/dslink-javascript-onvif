import DS, { SimpleNode } from 'dslink';
import { cameras } from '../add_device';

import { promiseify } from '../../utils';

import logger from 'winston';

export class GetStream extends SimpleNode.class {
  onInvoke() {
    const cam = cameras[this.configs.$$name];

    const { promise, _ } = promiseify();
    cam.getStreamUri({
      protocol: 'RTSP'
    }, _);

    return promise.then((stream) => {
      return {
        uri: stream.uri.toString()
      };
    }).catch((err) => {
      logger.error(`${err}:\n${err.stack}`);
    });
  }
}
