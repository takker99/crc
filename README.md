# crc

[![JSR](https://jsr.io/badges/@takker/crc)](https://jsr.io/@takker/crc)
[![test](https://github.com/takker99/crc/workflows/ci/badge.svg)](https://github.com/takker99/crc/actions?query=workflow%3Aci)

tiny tree-shakable CRC implementations for Deno/Browser

# Features

- Written in TypeScript
- Tree-shakable
- Pure implementation, so it works in Deno and Browser

## Supported CRC algorithms

Currently, only CRC32 is supported.

# Usage

Calculate CRC32 of a string:

```ts
import { crc32 } from "@takker/crc";
import { assertEquals } from "@std/assert";

assertEquals(crc32(new TextEncoder().encode("hello")), 0x3610a686);
```

You can also calculate incrementally:

```ts
import { crc32 } from "@takker/crc";
import { assertEquals } from "@std/assert";

let checksum = crc32(new TextEncoder().encode("he"));
checksum = crc32(new TextEncoder().encode("ll"), checksum);
checksum = crc32(new TextEncoder().encode("o"), checksum);
assertEquals(checksum, 0x3610a686);
```

# Acknowledgements

The implementation of `crc32()` is based on the
[crc32 implementation in fflate](https://github.com/101arrowz/fflate), created
by [@101arrowz](https://github.com/101arrowz).

# License

This project is licensed under the [MIT License](LICENSE).

License for fflate is listed in [LICENSE-fflate](LICENSE-fflate).

```
```
