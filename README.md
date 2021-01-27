<div align="center">
  <h1>Emitly</h1>
  <p><i>A simple event emitter for JavaScript.</i></p>
</div>

## Install

npm:

```bash
npm install emitly
```

Yarn:

```bash
yarn add emitly
```

GitHub:

```bash
git clone https://github.com/mazecodes/emitly.git
```

## Usage

Make an instance:

```javascript
const Emitly = require('emitly');

const emitly = new Emitly();
```

You can also make Emitly case-insensitive if you want:

```javascript
const emitly = new Emitly({
  caseSensitive: false,
});
```

Listen to an event:

```javascript
emitly.on('event', message => {
  console.log(`Event: ${message}`);
});
```

You can also attach multiple handlers to an event at the same time:

```javascript
emitly.on(
  'event',
  () => console.log('Handler 1'),
  () => console.log('Handler 2'),
  () => console.log('Handler 3')
);
```

Trigger an event:

```javascript
emitly.emit('event');
```

You can pass multiple values to handlers:

```javascript
emitly.emit('event', 'Message 1', 'Message 2');
```

Remove a specific event handler:

```javascript
emitly.off('event', handler);
```

Remove all handlers for an event:

```javascript
emitly.clear('event');
```

## All events

Listen to all events:

```javascript
emitly.onAll((type, message) => {
  console.log(`Event type: ${type}`);
});
```

Trigger all events:

```javascript
emitly.emitAll();
```

Remove all events:

```javascript
emitly.clearAll();
```
