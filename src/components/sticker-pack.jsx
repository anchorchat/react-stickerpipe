import React, { PropTypes } from 'react';
import Sticker from './sticker';

function StickerPack({ pack, sendSticker }) {
  return (
    <section className="sticker-pack">
      <h1>{pack.title}</h1>
      <section className="stickers">
        {pack.stickers.map(sticker => (
          <Sticker
            key={`sticker-pack-${sticker.content_id}`}
            src={sticker.image.mdpi}
            onClick={() => sendSticker(sticker)}
          />
        ))}
      </section>
    </section>
  );
}

StickerPack.propTypes = {
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
};

export default StickerPack;
