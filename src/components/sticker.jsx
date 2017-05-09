import React from 'react';
import PropTypes from 'prop-types';

function Sticker({ src, onClick }) {
  return (
    <img
      className="sticker"
      onClick={onClick}
      src={src}
      alt="sticker"
    />
  );
}

Sticker.propTypes = {
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Sticker;
