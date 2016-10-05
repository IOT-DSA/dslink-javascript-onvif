#!/usr/bin/env bash
set -e
rm -rf .git
touch .buildscript
rm -rf ../../files/dslink-javascript-onvif.zip
zip -x '.git/*' -r ../../files/dslink-javascript-onvif.zip .
