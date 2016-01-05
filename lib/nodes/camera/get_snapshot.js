import DS, { SimpleNode } from 'dslink';
import { get } from 'http';
import { parse } from 'url';

import { cameras } from '../add_device';
import { promiseify } from '../../utils';

import logger from 'winston';

export class GetSnapshot extends SimpleNode.class {
  constructor(path, provider) {
    super(path, provider);
    this.serializable = false;
  }

  load(map) {
    super.load(map);
  }

  onInvoke(params) {
    const cam = cameras[this.configs.$$name];
    const uri = this.configs.$$snapshotUrl;

    const promise = new Promise((resolve, reject) => {
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

        res.on('error', (err) => {
          reject(err);
        });
      }).on('error', (err) => {
        reject(err);
      });
    }).then((jpeg) => {
      return { jpeg };
    }).catch((err) => {
      logger.error(`${err}:\n${err.stack}`);
    });

    if(params.updateURL) {
      let pi = promiseify(), { _ } = pi, future = pi.promise;
      cam.getSnapshotUri(_);

      return future.then((uri) => {
        this.configs = Object.assign(this.configs, {
          $$snapshotUrl: uri.uri.trim()
        });
        this.provider.getNode(`/${this.configs.$$name}/snapshotUrl`).updateValue(uri.uri.trim());
        return promise;
      });
    } else {
      return promise;
    }
  }
}
