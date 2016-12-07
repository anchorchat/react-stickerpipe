import React from 'react';

function IconPurchase({ color }) {
  const fill = color || '#757575';

  return (
    <svg width="24px" height="24px" viewBox="0 0 24 24">
      <g id="icon-purchase" transform="translate(5.000000, 5.000000)" fill={fill}>
        <polygon id="Shape" points="14 8 8 8 8 14 6 14 6 8 0 8 0 6 6 6 6 0 8 0 8 6 14 6" />
      </g>
    </svg>
  );
}

IconPurchase.propTypes = {
  color: React.PropTypes.string
};

export default IconPurchase;
