import React, { Component } from 'react';
import Sticker from './sticker';
import StickerPackPreview from './sticker-pack-preview';
import parseResponse from './parse-response';

class StickerShop extends Component {
  constructor() {
    super();

    this.state = {
      preview: null,
      stickerPacks: []
    };

    this.previewPack = this.previewPack.bind(this);
    this.onPurchase = this.onPurchase.bind(this);
  }

  componentWillMount() {
    const { client } = this.context;

    client.getShop((err, res) => {
      if (err) {
        console.log(err);

        return false;
      }

      const stickerPacks = parseResponse(res);

      this.setState({
        stickerPacks
      });

      return false;
    });
  }

  onPurchase() {
    const { getMyPacks } = this.props;

    getMyPacks();
    this.setState({
      preview: null
    });
  }

  previewPack(packName) {
    const { client } = this.context;

    this.setState({
      loading: true
    });

    client.getPackPreview(packName, (err, res) => {
      if (err) {
        console.log(err);

        return false;
      }

      const preview = parseResponse(res);

      this.setState({
        preview
      });

      return false;
    });
  }

  render() {
    const { preview, stickerPacks } = this.state;

    return (
      <section>
        <h1>Sticker Shop</h1>
        {
          stickerPacks.length > 0
          ? stickerPacks.map(stickerPack => (
            <Sticker
              key={stickerPack.pack_name}
              onClick={() => this.previewPack(stickerPack.pack_name)}
              src={stickerPack.main_icon.mdpi}
            />
          ))
          : null
        }
        {
          preview
          ? <StickerPackPreview preview={preview} onPurchase={this.onPurchase} />
          : null
        }
      </section>
    );
  }
}

StickerShop.propTypes = {
  getMyPacks: React.PropTypes.func.isRequired
};

StickerShop.contextTypes = {
  client: React.PropTypes.shape({
    getMyPacks: React.PropTypes.func.isRequired,
    purchasePack: React.PropTypes.func.isRequired
  }).isRequired
};

export default StickerShop;
