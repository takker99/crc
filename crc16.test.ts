import { assertEquals } from "@std/assert";
import { crc16 } from "./crc16.ts";
import { CRC16Table } from "./crc16-table.ts";

Deno.test("crc16", async (t) => {
  await t.step("check table", () => {
    assertEquals(CRC16Table.length, 256);
  });
  await t.step("empty data", () => {
    assertEquals(crc16(new Uint8Array([])), 0);
  });

  await t.step("single byte", () => {
    assertEquals(crc16(new Uint8Array([0xFF])), 0xff00);
  });

  await t.step("multiple bytes", () => {
    assertEquals(
      crc16(new Uint8Array([100, 101, 110, 111, 45, 122, 105, 112])), // deno-zip
      0xaf56,
    );
  });

  await t.step("string", () => {
    assertEquals(crc16(new TextEncoder().encode("hello")), 0xcb09);
    assertEquals(crc16(new TextEncoder().encode("@takker/crc")), 0x567a);
  });

  await t.step("incremental calculation", () => {
    let checksum = crc16(new TextEncoder().encode("he"));
    checksum = crc16(new TextEncoder().encode("ll"), checksum);
    checksum = crc16(new TextEncoder().encode("o"), checksum);
    assertEquals(checksum, 0xcb09);

    checksum = crc16(new TextEncoder().encode("@takker"));
    checksum = crc16(new TextEncoder().encode("/"), checksum);
    checksum = crc16(new TextEncoder().encode("crc"), checksum);
    assertEquals(checksum, 0x567a);
  });
});
