import React, { Component } from 'react';
import StickerPipeClient from './client';
import Storage from './storage';
import MyStickerPacks from './my-sticker-packs';
import StickerShop from './sticker-shop';

class StickerMenu extends Component {
  constructor(props) {
    super(props);

    this.client = new StickerPipeClient(props.apiKey, props.userId, 'https://api.stickerpipe.com/api/v2');
    this.storage = new Storage(props.userId);
  }

  render() {
    return (
      <section>
        <MyStickerPacks client={this.client} storage={this.storage} />
        <StickerShop client={this.client} storage={this.storage} />
      </section>
    );
  }
}

StickerMenu.propTypes = {
  apiKey: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired
};

export default StickerMenu;
