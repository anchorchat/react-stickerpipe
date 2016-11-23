import React from 'react';

function Sticker({ src, onClick }) {
  const style = {
    sticker: {
      width: '50px',
      cursor: 'pointer'
    }
  };

  return <img onClick={onClick} style={style.sticker} src={src} role="presentation" />;
}

Sticker.propTypes = {
  src: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
};

export default Sticker;
