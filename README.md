# React StickerPipe

## Project Setup

### src

To watch for changes in `./src` run:

```
$ npm run watch
```

Babel will compile `./src` on changes.

### examples

Create a settings.json file in `./examples/src`:

```
{
  "apiKey": "yourApiKey",
  "userId": "yourUserId"
}
```

To start the webpack server run:

```
$ cd examples && npm run start
```

Webpack wil compile on changes in both `./src` and `./examples/src`.

## License

This project is licensed under the terms of the [MIT license](https://github.com/anchorchat/react-stickerpipe/blob/master/LICENSE).
