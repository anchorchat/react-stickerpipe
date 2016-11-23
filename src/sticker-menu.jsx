import React, { Component } from 'react';
import StickerPipeClient from './client';

class StickerMenu extends Component {
  constructor(props) {
    super(props);

    this.client = new StickerPipeClient(props.apiKey, props.userId, 'https://api.stickerpipe.com/api/v2');
  }

  render() {
    return <h1>StickerMenu</h1>;
  }
}

StickerMenu.propTypes = {
  apiKey: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired
};

export default StickerMenu;
