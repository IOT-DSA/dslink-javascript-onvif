var { error, cameras, DS } = require('../../context'),
    { get } = require('http'),
    { parse } = require('url');

export default class GetSnapshot extends DS.SimpleNode.class {

  constructor(path, nodeProvider) {
    super(path, nodeProvider);

    var cam = cameras[this.path.split("/")[1]];
    this.valueReady = false;
    this.uri = new Promise((resolve, reject) => {
      cam.getSnapshotUri((e, uri) => {
        if(e) return reject(e);
        resolve(uri.uri.trim());
      });
    }).catch((e) => {
      error(e.stack);
    });
  }

  onInvoke() {
    var cam = cameras[this.path.split("/")[1]];
    return this.uri.then((uri) => {
      return new Promise((resolve, reject) => {
        var opt = parse(uri);
        opt.auth = cam.username + ':' + cam.password;

        get(opt, (res) => {
          if(typeof(res.statusCode) === 'number' && res.statusCode !== 200) {
            reject(res.statusCode);
            return;
          }

          var data = [];

          res.on('data', (buf) => {
            data.push(buf);
          });

          res.on('end', () => {
            resolve(Buffer.concat(data));
          });
        }).on('error', (e) => {
          error(e);
        });
      });
    }).then((data) => {
      return {
        jpeg: data
      };
    }).catch((e) => {
      context.error(e);
    });
  }
}
