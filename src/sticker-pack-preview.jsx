import React, { Component } from 'react';

class StickerPackPreview extends Component {
  constructor() {
    super();

    this.purchasePack = this.purchasePack.bind(this);
  }

  purchasePack() {
    const { preview } = this.props;
    const { client, storage } = this.context;

    client.purchasePack(preview.pack_name, (err, res) => {
      if (err) {
        console.log(err);

        return false;
      }

      const response = JSON.parse(res.text);
      const pack = response.data;

      storage.storePack(pack.pack_name, pack.title, pack.stickers);

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
      <section>
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
  })
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
