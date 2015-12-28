export function generateProfiles(...nodes) {
  const map = {};
  nodes.forEach((node) => {
    map[node.profileName] = node.factory;
  });

  return map;
}

export function promiseify(passed_data) {
  var promise_cb, _resolve, _reject;

  function resolve(data) {
    if(_resolve) {
      _resolve(data);
    } else {
      promise_cb = () => {
        _resolve(data);
      };
    }
  }

  function reject(err) {
    if(_reject) {
      _reject(err);
    } else {
      promise_cb = () => {
        _reject(err);
      };
    }
  }

  return {
    promise: new Promise((resolve_cb, reject_cb) => {
      _resolve = (data) => resolve_cb(data);
      _reject = (err) => reject_cb(err);

      if(promise_cb)
        promise_cb();
    }),
    _(err, data) {
      if(err) {
        return reject(err);
      }

      resolve(passed_data || data);
    }
  };
}
