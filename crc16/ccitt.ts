/**  This module provides functions for calculating the CRC-16-CCITT checksum of a given data.
 *
 * CRC-16-CCITT (also known as CRC-16-CCITT-FALSE):
 * - Polynomial: 0x8408 (reversed 0x1021)
 * - Initial value: 0xFFFF
 * - Final XOR: none (0x0000)
 *
 * Used by: X.25, V.41, HDLC, XMODEM, Bluetooth, PACTOR, SD
 *
 * @module
 */

import { CRC16CCITTTable } from "./ccitt-table.ts";

/**
 * Calculates the CRC-16-CCITT checksum for the given data.
 *
 * @example Calculate at a time
 * ```ts
 * import { crc16CCITT } from "./ccitt.ts";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(crc16CCITT(new TextEncoder().encode("hello")), 0xcb42);
 * ```
 *
 * @example Calculate from chunks
 * ```ts
 * import { crc16CCITT } from "./ccitt.ts";
 * import { assertEquals } from "@std/assert";
 *
 * let checksum = crc16CCITT(new TextEncoder().encode("he"));
 * checksum = crc16CCITT(new TextEncoder().encode("ll"), checksum);
 * checksum = crc16CCITT(new TextEncoder().encode("o"), checksum);
 * assertEquals(checksum, 0xcb42);
 * ```
 *
 * @param  data - The input data as a Uint8Array.
 * @param  prev - The previous CRC16-CCITT checksum to continue from.
 * @returns The CRC16-CCITT checksum
 */
export const crc16CCITT = (data: Uint8Array, prev?: number): number => {
  let crc = prev ?? 0xffff;
  for (const byte of data) {
    crc = CRC16CCITTTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return crc & 0xffff;
};
