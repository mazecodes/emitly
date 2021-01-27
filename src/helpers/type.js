/**
 * Normalize a type
 *
 * @param {*} type - Type to be normalized
 * @param {Boolean} [isCaseSensitive] - If it should be case sensitive (optional)
 * @returns {*} - Normalized type
 *
 * @example
 *   normalizeType('Type', true) // Type
 *   normalizeType('Type', false) // type
 *   normalizeType(Symbol('Type')) // Symbol('Type')
 */
const normalizeType = (type, isCaseSensitive = true) => {
  let _type = type;

  if (typeof eventName === 'string') {
    _type = isCaseSensitive ? type : type.toLowerCase();
  }

  return _type;
};

module.exports = {
  normalizeType,
};
