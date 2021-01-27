const Emitly = require('../src');

/**
 * =========================
 * Case sensitive
 * =========================
 */
const emitly = new Emitly({
  caseSensitive: true,
});

emitly.on('event', () => console.log('Handler 1'));
emitly.on('Event', () => console.log('Handler 2'));

emitly.emit('event');
emitly.emit('Event');

/**
 * =========================
 * Case insensitive
 * =========================
 */
const iEmitly = new Emitly({
  caseSensitive: false,
});

iEmitly.on('event', () => console.log('iHandler 1'));
iEmitly.on('Event', () => console.log('iHandler 2'));

iEmitly.emit('event');
iEmitly.emit('Event');
