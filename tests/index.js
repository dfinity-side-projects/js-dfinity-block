const crypto = require('crypto')
const tape = require('tape')
const DfinityBlock = require('../')

tape('tests', async t => {
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

  const signedBlock = await block.sign(sk)

  const block2 = await DfinityBlock.deserialize(signedBlock)
  t.equals(block.height, 1000)
  t.deepEquals(block2.serialize(), signedBlock)

  t.end()
})
