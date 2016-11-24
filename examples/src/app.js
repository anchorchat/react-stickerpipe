import React, { Component } from 'react';
import './app.css';
import StickerMenu from '../../lib/index';
import settings from './settings.json';

class App extends Component {
  constructor() {
    super();

    this.state = {
      sticker: null
    };

    this.sendSticker = this.sendSticker.bind(this);
  }

  sendSticker(sticker) {
    console.log(sticker);
    this.setState({
      sticker
    });
  }

  render() {
    const { sticker } = this.state;

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
        {sticker ? <img src={sticker.image.mdpi} alt="sticker" /> : null}
        <StickerMenu
          apiKey={settings.apiKey}
          userId={settings.userId}
          sendSticker={this.sendSticker}
        />
      </section>
    );
  }
}

export default App;
