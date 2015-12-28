import DS, { SimpleNode } from 'dslink';
import { get } from 'http';
import { parse } from 'url';

import { cameras } from '../add_device';
import { promiseify } from '../../utils';

import logger from 'winston';

export class GetSnapshot extends SimpleNode.class {

  constructor(path, nodeProvider) {
    super(path, nodeProvider);

    const cam = cameras[this.configs.$$name];
    const { promise, _ } = promiseify();

    cam.getSnapshotUri(_);

    this.uri = promise.then(uri => uri.uri.trim()).catch((err) => {
      logger.error(`${err}:\n${err.stack}`);
    });
  }

  onInvoke() {
    const cam = cameras[this.configs.$$name];
    return this.uri.then((uri) => {
      return new Promise((resolve, reject) => {
        const opt = parse(uri);
        opt.auth = cam.username + ':' + cam.password;

        get(opt, (res) => {
          if(typeof(res.statusCode) === 'number' && res.statusCode !== 200) {
            reject(res.statusCode);
            return;
          }

          const data = [];

          res.on('data', (buf) => {
            data.push(buf);
          });

          res.on('end', () => {
            resolve(Buffer.concat(data));
          });
        }).on('error', (err) => {
          logger.error(`${err}:\n${err.stack}`);
        });
      });
    }).then((jpeg) => {
      return { jpeg };
    }).catch((err) => {
      logger.error(`${err}:\n${err.stack}`);
    });
  }
}
