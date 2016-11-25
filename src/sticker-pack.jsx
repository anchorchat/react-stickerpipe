import React, { Component, PropTypes } from 'react';
import Sticker from './sticker';

class StickerPack extends Component {
  static propTypes = {
    pack: PropTypes.shape({
      title: PropTypes.string.isRequired,
      stickers: PropTypes.arrayOf(
        PropTypes.shape({
          content_id: PropTypes.number.isRequired,
          image: PropTypes.shape({
            mdpi: PropTypes.string.isRequired,
            hdpi: PropTypes.string.isRequired,
            xhdpi: PropTypes.string.isRequired,
            xxhdpi: PropTypes.string.isRequired
          }).isRequired
        }).isRequired
      ).isRequired
    }).isRequired,
    sendSticker: PropTypes.func.isRequired
  }

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
      <section className="sticker-pack">
        <h1>{pack.title}</h1>
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

export default StickerPack;
