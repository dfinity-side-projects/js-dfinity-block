const Buffer = require('safe-buffer').Buffer
const assert = require('assert')
const Message = require('primea-message')
const Pipe = require('buffer-pipe')
const leb128 = require('leb128').unsigned
const nacl = require('tweetnacl')

/**
 * This implements basic functions relating to Dfinity Blocks
 * @param {Number} [version=0] - the block  version
 * @param {Number} [height=0] - the height of the block
 * @param {Number} [ticksLimit=0] - the max number of ticks that sum of tx.ticks allowd
 * @param {Buffer} [stateRoot=new Uint8Array(20)] - the state root
 * @param {Buffer} [beaconSig=new Uint8Array(32)] - the beacon signature
 * @param {Number} [minterID=0] - the minter id
 * @param {Buffer} [minterSig=new Uint8Array(32)] - the minter signature
 */
module.exports = class DfinityBlock extends Message {
  /**
   * serializes the message
   * @param {boolean} inculdeSig - whether or not to inculed the minter's signature in the serailization
   * @return {Buffer}
   */
  serialize (inculdeSig = this.minterSig.length !== 0) {
    const args = [
      Buffer.from([0x0]),
      leb128.encode(this.version),
      leb128.encode(this.height),
      leb128.encode(this.tickLimit),
      this.preBlockHash,
      this.stateRoot,
      this.beaconSig,
      leb128.encode(this.minterID),
      inculdeSig ? this.minterSig : Buffer.from([])
    ]

    return Buffer.concat(args)
  }

  /**
   * signs a block for the minter and returns the serialized and signed block
   * @param {Buffer} secretKey - a 32 bytes buffer to use as a secret key
   * @return {Promise} resolve with a Buffer containing the singed block
   */
  async sign (secretKey) {
    const keyPair = nacl.sign.keyPair.fromSeed(secretKey)
    const serialized = this.serialize(false)
    const sig = nacl.sign.detached(serialized, keyPair.secretKey)
    return Buffer.concat([serialized, sig])
  }

  /**
   * deserializes the block and returns a new instance of `DfinityBlock`
   * @param {Buffer} raw - the serialized raw block
   * @return {Promise} resolve with a new instance of `DfinityBlock`
   */
  static async deserialize (raw) {
    const p = new Pipe(raw)
    const type = p.read(1)
    assert.equal(type[0], 0, 'blocks should start with type 0')

    const json = {
      version: leb128.read(p),
      height: leb128.read(p),
      tickLimit: leb128.read(p),
      preBlockHash: p.read(20),
      stateRoot: p.read(20),
      beaconSig: p.read(32),
      minterID: leb128.read(p),
      minterSig: p.buffer
    }
    return new DfinityBlock(json)
  }

  static get defaults () {
    return {
      version: 0,
      height: 0,
      timestamp: 0,
      tickLimit: 0,
      preBlockHash: new Uint8Array(20),
      stateRoot: new Uint8Array(20),
      beaconSig: new Uint8Array(32),
      preNotarySig: new Uint8Array(32),
      minterID: 0,
      minterSig: new Uint8Array(32)
    }
  }
}
