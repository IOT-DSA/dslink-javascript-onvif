import DS, { SimpleNode } from 'dslink';
import { Cam } from 'onvif';

import { cameraStructure } from '../structure';
import { promiseify } from '../utils';

import logger from 'winston';

export let cameras = {};

export class AddDevice extends SimpleNode.class {
  onInvoke(params) {
    var prettyName = `@${params.hostname}:${params.port}`;
    console.log(`Adding new camera ${prettyName}, with username ${params.username}.`);

    const { promise, _ } = promiseify();
    const camera = new Cam({
      hostname: params.hostname,
      username: params.username,
      port: parseInt(params.port),
      password: params.password
    }, _);

    promise.then(() => {
      console.log(`Camera ${prettyName} loaded successfully, getting device information.`);
      cameras[params.name] = camera;

      const { promise, _ } = promiseify();
      camera.getDeviceInformation(_);

      return promise;
    }).then((data) => {
      console.log(`Camera ${prettyName} device information added successfully, adding node.`);
      this.provider.addNode('/' + params.name, cameraStructure(params, data));

      return {};
    }).catch((err) => {
      logger.error(`${err}:\n${err.stack}`);
    });
  }
};
