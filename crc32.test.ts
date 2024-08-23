import { assertEquals } from "@std/assert";
import { crc32 } from "./crc32.ts";
import { CRC32Table } from "./crc32-table.ts";
import CRC32 from "crc-32";

Deno.test("crc32", async (t) => {
  await t.step("check table", () => {
    assertEquals(CRC32Table.length, 256);
    assertEquals(
      (CRC32 as unknown as { table: Int32Array }).table.buffer,
      CRC32Table.buffer,
    );
  });
  await t.step("empty data", () => {
    assertEquals(crc32(new Uint8Array([])), 0);
  });

  await t.step("single byte", () => {
    assertEquals(crc32(new Uint8Array([0xFF])), -0x1000000);
  });

  await t.step("multiple bytes", () => {
    assertEquals(
      crc32(new Uint8Array([100, 101, 110, 111, 45, 122, 105, 112])), // deno-zip
      0x2e95a76b,
    );
  });

  await t.step("string", () => {
    assertEquals(crc32(new TextEncoder().encode("hello")), 0x3610a686);
    assertEquals(crc32(new TextEncoder().encode("@takker/crc")), -0x52e38fcb);
  });

  await t.step("incremental calculation", () => {
    let checksum = crc32(new TextEncoder().encode("he"));
    checksum = crc32(new TextEncoder().encode("ll"), checksum);
    checksum = crc32(new TextEncoder().encode("o"), checksum);
    assertEquals(checksum, 0x3610a686);

    checksum = crc32(new TextEncoder().encode("@takker"));
    checksum = crc32(new TextEncoder().encode("/"), checksum);
    checksum = crc32(new TextEncoder().encode("crc"), checksum);
    assertEquals(checksum, -0x52e38fcb);
  });
});
