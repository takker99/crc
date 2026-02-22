/**  This module provides functions for calculating the CRC-16 Modbus checksum.
 *
 * Polynomial: 0xA001 (reversed 0x8005)
 * Initial value: 0xFFFF
 * Used by: Modbus RTU, USB, ANSI
 *
 * @module
 */

import { CRC16ModbusTable } from "./modbus-table.ts";

/**
 * Calculates the CRC-16-Modbus checksum for the given data.
 *
 * This is the standard Modbus RTU CRC implementation.
 *
 * @example Calculate at a time
 * ```ts
 * import { crc16Modbus } from "./modbus.ts";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(crc16Modbus(new TextEncoder().encode("hello")), 0x34f6);
 * ```
 *
 * @example Calculate from chunks
 * ```ts
 * import { crc16Modbus } from "./modbus.ts";
 * import { assertEquals } from "@std/assert";
 *
 * let checksum = crc16Modbus(new TextEncoder().encode("he"));
 * checksum = crc16Modbus(new TextEncoder().encode("ll"), checksum);
 * checksum = crc16Modbus(new TextEncoder().encode("o"), checksum);
 * assertEquals(checksum, 0x34f6);
 * ```
 *
 * @param  data - The input data as a Uint8Array.
 * @param  prev - The previous CRC16 checksum to continue from.
 * @returns The CRC16-Modbus checksum
 */
export const crc16Modbus = (data: Uint8Array, prev?: number): number => {
  let crc = prev ?? 0xffff;
  for (const byte of data) {
    crc = CRC16ModbusTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return crc & 0xffff;
};
