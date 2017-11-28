#  Dfinity Block

## Data Types

### `uintN`
An unsigned integer of _N_ bits,
represented in _N_/8 bytes in [little endian](https://en.wikipedia.org/wiki/Endianness#Little-endian) order.

### `varuintN`
A [LEB128](https://en.wikipedia.org/wiki/LEB128) variable-length integer, limited to _N_ bits (i.e., the values [0, 2^_N_-1]),
represented by _at most_ ceil(_N_/7) bytes that may contain padding `0x80` bytes.

### `bytesN`
A simple byte array of N length.

### `bls_signature`
A BLS signature using the [Fp254BNd curve](https://tools.ietf.org/html/draft-kasamatsu-bncurves-02#page-21). Each signature is 32 bytes.

### `ed25519_signature`
ed25519 signature. Each signature is 32 bytes/

## Block
| Field | Type | Description |
|-------|------|-------------|
| version | `uint8` | The version of the block format |
| height | `varuint64` | the height of the block
| timeStamp | `varuint64` | The time this block was minted as a Unix time stamp in milliseconds |
| prev_blockHash | `hash` | The hash of the prevous block.|
| state_root | `hash` | The state root of radix tree which stores the state and the transactions |
| beacon_signature |`signature` ||
| prev_notary_signature |`signature` | The notary for the prevous block.|
| minter_id | `varuint32` | The ID of the minter |
| minter_sig | `signature` | The minter's signature |

