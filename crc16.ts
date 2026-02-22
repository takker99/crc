/**  This module provides functions for calculating the CRC-16 checksum of a given data.
 *
 * @module
 */

import { CRC16Table } from "./crc16-table.ts";

/**
 * Calculates the CRC16 checksum for the given data.
 *
 * @example Calculate at a time
 * ```ts
 * import { crc16 } from "./crc16.ts";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(crc16(new TextEncoder().encode("hello")), 0xcb09);
 * ```
 *
 * @example Calculate from chunks
 * ```ts
 * import { crc16 } from "./crc16.ts";
 * import { assertEquals } from "@std/assert";
 *
 * let checksum = crc16(new TextEncoder().encode("he"));
 * checksum = crc16(new TextEncoder().encode("ll"), checksum);
 * checksum = crc16(new TextEncoder().encode("o"), checksum);
 * assertEquals(checksum, 0xcb09);
 * ```
 *
 * @param  data - The input data as a Uint8Array.
 * @param  prev - The previous CRC16 checksum to continue from.
 * @returns The CRC16 checksum
 */
export const crc16 = (data: Uint8Array, prev?: number): number => {
  let crc = (prev ?? 0) ^ 0xffff;
  for (const byte of data) {
    crc = CRC16Table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffff) & 0xffff;
};
