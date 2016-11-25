import React, { Component } from 'react';
import StickerPipeClient from './client';
import Storage from './storage';
import MyStickerPacks from './my-sticker-packs';
import StickerShop from './sticker-shop';

class StickerMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stickerPacks: []
    };

    let client;

    if (props && props.client) {
      client = props.client;
    }

    if (props && !props.client && props.apiKey) {
      client = new StickerPipeClient(props.apiKey, props.userId, 'https://api.stickerpipe.com/api/v2');
    }

    this.client = client;
    this.storage = new Storage(props.userId);

    this.getMyPacks = this.getMyPacks.bind(this);
  }

  getChildContext() {
    return {
      client: this.client,
      storage: this.storage
    };
  }

  componentWillMount() {
    this.getMyPacks();
  }

  getMyPacks() {
    this.client.getMyPacks((err, res) => {
      if (err) {
        console.log(err);

        return false;
      }

      const response = JSON.parse(res.text);
      const stickerPacks = response.data;

      this.setState({
        stickerPacks
      });

      return false;
    });
  }

  render() {
    const { sendSticker } = this.props;
    const { stickerPacks } = this.state;

    return (
      <section>
        <MyStickerPacks sendSticker={sendSticker} stickerPacks={stickerPacks} />
        <StickerShop getMyPacks={this.getMyPacks} />
      </section>
    );
  }
}

StickerMenu.propTypes = {
  apiKey: (props, propName) => {
    if (!props.client && !props[propName]) {
      return new Error(
        `Prop ${propName} is required when prop client is not specified!`
      );
    }

    return null;
  },
  userId: React.PropTypes.string.isRequired,
  sendSticker: React.PropTypes.func.isRequired,
  client: React.PropTypes.shape({
    getMyPacks: React.PropTypes.func.isRequired,
    getShop: React.PropTypes.func.isRequired,
    getPackPreview: React.PropTypes.func.isRequired,
    purchasePack: React.PropTypes.func.isRequired
  })
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
