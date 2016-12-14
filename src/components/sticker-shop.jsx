import React, { Component, PropTypes } from 'react';
import Sticker from './sticker';
import StickerPackPreview from './sticker-pack-preview';
import parseResponse from '../parse-response';

class StickerShop extends Component {
  static propTypes = {
    getMyPacks: PropTypes.func.isRequired,
    colors: PropTypes.shape({
      primary: PropTypes.string.isRequired,
      secondary: PropTypes.string.isRequired
    })
  }

  static contextTypes = {
    client: PropTypes.shape({
      getMyPacks: PropTypes.func.isRequired,
      purchasePack: PropTypes.func.isRequired
    }).isRequired
  }

  constructor() {
    super();

    this.state = {
      preview: null,
      stickerPacks: []
    };

    this.previewPack = this.previewPack.bind(this);
    this.onPurchase = this.onPurchase.bind(this);
    this.closePreview = this.closePreview.bind(this);
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

  closePreview() {
    this.setState({
      preview: null
    });
  }

  render() {
    const { preview, stickerPacks } = this.state;
    const { colors } = this.props;

    return (
      <section className="sticker-shop">
        <h1>Sticker Shop</h1>
        <section className="stickers">
          {
            stickerPacks.length > 0
            ? stickerPacks.map(stickerPack => (
              <Sticker
                key={`sticker-shop-${stickerPack.pack_name}`}
                onClick={() => this.previewPack(stickerPack.pack_name)}
                src={stickerPack.main_icon.mdpi}
              />
            ))
            : null
          }
        </section>
        {
          preview
          ? <StickerPackPreview
            preview={preview}
            onPurchase={this.onPurchase}
            closePreview={this.closePreview}
            colors={colors}
          />
          : null
        }
      </section>
    );
  }
}

export default StickerShop;
