import { crc32 } from "./crc32.ts";

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

Deno.bench("crc32/short", () => {
  crc32(shortData);
});

Deno.bench("crc32/1kb", () => {
  crc32(mediumData);
});

Deno.bench("crc32/64kb", () => {
  crc32(largeData);
});
