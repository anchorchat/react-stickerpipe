import React, { Component } from 'react';
import emojione from 'emojione';
import './app.css';
import StickerMenu from '../../dist/index';
import settings from './settings.json';
import EmojiMenu from './emoji-menu';

class App extends Component {
  constructor() {
    super();

    this.state = {
      sticker: null
    };

    this.sendSticker = this.sendSticker.bind(this);
    this.sendEmoji = this.sendEmoji.bind(this);
  }

  sendSticker(sticker) {
    this.setState({
      sticker
    });
  }

  sendEmoji(emoji) {
    this.setState({
      emoji
    });
  }

  render() {
    const { sticker, emoji } = this.state;

    const style = {
      sticker: {
        width: '120px'
      }
    };

    return (
      <section className="demo">
        <h1>
          <a
            href="https://github.com/anchorchat/react-stickerpipe"
            target="_blank"
            rel="noopener noreferrer"
          >
            React StickerPipe
          </a>
        </h1>
        {sticker ? <img style={style.sticker} src={sticker.image.hdpi} alt="sticker" /> : null}
        {emoji ? <span dangerouslySetInnerHTML={{ __html: emojione.toImage(emoji) }} /> : null}
        <EmojiMenu
          sendEmoji={this.sendEmoji}
        />
        <StickerMenu
          userId={settings.userId}
          apiKey={settings.apiKey}
          sendSticker={this.sendSticker}
        />
      </section>
    );
  }
}

export default App;
