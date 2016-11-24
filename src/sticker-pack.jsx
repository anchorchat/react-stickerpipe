import React, { Component } from 'react';
import Sticker from './sticker';

class StickerPack extends Component {
  constructor() {
    super();

    this.sendSticker = this.sendSticker.bind(this);
  }

  sendSticker(sticker) {
    const { sendSticker } = this.props;

    sendSticker(sticker);
  }

  render() {
    const { pack } = this.props;

    return (
      <section>
        <p>{pack.title}</p>
        {pack.stickers.map(sticker => (
          <Sticker
            key={sticker.content_id}
            src={sticker.image.mdpi}
            onClick={() => this.sendSticker(sticker)}
          />
        ))}
      </section>
    );
  }
}

StickerPack.propTypes = {
  pack: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    stickers: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        content_id: React.PropTypes.number.isRequired,
        image: React.PropTypes.shape({
          mdpi: React.PropTypes.string.isRequired,
          hdpi: React.PropTypes.string.isRequired,
          xhdpi: React.PropTypes.string.isRequired,
          xxhdpi: React.PropTypes.string.isRequired,
        }).isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  sendSticker: React.PropTypes.func.isRequired
};

export default StickerPack;
