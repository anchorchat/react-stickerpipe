import React, { Component, PropTypes } from 'react';
import StickerPipeClient from './client';
import Storage from './storage';
import MyStickerPacks from './components/my-sticker-packs';
import StickerPack from './components/sticker-pack';
import StickerShop from './components/sticker-shop';
import parseResponse from './parse-response';

class StickerMenu extends Component {
  static propTypes = {
    apiKey: (props, propName) => {
      if (!props.client && !props[propName]) {
        return new Error(
          `Prop ${propName} is required when prop client is not specified!`
        );
      }

      return null;
    },
    userId: PropTypes.string.isRequired,
    sendSticker: PropTypes.func.isRequired,
    client: PropTypes.shape({
      getMyPacks: PropTypes.func.isRequired,
      getShop: PropTypes.func.isRequired,
      getPackPreview: PropTypes.func.isRequired,
      purchasePack: PropTypes.func.isRequired
    })
  }

  static childContextTypes = {
    client: PropTypes.shape({
      getMyPacks: PropTypes.func.isRequired,
      purchasePack: PropTypes.func.isRequired
    }).isRequired,
    storage: PropTypes.shape({
      storePack: PropTypes.func.isRequired,
      getPack: PropTypes.func.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      stickerPacks: [],
      pack: {},
      shop: false
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
    this.showPack = this.showPack.bind(this);
    this.toggleShop = this.toggleShop.bind(this);
  }

  getChildContext() {
    return {
      client: this.client,
      storage: this.storage
    };
  }

  componentDidMount() {
    this.getMyPacks(this.showPack);
  }

  getMyPacks(callback) {
    this.client.getMyPacks((err, res) => {
      if (err) {
        console.log(err);

        return false;
      }

      const stickerPacks = parseResponse(res);

      if (callback) {
        callback(stickerPacks[0].pack_name);
      }

      this.setState({
        stickerPacks
      });

      return false;
    });
  }

  showPack(packName) {
    const { client, storage } = this;

    const storedPack = storage.getPack(packName);

    if (storedPack) {
      this.setState({
        pack: storedPack,
        shop: false
      });

      return false;
    }

    client.purchasePack(packName, (err, res) => {
      if (err) {
        console.log(err);

        return false;
      }

      const pack = parseResponse(res);

      storage.storePack(pack.pack_name, pack.title, pack.stickers);

      this.setState({
        pack,
        shop: false
      });

      return false;
    });

    return false;
  }

  toggleShop() {
    this.setState({
      shop: !this.state.shop
    });
  }

  render() {
    const { sendSticker } = this.props;
    const { stickerPacks, pack, shop } = this.state;

    return (
      <section className="sticker-menu">
        <MyStickerPacks
          sendSticker={sendSticker}
          stickerPacks={stickerPacks}
          showPack={this.showPack}
          toggleShop={this.toggleShop}
          shop={shop}
        />
        {
          (pack && pack.stickers) && !shop
          ? <StickerPack pack={pack} sendSticker={sendSticker} />
          : null
        }
        {shop ? <StickerShop getMyPacks={this.getMyPacks} /> : null}
      </section>
    );
  }
}

export default StickerMenu;
