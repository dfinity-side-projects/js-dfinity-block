[![NPM Package](https://img.shields.io/npm/v/dfinity-block.svg?style=flat-square)](https://www.npmjs.org/package/dfinity-block)
[![Build Status](https://img.shields.io/travis/dfinity/js-dfinity-block.svg?branch=master&style=flat-square)](https://travis-ci.org/dfinity/js-dfinity-block)
[![Coverage Status](https://img.shields.io/coveralls/dfinity/js-dfinity-block.svg?style=flat-square)](https://coveralls.io/r/dfinity/js-dfinity-block)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)  

# Synopsis

[![Greenkeeper badge](https://badges.greenkeeper.io/dfinity/js-dfinity-block.svg)](https://greenkeeper.io/)

This library provides basic functions for creating serializing and deserializing blocks

## Installation
`npm install dfinity-block`

## Usage

```javascript
const block = new DfinityBlock({
  version: 0,
  height: 1000,
  timestamp: 0,
  preBlockHash: new Uint8Array(20),
  stateRoot: new Uint8Array(20),
  beaconSig: new Uint8Array(32),
  preNotarySig: new Uint8Array(32),
  minterID: 0,
  minterSig: new Uint8Array(32)
})

const sk = crypto.randomBytes(32)

// sign the block as a minter and serialize the block
const signedBlock = await block.sign(sk)

// desialize the block
const block2 = await DfinityBlock.deserialize(signedBlock)

// read the height of the block
block2.height
```

## API
[./docs/](./docs/index.md)

## Specification
[./docs/](./docs/spec.md)

## License

[**(C) 2017 DFINITY STIFTUNG**](http://dfinity.network)

All code and designs are open sourced under GPL V3.

![image](https://user-images.githubusercontent.com/6457089/32753794-10f4cbc2-c883-11e7-8dcf-ff8088b38f9f.png)
