class Emitly {
  /**
   * @constructor
   *
   * @param {Object} [options] - Options object (optional)
   * @param {Boolean} [options.caseSensitive] - If events should be case sensitive (optional)
   * @returns {void}
   *
   * @example
   *   new Emitly()
   *
   *   new Emitly({
   *     caseSensitive: false
   *   })
   */
  constructor(options = {}) {
    this.caseSensitive =
      typeof options.caseSensitive !== 'undefined'
        ? options.caseSensitive
        : true;

    this.handlers = {
      normal: new Map(),
      regex: new Map(),
    };
  }
}

module.exports = Emitly;
