<div align="center">
  <h1>Emitly</h1>
  <p><i>A simple event emitter for JavaScript.</i></p>
</div>

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [Author](#author)
- [Support](#show-your-support)
- [License](#license)

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

### RegExps

You can listen to RegExps to catch specific events:

```javascript
emitly.on(/^event/, type => {
  console.log(`Event type: ${type}`);
});
```

You can also trigger events with RegExps:

```javascript
emitly.emit(/foo$/, 'bar');
```

### Handlers Category

Handlers have two categories: `normal` and `regex`.<br>
You can clear a specific category like this:

```javascript
emitly.clearAll('normal');
```

## Contributing

All contributions, issues and feature requests are welcome!<br>
Please feel free to check [issues page](https://github.com/mazecodes/emitly/issues).

1. Fork the project
1. Create your feature branch (`git checkout -b feature/AwesomeFeature`)
1. Commit your changes (`git commit -m "Add Awesome Feature"`)
1. Push to the branch (`git push origin feature/AwesomeFeature`)
1. Open a Pull Request

## Author

Maze Peterson:

- Twitter: [mazecodes](https://twitter.com/mazecodes)
- GitHub: [mazecodes](https://github.com/mazecodes)
- npm: [mazecodes](https://npmjs.com/~mazecodes)

## Show your support

Give a ⭐ if you liked this project!

## License

[MIT](https://github.com/mazecodes/emitly/blob/master/LICENSE) © Maze Peterson
