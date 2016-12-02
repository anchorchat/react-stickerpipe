# React StickerPipe

Component for the [StickerPipe](http://stickerpipe.com/) API.
Currently in development.

## Usage

Install from npm

[![NPM](https://nodei.co/npm/react-stickerpipe.png)](https://nodei.co/npm/react-stickerpipe/)

Basic Usage

```javascript
import StickerMenu from 'react-stickerpipe';

function sendSticker(sticker) {
  send.sticker(sticker);
}

function MyComponent() {
  return (
    <StickerMenu
      apiKey={your.apiKey}
      userId={your.userId}
      sendSticker={sendSticker}
    />
  );
}
```

You can also pass your own API client as `client` to `<StickerMenu />`. The client must contain the following methods:

```javascript
// Get the purchased packs for the current user
getMyPacks() {}

// Get the sticker shop
getShop() {}

// Preview a sticker pack
getPackPreview() {}

// Purchase a sticker pack
purchasePack() {}
```

## Installation

### src

Install `node_modules` used in `./src`:

```
$ npm i
```

Compile `./src` with Babel:

```
$ npm run compile
```

### examples

Install `node_modules` used in `./examples`:

```
$ cd examples && npm i
```

Create a settings.json file in `./examples/src`:

```json
{
  "apiKey": "yourApiKey",
  "userId": "yourUserId"
}
```

## Development

### src

To watch for changes in `./src` run:

```
$ npm run watch
```

Babel will compile `./src` on changes.

### examples

To start the webpack server run:

```
$ cd examples && npm run start
```

Webpack wil compile on changes in `./examples/src`.

## Contributing

If you want to help with the development of this module and need to test your changes with the examples you can import `<StickerMenu />` directly from `./dist`. Be sure to run `npm run compile` first.

```javascript
'./examples/src/app.js'

// Change this
import StickerMenu from 'react-stickerpipe';

// to this
import StickerMenu from '../../dist/index';
```

## License

This project is licensed under the terms of the [MIT license](https://github.com/anchorchat/react-stickerpipe/blob/master/LICENSE).
