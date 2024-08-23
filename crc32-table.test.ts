import { assertEquals } from "@std/assert";
import { CRC32Table } from "./crc32-table.ts";
import CRC32 from "crc-32";

Deno.test("make sure CRC32 cache table is correct", async (t) => {
  await t.step("length is 256", () => {
    assertEquals(CRC32Table.length, 256);
  });

  await t.step("compare with npm:crc-32 module table", () => {
    assertEquals(
      (CRC32 as unknown as { table: Int32Array }).table.buffer,
      CRC32Table.buffer,
    );
  });
});
