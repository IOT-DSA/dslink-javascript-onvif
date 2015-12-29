import DS, { SimpleNode } from 'dslink';

import { cameraStructure } from '../structure';
import { addCamera } from './add_device';

import logger from 'winston';

const wasCalled = {};

export class DeviceNode extends SimpleNode.class {
  load(map) {
    if(!map.platform && !wasCalled[this.path]) {
      wasCalled[this.path] = true;

      const params = {
        hostname: map.$$hostname,
        username: map.$$username,
        password: map.$$password,
        port: map.$$port,
        name: map.$$name
      };
      const prettyName = `@${params.hostname}:${params.port}`;

      addCamera(params).then((obj) => {
        const { data, uri } = obj;
        console.log(`Camera ${prettyName} loaded successfully from nodes.json, populating node.`);
        this.load(cameraStructure(params, data, uri), false);
      }).catch((err) => {
        this.provider.removeNode(this.path);

        if(err.additionalData)
          logger.error(`${err.err}:\n${err.err.stack}\n${err.additionalData}`);
        else
          logger.error(`${err}:\n${err.stack}`);
        logger.error(`Camera ${prettyName} loaded from nodes.json but not able to connect.`);
      });
    }

    super.load(map);
  }
}
