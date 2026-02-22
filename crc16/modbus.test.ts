import { assertEquals } from "@std/assert";
import { crc16Modbus } from "./modbus.ts";
import { CRC16ModbusTable } from "./modbus-table.ts";

Deno.test("crc16Modbus", async (t) => {
  await t.step("check table", () => {
    assertEquals(CRC16ModbusTable.length, 256);
  });
  await t.step("empty data", () => {
    assertEquals(crc16Modbus(new Uint8Array([])), 0xffff);
  });

  await t.step("single byte", () => {
    assertEquals(crc16Modbus(new Uint8Array([0xFF])), 0x00ff);
  });

  await t.step("multiple bytes", () => {
    assertEquals(
      crc16Modbus(new Uint8Array([100, 101, 110, 111, 45, 122, 105, 112])), // deno-zip
      0x50a9,
    );
    assertEquals(
      crc16Modbus(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])),
      50227,
    );
  });

  await t.step("string", () => {
    assertEquals(crc16Modbus(new TextEncoder().encode("hello")), 0x34f6);
    assertEquals(crc16Modbus(new TextEncoder().encode("@takker/crc")), 0xa985);
  });

  await t.step("incremental calculation", () => {
    let checksum = crc16Modbus(new TextEncoder().encode("he"));
    checksum = crc16Modbus(new TextEncoder().encode("ll"), checksum);
    checksum = crc16Modbus(new TextEncoder().encode("o"), checksum);
    assertEquals(checksum, 0x34f6);

    checksum = crc16Modbus(new TextEncoder().encode("@takker"));
    checksum = crc16Modbus(new TextEncoder().encode("/"), checksum);
    checksum = crc16Modbus(new TextEncoder().encode("crc"), checksum);
    assertEquals(checksum, 0xa985);
  });

  await t.step("node-modbus-serial test cases", () => {
    // Test case from node-modbus-serial
    assertEquals(
      crc16Modbus(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])),
      50227,
    );
    // Another test case: Buffer.from("110100130025", "hex")
    assertEquals(
      crc16Modbus(new Uint8Array([0x11, 0x01, 0x00, 0x13, 0x00, 0x25])),
      33806,
    );
  });
});
