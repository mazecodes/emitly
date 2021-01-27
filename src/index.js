class Emitly {
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
