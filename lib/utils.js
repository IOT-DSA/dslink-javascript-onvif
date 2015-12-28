export function generateProfiles(...nodes) {
  const map = {};
  nodes.forEach((node) => {
    map[node.profileName] = node.factory;
  });

  return map;
}

export function promiseify(passed_data) {
  var resolve, reject;

  return {
    promise: new Promise((resolve_cb, reject_cb) => {
      resolve = resolve_cb;
      reject = reject_cb;
    }),
    _(err, data) {
      if(err) {
        return reject(err);
      }

      resolve(passed_data || data);
    }
  };
}
