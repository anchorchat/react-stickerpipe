import React, { Component } from 'react';

class StickerPackPreview extends Component {
  constructor() {
    super();

    this.purchasePack = this.purchasePack.bind(this);
  }

  purchasePack() {
    const { client, preview } = this.props;

    client.purchasePack(preview.pack_name, (err, res) => {
      if (err) {
        console.log(err);

        return false;
      }

      const response = JSON.parse(res.text);
      const pack = response.data;

      client.storePack(pack.pack_name, pack.title, pack.stickers);

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
          <h1>{preview.title} <button onClick={this.purchasePack}>Purchase</button></h1>
          <img style={style.preview} src={preview.preview.hdpi} alt={preview.title} />
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
  client: React.PropTypes.object.isRequired
};

export default StickerPackPreview;
