import { assertEquals } from "@std/assert";
import { crc16CCITT } from "./ccitt.ts";
import { CRC16CCITTTable } from "./ccitt-table.ts";

Deno.test("crc16CCITT", async (t) => {
  await t.step("check table", () => {
    assertEquals(CRC16CCITTTable.length, 256);
  });

  await t.step("empty data", () => {
    assertEquals(crc16CCITT(new Uint8Array([])), 0xffff);
  });

  await t.step("single byte", () => {
    assertEquals(crc16CCITT(new Uint8Array([0xFF])), 0x00ff);
  });

  await t.step("multiple bytes", () => {
    assertEquals(
      crc16CCITT(new Uint8Array([100, 101, 110, 111, 45, 122, 105, 112])), // deno-zip
      0xae9d,
    );
    assertEquals(
      crc16CCITT(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])),
      0xa718,
    );
  });

  await t.step("string", () => {
    assertEquals(crc16CCITT(new TextEncoder().encode("hello")), 0xcb42);
    assertEquals(crc16CCITT(new TextEncoder().encode("@takker/crc")), 0x8dc4);
  });

  await t.step("incremental calculation", () => {
    let checksum = crc16CCITT(new TextEncoder().encode("he"));
    checksum = crc16CCITT(new TextEncoder().encode("ll"), checksum);
    checksum = crc16CCITT(new TextEncoder().encode("o"), checksum);
    assertEquals(checksum, 0xcb42);

    checksum = crc16CCITT(new TextEncoder().encode("@takker"));
    checksum = crc16CCITT(new TextEncoder().encode("/"), checksum);
    checksum = crc16CCITT(new TextEncoder().encode("crc"), checksum);
    assertEquals(checksum, 0x8dc4);
  });

  await t.step("different from Modbus", () => {
    // CRC-16-CCITT uses different polynomial (0x8408) than Modbus (0xA001)
    const data = new TextEncoder().encode("hello");
    assertEquals(crc16CCITT(data), 0xcb42);
    // Modbus would give 0x34f6 for the same data
  });
});
