export function generateProfiles(...nodes) {
  const map = {};
  nodes.forEach((node) => {
    map[node.profileName] = node.factory;
  });

  return map;
}

export function promiseify(obj = {}) {
  let { returnedData, allowAdditionalData } = obj;
  allowAdditionalData = allowAdditionalData || false;

  let resolve, reject;

  return {
    promise: new Promise((resolve_cb, reject_cb) => {
      resolve = resolve_cb;
      reject = reject_cb;
    }),
    _(err, data, additionalData) {
      if(err) {
        if(allowAdditionalData)
          return reject({ err, additionalData });
        return reject(err);
      }

      resolve(returnedData || data);
    }
  };
}
