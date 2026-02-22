/**  CRC16 cache table
 *
 * @module
 * @private
 */

const makeCRC16Table = () => {
  const t = new Uint16Array(256);
  for (let i = 0; i < 256; ++i) {
    let c = i, k = 9;
    while (--k) c = (c & 1 ? 0xa001 : 0) ^ (c >>> 1);
    t[i] = c;
  }
  return t;
};

/** CRC16 cache table */
export const CRC16Table: Uint16Array = /*#__PURE__*/ makeCRC16Table();
