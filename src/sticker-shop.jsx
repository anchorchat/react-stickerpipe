import React, { Component } from 'react';
import Sticker from './sticker';

class StickerShop extends Component {
  render() {
    const { stickerPacks } = this.props;

    return (
      <section>
        {stickerPacks.map(stickerPack => (
          <Sticker key={stickerPack.pack_name} src={stickerPack.main_icon.mdpi} />
        ))}
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
  })).isRequired
};

export default StickerShop;
