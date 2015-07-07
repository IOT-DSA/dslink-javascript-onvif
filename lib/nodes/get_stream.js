var { error, cameras, DS } = require('../context');

export default class GetStream extends DS.SimpleNode.class {
  constructor() {
    super();
  }

  onInvoke() {
    var cam = cameras[this.path.split("/")[1]];
    return new Promise((resolve, reject) => {
      cam.getStreamUri({
        protocol: 'HTTP'
      }, (e, stream) => {
        if(e) return reject(e);
        console.log(stream);
        resolve({
          uri: stream.uri.toString()
        });
      });
    }).catch((e) => {
      error(e);
    });
  }
}
