import React, { Component } from 'react';
import parseResponse from './parse-response';

class StickerPackPreview extends Component {
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
    const { preview } = this.props;

    const style = {
      preview: {
        width: '270px'
      }
    };

    return (
      <section className="sticker-pack-preview">
        <h1>Preview</h1>
        <section>
          <h1>{preview.title}</h1>
          <img style={style.preview} src={preview.preview.hdpi} alt={preview.title} />
          <button onClick={this.purchasePack}>Purchase</button>
        </section>
      </section>
    );
  }
}

StickerPackPreview.propTypes = {
  preview: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    pack_name: React.PropTypes.string.isRequired,
    preview: React.PropTypes.shape({
      mdpi: React.PropTypes.string.isRequired,
      hdpi: React.PropTypes.string.isRequired
    })
  }),
  onPurchase: React.PropTypes.func.isRequired
};

StickerPackPreview.contextTypes = {
  client: React.PropTypes.shape({
    getMyPacks: React.PropTypes.func.isRequired,
    purchasePack: React.PropTypes.func.isRequired
  }).isRequired,
  storage: React.PropTypes.shape({
    storePack: React.PropTypes.func.isRequired,
    getPack: React.PropTypes.func.isRequired
  }).isRequired
};

export default StickerPackPreview;
