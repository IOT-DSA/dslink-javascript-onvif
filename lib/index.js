import "babel-polyfill";

import DS, { LinkProvider, SimpleNode } from 'dslink';

import { AddDevice } from './nodes/add_device';
import { DeviceNode } from './nodes/device';

import { PanTiltZoom } from './nodes/camera/pan_tilt_zoom';
import { GetSnapshot } from './nodes/camera/get_snapshot';
import { GetStream } from './nodes/camera/get_stream';

import { defaultNodes } from './structure';

class UnserializableNode extends SimpleNode.class {
  constructor(path, provider) {
    super(path, provider);
    this.serializable = false;
  }
}

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
    },
    unserializable(path, provider) {
      return new UnserializableNode(path, provider);
    },
    device(path, provider) {
      return new DeviceNode(path, provider);
    }
  }
});

link.init();
link.connect().then(() => {
  setInterval(function() {
    link.save();
  }, 1000 * 5);
});
