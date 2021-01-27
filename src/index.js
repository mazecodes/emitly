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

  /**
   * @property {Function} validateHandlers - Validate the given handlers
   * @access private
   *
   * @param  {...any} handlers - List of handlers to validate
   * @returns {void}
   *
   * @example
   *   validateHandlers(false) // Error
   *   validateHandlers(() => {}) // No error
   */
  validateHandlers(...handlers) {
    handlers.forEach(handler => {
      if (typeof handler !== 'function') {
        throw new Error('Hanlder should be a function');
      }
    });
  }

  /**
   * @property {Function} validateCategory - Validate the given category
   * @access private
   *
   * @param {String} category - The category to validate
   * @returns {void}
   *
   * @example
   *   validateCategory('normal') // No error
   *   validateCategory('Foo') // Error
   */
  validateCategory(category) {
    if (!this.handlers[category]) {
      throw new Error(`Handler category ${category} does not exist`);
    }
  }
}

module.exports = Emitly;
