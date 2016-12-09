import React, { Component } from 'react';
import emojione from 'emojione';
import './app.css';
import StickerMenu from '../../dist/index';
import settings from './settings.json';
import EmojiMenu from './emoji-menu';
import IconEmoji from './icon-emoji';

class App extends Component {
  constructor() {
    super();

    this.state = {
      sticker: null,
      emoji: null,
      menu: 'stickers'
    };

    this.sendSticker = this.sendSticker.bind(this);
    this.sendEmoji = this.sendEmoji.bind(this);
    this.showStickers = this.showStickers.bind(this);
    this.showEmoji = this.showEmoji.bind(this);
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

  showStickers() {
    this.setState({
      menu: 'stickers'
    });
  }

  showEmoji() {
    this.setState({
      menu: 'emoji'
    });
  }

  render() {
    const { sticker, emoji, menu } = this.state;

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
        {
          menu === 'emoji'
          ? <EmojiMenu sendEmoji={this.sendEmoji} showStickers={this.showStickers} />
          : null
        }
        {
          menu === 'stickers'
          ? <StickerMenu
            userId={settings.userId}
            apiKey={settings.apiKey}
            sendSticker={this.sendSticker}
            toggleButton={<div onClick={this.showEmoji}><IconEmoji color="#00BCD4" /></div>}
          />
          : null
        }
      </section>
    );
  }
}

export default App;
