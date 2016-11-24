import React, { Component } from 'react';
import Sticker from './sticker';
import StickerPackPreview from './sticker-pack-preview';

class StickerShop extends Component {
  constructor() {
    super();

    this.state = {
      preview: null,
      stickerPacks: []
    };

    this.previewPack = this.previewPack.bind(this);
  }

  componentWillMount() {
    const { client } = this.props;

    client.getShop((err, res) => {
      if (err) {
        console.log(err);

        return false;
      }

      const response = JSON.parse(res.text);

      this.setState({
        stickerPacks: response.data
      });

      return false;
    });
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
        preview: response.data
      });

      return false;
    });
  }

  render() {
    const { client, storage } = this.props;
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
          ? <StickerPackPreview preview={preview} client={client} storage={storage} />
          : null
        }
      </section>
    );
  }
}

StickerShop.propTypes = {
  client: React.PropTypes.shape({
    getShop: React.PropTypes.func.isRequired,
    getPackPreview: React.PropTypes.func.isRequired
  }).isRequired,
  storage: React.PropTypes.shape({
    storePack: React.PropTypes.func.isRequired
  }).isRequired
};

export default StickerShop;
