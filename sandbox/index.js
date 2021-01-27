const Emitly = require('../src');

const emitly = new Emitly();

/**
 * =========================
 * Add multiple handlers at once
 * =========================
 */
emitly.on(
  'event',
  () => console.log('Handler 1'),
  () => console.log('Handler 2')
);

/**
 * =========================
 * Add a single handler
 * =========================
 */
emitly.on('event', () => console.log('Handler 3'));

/**
 * =========================
 * Add an handler which receives arguments
 * =========================
 */
emitly.on('event', (...messages) => {
  console.log(`Messages: ${messages}`);
});

/**
 * =========================
 * Emit an event with arguments
 * =========================
 */
emitly.emit('event', 'Message 1', 'Message 2');

/**
 * =========================
 * Emit an event without arguments
 * =========================
 */
emitly.emit('event');

/**
 * =========================
 * Emit an event which doesn't exist
 * =========================
 */
emitly.emit('random');

/**
 * =========================
 * Remove a handler
 * =========================
 */
const handler = () => console.log('I exist');

emitly.on('event 2', handler);
emitly.emit('event 2');

emitly.off('event 2', handler);
emitly.emit('event 2');

/**
 * =========================
 * Remove multiple handlers
 * =========================
 */
const handler1 = () => console.log('Handler 1');
const handler2 = () => console.log('Handler 2');
const handler3 = () => console.log('Handler 3');

emitly.on('event 3', handler1, handler1, handler2, handler3, () =>
  console.log('Handler 4')
);
emitly.emit('event 3');

emitly.off('event 3', handler1, handler2);
emitly.emit('event 3');

/**
 * =========================
 * Clear an event
 * =========================
 */
emitly.clear('event 3');
emitly.emit('event 3');

/**
 * =========================
 * Clear all events
 * =========================
 */
emitly.on('test 1', () => console.log('Test 1'));
emitly.on('test 2', () => console.log('Test 2'));
emitly.on('test 3', () => console.log('Test 3'));

emitly.clearAll();

emitly.emit('test 1');
emitly.emit('test 2');
emitly.emit('test 3');

/**
 * =========================
 * Passing a non-function handler
 * =========================
 */
try {
  emitly.on(
    'test event',
    () => console.log('Hello World'),
    () => console.log('Hello World'),
    false,
    () => console.log('Hello World')
  );
} catch (err) {
  console.log(err.message);
}
