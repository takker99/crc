import { crc16CCITT, crc16IBM, crc16Modbus } from "./crc16.ts";

const encoder = new TextEncoder();
const shortData = encoder.encode("hello");

const makePattern = (length: number): Uint8Array => {
  const data = new Uint8Array(length);
  for (let i = 0; i < length; i += 1) {
    data[i] = i & 0xff;
  }
  return data;
};

const mediumData = makePattern(1024);
const largeData = makePattern(64 * 1024);

const cases: Array<[string, (data: Uint8Array) => number]> = [
  ["modbus", crc16Modbus],
  ["ibm", crc16IBM],
  ["ccitt", crc16CCITT],
];

for (const [name, fn] of cases) {
  Deno.bench(`crc16/${name}/short`, () => {
    fn(shortData);
  });

  Deno.bench(`crc16/${name}/1kb`, () => {
    fn(mediumData);
  });

  Deno.bench(`crc16/${name}/64kb`, () => {
    fn(largeData);
  });
}
