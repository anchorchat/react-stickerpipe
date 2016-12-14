import React, { PropTypes } from 'react';
import Sticker from './sticker';
import IconAdd from './icons/icon-add';
import defaultColors from '../default-colors';

function MyStickerPacks({ stickerPacks, shop, toggleShop, showPack, colors }) {
  const style = {
    stickers: {
      minWidth: `calc((${stickerPacks.length} * 48px)`
    }
  };

  const color = Object.assign(defaultColors, colors);

  return (
    <section className="my-packs">
      <section className="pack-list">
        <div className="stickers-tab">
          <div className="stickers" style={style.stickers}>
            {
              stickerPacks.length > 0
              ? stickerPacks.map((stickerPack, index) => (
                <Sticker
                  key={`my-sticker-packs-${stickerPack.pack_name}-${index}`}
                  src={stickerPack.main_icon.mdpi}
                  onClick={() => showPack(stickerPack.pack_name)}
                />
              ))
              : <p>Loading...</p>
            }
          </div>
        </div>
        <div onClick={toggleShop} className="button-shop">
          <IconAdd color={shop ? color.primary : null} />
        </div>
      </section>
    </section>
  );
}

MyStickerPacks.propTypes = {
  stickerPacks: PropTypes.arrayOf(PropTypes.shape({
    pack_name: PropTypes.string.isRequired,
    main_icon: PropTypes.shape({
      mdpi: PropTypes.string.isRequired,
      hdpi: PropTypes.string.isRequired,
      xhdpi: PropTypes.string.isRequired,
      xxhdpi: PropTypes.string.isRequired
    }).isRequired
  })).isRequired,
  showPack: React.PropTypes.func.isRequired,
  toggleShop: React.PropTypes.func.isRequired,
  shop: React.PropTypes.bool.isRequired,
  colors: PropTypes.shape({
    primary: PropTypes.string.isRequired
  })
};

export default MyStickerPacks;
