/**  CRC32 cache table
 *
 * @module
 * @private
 */

const makeCRC32Table = () => {
  const t = new Int32Array(256);
  for (let i = 0; i < 256; ++i) {
    let c = i, k = 9;
    while (--k) c = (c & 1 ? 0xedb88320 : 0) ^ (c >>> 1);
    t[i] = c;
  }
  return t;
};

/** CRC32 cache table */
export const CRC32Table: Int32Array = /*#__PURE__*/ makeCRC32Table();
