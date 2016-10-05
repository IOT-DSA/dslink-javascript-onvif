import DS, { SimpleNode, AsyncTableResult, StreamStatus } from 'dslink';

import { cameras } from '../add_device';
import { getStreamColumns } from '../../structure';

import { RtspClient } from 'yellowstone';
import logger from 'winston';

export class GetStream extends SimpleNode {
  constructor(path, provider) {
    super(path, provider);
    this.serializable = false;
  }

  onInvoke(params) {
    try {
      const result = new AsyncTableResult(getStreamColumns);
      result.update([], StreamStatus.open);

      const cam = cameras[this.configs.$$name];

      const { promise, _ } = promiseify();
      cam.getStreamUri({
        protocol: 'RTSP'
      }, (err, stream) => {
        function error(err) {
          logger.error(`${err}:\n${err.stack}`);
          result.close();
        }

        if(err) return error(err);

        const uri = stream.uri.toString();
        console.log(uri);

        const client = new RtspClient();

        client.on('data', function(data, packet) {
          result.update([{
            data: data
          }]);
        });

        client.connect(uri).then((details) => {
          client.play();

          result.onClose = (res) => {
            client.removeAllListeners('data');
            client.pause();
            client.close();
          };
        }).catch((err) => error(err));
      });

      return result;
    } catch(e) {
      logger.error(`${err}:\n${err.stack}`);
    }
  }
}
