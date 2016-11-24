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

  getChildContext() {
    const { apiKey, userId } = this.props;

    return {
      client: new StickerPipeClient(apiKey, userId, 'https://api.stickerpipe.com/api/v2'),
      storage: new Storage(userId)
    };
  }

  render() {
    const { sendSticker } = this.props;

    return (
      <section>
        <MyStickerPacks sendSticker={sendSticker} />
        <StickerShop />
      </section>
    );
  }
}

StickerMenu.propTypes = {
  apiKey: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  sendSticker: React.PropTypes.func.isRequired
};

StickerMenu.childContextTypes = {
  client: React.PropTypes.shape({
    getMyPacks: React.PropTypes.func.isRequired,
    purchasePack: React.PropTypes.func.isRequired
  }).isRequired,
  storage: React.PropTypes.shape({
    storePack: React.PropTypes.func.isRequired,
    getPack: React.PropTypes.func.isRequired
  }).isRequired
};

export default StickerMenu;
