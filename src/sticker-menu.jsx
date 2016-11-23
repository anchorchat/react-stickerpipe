import React, { Component } from 'react';
import StickerPipeClient from './client';

class StickerMenu extends Component {
  static renderList(stickers) {
    return (
      <div>
        {stickers.map(sticker => <img key={sticker.pack_name} src={sticker.main_icon.xhdpi} role="presentation" />)}
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.client = new StickerPipeClient(props.apiKey, props.userId, 'https://api.stickerpipe.com/api/v2');

    this.state = {
      loading: true,
      stickers: []
    };
  }

  componentWillMount() {
    this.client.getShop((err, res) => {
      if (err) {
        console.log(err);

        return false;
      }

      const response = JSON.parse(res.text);
      console.log(response);

      this.setState({
        stickers: response.data,
        loading: false
      });

      return false;
    });
  }

  render() {
    return (
      <div>
        <h1>StickerMenu</h1>
        {
          !this.state.loading
          ? this.constructor.renderList(this.state.stickers)
          : <p>Loading...</p>
        }
      </div>
    );
  }
}

StickerMenu.propTypes = {
  apiKey: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired
};

export default StickerMenu;
