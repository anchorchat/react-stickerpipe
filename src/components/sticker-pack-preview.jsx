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

      const storedPacks = storage.getMyPacks();
      if (storedPacks.length > 0) {
        storedPacks.unshift(pack);

        storage.storeMyPacks(storedPacks);
      }

      onPurchase();

      return false;
    });
  }

  render() {
    const { preview, closePreview } = this.props;

    return (
      <section className="sticker-pack-preview">
        <div className="preview-header">
          <h1>{preview.title}</h1>
          <div onClick={closePreview} className="button-close"><IconClose color="rgba(255,255,255,.7)" /></div>
        </div>
        <div className="preview-body">
          <img src={preview.preview_landscape.hdpi} alt={preview.title} />
        </div>
        <div className="preview-footer">
          <div onClick={this.purchasePack} className="button-purchase"><IconPurchase color="rgba(99,137,168,.7)" /></div>
        </div>
      </section>
    );
  }
}

export default StickerPackPreview;
