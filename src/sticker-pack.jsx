import React, { Component } from 'react';
import Sticker from './sticker';

class StickerPack extends Component {
  constructor() {
    super();

    this.sendSticker = this.sendSticker.bind(this);
  }

  sendSticker(sticker) {
    console.log(sticker);
  }

  render() {
    const { pack } = this.props;

    return (
      <section>
        <p>{pack.title}</p>
        {pack.stickers.map(sticker => (
          <Sticker
            key={sticker.stickerId}
            src={sticker.srcset.mdpi}
            onClick={() => this.sendSticker(sticker)}
          />
        ))}
      </section>
    );
  }
}

StickerPack.propTypes = {
  pack: React.PropTypes.object.isRequired
};

export default StickerPack;
