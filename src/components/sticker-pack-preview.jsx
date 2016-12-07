import React, { Component, PropTypes } from 'react';
import parseResponse from '../parse-response';
import IconPurchase from './icons/icon-purchase';
import IconClose from './icons/icon-close';

class StickerPackPreview extends Component {
  static propTypes = {
    preview: PropTypes.shape({
      title: PropTypes.string.isRequired,
      pack_name: PropTypes.string.isRequired,
      preview: PropTypes.shape({
        mdpi: PropTypes.string.isRequired,
        hdpi: PropTypes.string.isRequired
      })
    }),
    onPurchase: PropTypes.func.isRequired,
    closePreview: PropTypes.func.isRequired
  }

  static contextTypes = {
    client: PropTypes.shape({
      getMyPacks: PropTypes.func.isRequired,
      purchasePack: PropTypes.func.isRequired
    }).isRequired,
    storage: PropTypes.shape({
      storePack: PropTypes.func.isRequired,
      getPack: PropTypes.func.isRequired
    }).isRequired
  }

  constructor() {
    super();

    this.purchasePack = this.purchasePack.bind(this);
  }

  purchasePack() {
    const { preview, onPurchase } = this.props;
    const { client, storage } = this.context;

    client.purchasePack(preview.pack_name, (err, res) => {
      if (err) {
        console.log(err);

        return false;
      }

      const pack = parseResponse(res);

      storage.storePack(pack.pack_name, pack.title, pack.stickers);
      onPurchase();

      return false;
    });
  }

  render() {
    const { preview, closePreview } = this.props;

    return (
      <section className="sticker-pack-preview">
        <h1>{preview.title}</h1>
        <img src={preview.preview_landscape.hdpi} alt={preview.title} />
        <div onClick={closePreview} className="button-close"><IconClose /></div>
        <div onClick={this.purchasePack} className="button-purchase"><IconPurchase /></div>
      </section>
    );
  }
}

export default StickerPackPreview;
