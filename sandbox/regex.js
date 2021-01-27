const Emitly = require('../src');

const emitly = new Emitly();

emitly.on('hello world', () => console.log('Hello World'));
emitly.on(/^event/, type => console.log(`Event: ${type}`));

emitly.emit(/^hello/);
emitly.emit('event type');
