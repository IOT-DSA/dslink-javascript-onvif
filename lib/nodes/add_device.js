import DS, { SimpleNode } from 'dslink';
import { Cam } from 'onvif';

import { cameraStructure } from '../structure';
import { promiseify } from '../utils';

import logger from 'winston';

export let cameras = {};

export function addCamera(params) {
  var prettyName = `@${params.hostname}:${params.port}`;
  console.log(`Adding new camera ${prettyName}, with username ${params.username}.`);

  const { promise, _ } = promiseify({
    allowAdditionalData: true
  });
  const camera = new Cam({
    hostname: params.hostname,
    username: params.username,
    port: parseInt(params.port),
    password: params.password
  }, _);

  return promise.then(() => {
    console.log(`Camera ${prettyName} loaded successfully, getting device information.`);
    cameras[params.name] = camera;

    const { promise, _ } = promiseify();
    camera.getDeviceInformation(_);

    return promise;
  }).then((data) => {
    console.log(`Camera ${prettyName} device information added successfully, getting snapshot URL.`);
    const { promise, _ } = promiseify();

    camera.getSnapshotUri(_);
    return promise.then((uri) => {
      return {
        data,
        uri: uri.uri.trim()
      };
    });
  }).then((data) => {
    const { promise, _ } = promiseify();
    
    camera.getStreamUri({ protocol: 'RTSP' }, _);
    return promise.then((uri) => {
      data.rtsp = uri.uri.trim();
      return data;
    });
  });
}

export class AddDevice extends SimpleNode {
  onInvoke(params) {
    var prettyName = `@${params.hostname}:${params.port}`;

    addCamera(params).then((obj) => {
      const { data, uri, rtsp } = obj;
      console.log(`Camera ${prettyName} initialized successfully, adding node.`);
      this.provider.addNode('/' + params.name, cameraStructure(params, data, uri, rtsp));

      return {};
    }).catch((err) => {
      if(err.additionalData)
        logger.error(`${err.err}:\n${err.err.stack}\n${err.additionalData}`);
      logger.error(`${err}:\n${err.stack}`);
    });
  }
};
