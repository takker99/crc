/**  CRC16 CCITT cache table
 *
 * Polynomial: 0x8408 (reversed 0x1021)
 * Used by: X.25, V.41, HDLC, XMODEM, Bluetooth, PACTOR, SD, DigRF
 *
 * @module
 * @private
 */

const makeCRC16CCITTTable = () => {
  const t = new Uint16Array(256);
  for (let i = 0; i < 256; ++i) {
    let c = i, k = 9;
    while (--k) c = (c & 1 ? 0x8408 : 0) ^ (c >>> 1);
    t[i] = c;
  }
  return t;
};

/** CRC16 CCITT cache table */
export const CRC16CCITTTable: Uint16Array = /*#__PURE__*/ makeCRC16CCITTTable();
