#!/usr/bin/env bash
rm -rf build
mkdir build
cp -R index.js package.json build/
cd build
zip -r ../../../files/onvif.zip .
cd ..
