const { normalizeType } = require('./helpers/type');

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

  /**
   * @property {Function} on - Create an event type
   * @access private
   *
   * @param {*} eventType - Event type to create
   * @param {String} category - Category to add the event to
   * @returns {void}
   *
   * @example
   *   createEventType('event')
   */
  createEventType(eventType, category = 'normal') {
    const type = normalizeType(eventType);

    this.validateCategory(category);

    if (!this.handlers[category].has(type)) {
      this.handlers[category].set(type, new Set());
    }
  }
}

module.exports = Emitly;
