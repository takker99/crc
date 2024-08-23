/**  This module provides functions for calculating the CRC-32 checksum of a given data.
 *
 * The basic structure of {@link crc32} comes from the CRC32 implementation in [fflate](https://github.com/101arrowz/fflate) created by @101arrowz.
 *
 * Copyright (c) 2023 Arjun Barrett, under the MIT license.
 *
 * @module
 */

import { CRC32Table } from "./crc32-table.ts";

/**
 * Calculates the CRC32 checksum for the given data.
 *
 * @example Calculate at a time
 * ```ts
 * import { crc32 } from "./crc32.ts";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(crc32(new TextEncoder().encode("hello")), 0x3610a686);
 * ```
 *
 * @example Calculate from chunks
 * ```ts
 * import { crc32 } from "./crc32.ts";
 * import { assertEquals } from "@std/assert";
 *
 * let checksum = crc32(new TextEncoder().encode("he"));
 * checksum = crc32(new TextEncoder().encode("ll"), checksum);
 * checksum = crc32(new TextEncoder().encode("o"), checksum);
 * assertEquals(checksum, 0x3610a686);
 * ```
 *
 * @param  data - The input data as a Uint8Array.
 * @param  prev - The previous CRC32 checksum to continue from.
 * @returns The CRC32 checksum
 */
export const crc32 = (data: Uint8Array, prev?: number): number => {
  let crc = (prev ?? 0) ^ -1;
  for (const byte of data) {
    crc = CRC32Table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return ~crc;
};
