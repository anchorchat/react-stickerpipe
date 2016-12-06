import React from 'react';

function Sticker({ src, onClick }) {
  return (
    <img
      className="sticker"
      onClick={onClick}
      src={src}
      role="presentation"
    />
  );
}

Sticker.propTypes = {
  src: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
};

export default Sticker;
