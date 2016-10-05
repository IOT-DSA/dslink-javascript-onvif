# dslink-javascript-onvif

A DSLink for communicating with ONVIF-compatible IP security cameras.

We've tested the link with a fair amount of ONVIF devices from different
manufacturers, but nevertheless implementations of the specification differ
between manufacturers and some cameras' ONVIF implementations can end up quite
broken as a result. Please leave an issue on the tracker if your camera is not
working properly and we can try to add a workaround for it. Thanks!

### Quick Start

###### Automatic installation:

- Bundle ONVIF with your Get DSA package.
- Download ONVIF from the DSLink Manager (DGLux).
- Install it in the DSLink Manager from git.

###### Manual installation:

```sh
git clone https://github.com/IOT-DSA/dslink-javascript-onvif.git
cd dslink-javascript-onvif
npm install
node dist/index.js --broker https://www.broker.com/conn
```

### License

The code in this repository is licensed under the Apache License (copy found
in **LICENSE.md**) unless stated otherwise.