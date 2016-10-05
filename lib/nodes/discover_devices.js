import DS, { SimpleNode, AsyncTableResult, StreamStatus } from 'dslink';
import { Discovery } from 'onvif';
import url from 'url';

import { discoverColumns } from '../structure';
import { promiseify } from '../utils';

export class DiscoverDevices extends SimpleNode {
  onInvoke() {
    console.log(`Searching for local devices...`);
    const { promise, _ } = promiseify();
    Discovery.probe({ resolve: false }, _);

    return promise.then((cams) => {
      console.log(`Successfully discovered ${cams.length} devices.`);
      return cams.map((data) => {
        var camUri = url.parse(data.probeMatches.probeMatch.XAddrs);
        return {
          hostname: camUri.hostname,
          port: parseInt(camUri.port, 10)
        };
      });
    });
  }
}
