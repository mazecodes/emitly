const isRegex = require('is-regex');

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
   *   emitly.validateHandlers(false) // Error
   *   emitly.validateHandlers(() => {}) // No error
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
   *   emitly.validateCategory('normal') // No error
   *   emitly.validateCategory('Foo') // Error
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
   *   emitly.screateEventType('event')
   */
  createEventType(eventType, category = 'normal') {
    const type = normalizeType(eventType);

    this.validateCategory(category);

    if (!this.handlers[category].has(type)) {
      this.handlers[category].set(type, new Set());
    }
  }

  /**
   * @property {Function} on - Add event handlers to adn event type
   *
   * @param {*} eventType - Event type to add to
   * @param  {...Function} handlers - List of handlers
   * @returns {void}
   *
   * @example
   *   emitly.on('event', () => console.log('Event triggered'))
   *   emitly.on(/^event/, () => console.log('Event triggered'))
   */
  on(eventType, ...handlers) {
    const type = normalizeType(eventType, this.caseSensitive);
    const handlerCategory = isRegex(type) ? 'regex' : 'normal';

    this.validateHandlers(...handlers);
    this.createEventType(type);

    handlers.forEach(handler => {
      this.handlers[handlerCategory].get(type).add(handler);
    });
  }

  /**
   * @property {Function} onAll - Listen to all events
   *
   * @param  {...Function} handlers - List of handlers
   * @returns {void}
   *
   * @example
   *   emitly.onAll(type => console.log(`Triggered event: ${type}`))
   */
  onAll(...handlers) {
    this.on(/(.*?)/, ...handlers);
  }

  /**
   * @property {Function} off - Remove event handlers from an event type
   *
   * @param {*} eventType - Event type to remove from
   * @param  {...Function} handlers - List of handlers to remove
   * @returns {void}
   *
   * @example
   *   emitly.off('event', handler)
   */
  off(eventType, ...handlers) {
    const type = normalizeType(eventType, this.caseSensitive);
    const handlerCategory = isRegex(type) ? 'regex' : 'normal';

    if (this.handlers[handlerCategory].has(type)) {
      handlers.forEach(handler => {
        this.handlers[handlerCategory].get(type).delete(handler);
      });

      if (!this.handlers[handlerCategory].get(type).size) {
        this.handlers[handlerCategory].delete(type);
      }
    }
  }

  /**
   * @property {Function} clear - Clear an event
   *
   * @param {*} eventType - Event type to clear
   * @returns {void}
   *
   * @example
   *   emitly.clear('event);
   */
  clear(eventType) {
    const type = normalizeType(eventType, this.caseSensitive);
    const handlerCategory = isRegex(type) ? 'regex' : 'normal';

    this.handlers[handlerCategory].delete(type);
  }

  /**
   * @property {Function} clearAll - Clear all events
   *
   * @param {String} [category] - Handler category to clear (optional)
   * @returns {void}
   *
   * @example
   *   emitly.clearAll()
   *   emitly.clearAll('normal')
   */
  clearAll(category) {
    if (category) {
      this.validateCategory(category);
      this.handlers[category] = new Map();
    } else {
      this.handlers = {
        normal: new Map(),
        regex: new Map(),
      };
    }
  }

  /**
   * @property {Function} emit - Trigger an event
   *
   * @param {*} eventType - Event type to trigger
   * @param  {...any} args - Arguments to pass to the handlers
   * @returns {void}
   *
   * @example
   *   emitly.emit('event', 'message')
   *   emitly.emit(/^event/, 'message')
   */
  emit(eventType, ...args) {
    const type = normalizeType(eventType, this.caseSensitive);

    if (isRegex(type)) {
      const types = [...this.handlers.normal.keys()];

      types.forEach(_type => {
        /**
         * Execute normal event handlers which match with this regex type
         */
        if (type.test(_type)) {
          const handlers = this.handlers.normal.get(_type);

          handlers.forEach(handler => handler(...args));
        }
      });
    } else {
      /**
       * Execute normal event handlers with that event type
       */
      if (this.handlers.normal.has(type)) {
        const handlers = this.handlers.normal.get(type);

        handlers.forEach(handler => handler(...args));
      }

      const regexes = [...this.handlers.regex.keys()];

      regexes.forEach(regex => {
        /**
         * Execute regex event handlers which match with this type
         */
        if (regex.test(type)) {
          const handlers = this.handlers.regex.get(regex);

          handlers.forEach(handler => handler(type, ...args));
        }
      });
    }
  }

  /**
   * @property {Function} emitAll - Trigger all events
   *
   * @param  {...any} args - Arguemtns to pass to the handlers
   * @returns {void}
   *
   * @example
   *   emitly.emitAll('message')
   */
  emitAll(...args) {
    this.emit(/(.*?)/, ...args);
  }
}

module.exports = Emitly;
