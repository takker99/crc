# crc

[![JSR](https://jsr.io/badges/@takker/crc)](https://jsr.io/@takker/crc)
[![codecov](https://codecov.io/gh/takker99/crc/branch/main/graph/badge.svg)](https://codecov.io/gh/takker99/crc)
[![test](https://github.com/takker99/crc/workflows/ci/badge.svg)](https://github.com/takker99/crc/actions?query=workflow%3Aci)

tiny tree-shakable CRC implementations for Deno/Browser

# Features

- Written in TypeScript
- Tree-shakable
- Pure implementation, so it works in Deno and Browser

## Supported CRC algorithms

- **CRC-16-Modbus** (CRC-16-IBM, CRC-16-ANSI) - Polynomial: 0xA001
  - Used by: Modbus RTU, USB, ANSI
- **CRC-16-CCITT** - Polynomial: 0x8408
  - Used by: X.25, V.41, HDLC, XMODEM, Bluetooth, SD
- **CRC-32** - Polynomial: 0xEDB88320
  - Used by: PNG, ZIP, Ethernet

# Usage

## CRC-16-Modbus

Calculate CRC-16-Modbus (used in Modbus RTU):

```ts
import { crc16Modbus } from "@takker/crc";
import { assertEquals } from "@std/assert";

assertEquals(crc16Modbus(new TextEncoder().encode("hello")), 0x34f6);
```

## CRC-16-IBM

Calculate CRC-16-IBM (CRC-16/ARC):

CRC-16-IBM uses the same polynomial as Modbus but with a different initial value
(0x0000 vs 0xFFFF):

```ts
import { crc16IBM } from "@takker/crc";
import { assertEquals } from "@std/assert";

assertEquals(crc16IBM(new TextEncoder().encode("hello")), 0x34d2);
```

## CRC-16-CCITT

Calculate CRC-16-CCITT (used in XMODEM, Bluetooth, etc.):

```ts
import { crc16CCITT } from "@takker/crc";
import { assertEquals } from "@std/assert";

assertEquals(crc16CCITT(new TextEncoder().encode("hello")), 0xcb42);
```

## CRC-32

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
