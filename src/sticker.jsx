import React from 'react';

function Sticker({ src }) {
  const style = {
    sticker: {
      width: '50px',
      cursor: 'pointer'
    }
  };

  return <img style={style.sticker} src={src} role="presentation" />;
}

Sticker.propTypes = {
  src: React.PropTypes.string.isRequired
};

export default Sticker;
