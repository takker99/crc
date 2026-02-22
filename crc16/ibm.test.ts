import { assertEquals } from "@std/assert";
import { crc16IBM } from "./ibm.ts";
import { crc16Modbus } from "./modbus.ts";

Deno.test("crc16IBM", async (t) => {
  await t.step("uses different initial value than Modbus", () => {
    const data = new TextEncoder().encode("hello");
    assertEquals(crc16IBM(data), 0x34d2); // IBM: init=0x0000
    assertEquals(crc16Modbus(data), 0x34f6); // Modbus: init=0xFFFF
  });

  await t.step("empty data", () => {
    assertEquals(crc16IBM(new Uint8Array([])), 0x0000);
  });

  await t.step("multiple bytes", () => {
    assertEquals(
      crc16IBM(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])),
      49987,
    );
  });

  await t.step("incremental calculation", () => {
    let checksum = crc16IBM(new TextEncoder().encode("he"));
    checksum = crc16IBM(new TextEncoder().encode("ll"), checksum);
    checksum = crc16IBM(new TextEncoder().encode("o"), checksum);
    assertEquals(checksum, 0x34d2);
  });
});
