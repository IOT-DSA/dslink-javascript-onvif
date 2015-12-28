import "babel-polyfill";

import DS, { LinkProvider } from 'dslink';

import { AddDevice } from './nodes/add_device';
import { PanTiltZoom } from './nodes/camera/pan_tilt_zoom';
import { GetSnapshot } from './nodes/camera/get_snapshot';
import { GetStream } from './nodes/camera/get_stream';

import { defaultNodes } from './structure';

var link = new LinkProvider(process.argv.slice(2), 'onvif-', {
  defaultNodes,
  profiles: {
    addDevice(path, provider) {
      return new AddDevice(path, provider);
    },
    panTiltZoom(path, provider) {
      return new PanTiltZoom(path, provider);
    },
    getSnapshot(path, provider) {
      return new GetSnapshot(path, provider);
    },
    getStream(path, provider) {
      return new GetStream(path, provider);
    }
  }
});

link.connect();
