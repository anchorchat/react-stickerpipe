import React, { Component } from 'react';
import Sticker from './sticker';
import StickerPackPreview from './sticker-pack-preview';

class StickerShop extends Component {
  constructor() {
    super();

    this.state = {
      preview: null,
      loading: false
    };

    this.previewPack = this.previewPack.bind(this);
  }

  previewPack(packName) {
    const { client } = this.props;

    this.setState({
      loading: true
    });

    client.getPackPreview(packName, (err, res) => {
      if (err) {
        console.log(err);

        return false;
      }

      const response = JSON.parse(res.text);

      this.setState({
        preview: response.data,
        loading: false
      });

      return false;
    });
  }

  render() {
    const { stickerPacks, client, storage } = this.props;
    const { loading, preview } = this.state;

    return (
      <section>
        <h1>Sticker Shop</h1>
        {stickerPacks.map(stickerPack => (
          <Sticker
            key={stickerPack.pack_name}
            onClick={() => this.previewPack(stickerPack.pack_name)}
            src={stickerPack.main_icon.mdpi}
          />
        ))}
        {
          !loading && preview
          ? <StickerPackPreview preview={preview} client={client} storage={storage} />
          : null
        }
        {loading ? <p>Loading...</p> : null}
      </section>
    );
  }
}

StickerShop.propTypes = {
  stickerPacks: React.PropTypes.arrayOf(React.PropTypes.shape({
    pack_name: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    pricepoint: React.PropTypes.string.isRequired,
    main_icon: React.PropTypes.shape({
      mdpi: React.PropTypes.string.isRequired,
      hdpi: React.PropTypes.string.isRequired
    })
  })).isRequired,
  client: React.PropTypes.object.isRequired,
  storage: React.PropTypes.shape({
    storePack: React.PropTypes.func.isRequired
  }).isRequired
};

export default StickerShop;
