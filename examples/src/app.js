import React, { Component } from 'react';
import './app.css';
import StickerMenu from 'react-stickerpipe';
import settings from './settings.json';
import StickerPipeClient from './client';

const client = new StickerPipeClient(
  settings.apiKey,
  settings.userId,
  'https://api.stickerpipe.com/api/v2'
);

class App extends Component {
  constructor() {
    super();

    this.state = {
      sticker: null
    };

    this.sendSticker = this.sendSticker.bind(this);
  }

  sendSticker(sticker) {
    this.setState({
      sticker
    });
  }

  render() {
    const { sticker } = this.state;

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
        <StickerMenu
          userId={settings.userId}
          sendSticker={this.sendSticker}
          client={client}
        />
      </section>
    );
  }
}

export default App;
