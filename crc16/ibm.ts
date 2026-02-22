/**  This module provides functions for calculating the CRC-16 IBM checksum.
 *
 * CRC-16-IBM (CRC-16/ARC):
 * - Polynomial: 0xA001 (reversed 0x8005)
 * - Initial value: 0x0000
 *
 * @module
 */

import { crc16Modbus } from "./modbus.ts";

/**
 * Calculates the CRC-16-IBM (CRC-16/ARC) checksum for the given data.
 *
 * CRC-16-IBM uses the same polynomial as Modbus but with initial value 0x0000.
 *
 * @example Calculate at a time
 * ```ts
 * import { crc16IBM } from "./ibm.ts";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(crc16IBM(new TextEncoder().encode("hello")), 0x34d2);
 * ```
 *
 * @example Calculate from chunks
 * ```ts
 * import { crc16IBM } from "./ibm.ts";
 * import { assertEquals } from "@std/assert";
 *
 * let checksum = crc16IBM(new TextEncoder().encode("he"));
 * checksum = crc16IBM(new TextEncoder().encode("ll"), checksum);
 * checksum = crc16IBM(new TextEncoder().encode("o"), checksum);
 * assertEquals(checksum, 0x34d2);
 * ```
 *
 * @param  data - The input data as a Uint8Array.
 * @param  prev - The previous CRC16 checksum to continue from.
 * @returns The CRC16-IBM checksum
 */
export const crc16IBM = (data: Uint8Array, prev?: number): number =>
  // IBM uses 0x0000 initial value
  crc16Modbus(data, prev ?? 0x0000);
