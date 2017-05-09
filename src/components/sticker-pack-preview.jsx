/* eslint no-console: ["error", { allow: ["error"] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    colors: PropTypes.shape({
      primary: PropTypes.string.isRequired,
      secondary: PropTypes.string.isRequired
    }).isRequired,
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
        console.error(err);

        return false;
      }

      const pack = parseResponse(res);

      storage.storePack(pack.pack_name, pack.title, pack.stickers);

      const storedPacks = storage.getMyPacks();

      const hasPurchasedPack = Boolean(
        storedPacks.find(storedPack => storedPack.pack_name === pack.pack_name)
      );

      if (storedPacks.length > 0 && !hasPurchasedPack) {
        storedPacks.unshift(pack);

        storage.storeMyPacks(storedPacks);
      }

      onPurchase();

      return false;
    });
  }

  render() {
    const { preview, closePreview, colors } = this.props;

    const style = {
      header: {
        backgroundColor: colors.primary
      },
      heading: {
        color: colors.secondary
      }
    };

    return (
      <section className="sticker-pack-preview">
        <div className="preview-header" style={style.header}>
          <h1 style={style.heading}>{preview.title}</h1>
          <div onClick={closePreview} className="button-close"><IconClose color={colors.secondary} /></div>
        </div>
        <div className="preview-body">
          <img src={preview.preview_landscape.hdpi} alt={preview.title} />
        </div>
        <div className="preview-footer">
          <div onClick={this.purchasePack} className="button-purchase"><IconPurchase color={colors.primary} /></div>
        </div>
      </section>
    );
  }
}

export default StickerPackPreview;
