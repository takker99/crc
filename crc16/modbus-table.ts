/**  CRC16 Modbus/IBM cache table
 *
 * Polynomial: 0xA001 (reversed 0x8005)
 * Used by: Modbus RTU, USB, ANSI, IBM
 *
 * @module
 * @private
 */

const makeCRC16ModbusTable = () => {
  const t = new Uint16Array(256);
  for (let i = 0; i < 256; ++i) {
    let c = i, k = 9;
    while (--k) c = (c & 1 ? 0xa001 : 0) ^ (c >>> 1);
    t[i] = c;
  }
  return t;
};

/** CRC16 Modbus/IBM cache table */
export const CRC16ModbusTable: Uint16Array =
  /*#__PURE__*/ makeCRC16ModbusTable();
