import React, { Component } from 'react';
import StickerPipeClient from './client';

class StickerList extends Component {
  constructor(props) {
    super(props);

    this.client = new StickerPipeClient(props.apiKey, props.userId, 'https://api.stickerpipe.com/api/v2');
  }

  render() {
    return(<h1>StickerList</h1>);
  }
}

StickerList.propTypes = {
  apiKey: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired
};

export default StickerList;
