import React, { Component } from 'react';
import StickerPipeClient from './client';
import StickerShop from './sticker-shop';

class StickerMenu extends Component {
  constructor(props) {
    super(props);

    this.client = new StickerPipeClient(props.apiKey, props.userId, 'https://api.stickerpipe.com/api/v2');

    this.state = {
      loading: true,
      stickerPacks: []
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
        stickerPacks: response.data,
        loading: false
      });

      return false;
    });
  }

  render() {
    return (
      <section>
        <h1>StickerMenu</h1>
        {
          !this.state.loading
          ? <StickerShop stickerPacks={this.state.stickerPacks} />
          : <p>Loading...</p>
        }
      </section>
    );
  }
}

StickerMenu.propTypes = {
  apiKey: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired
};

export default StickerMenu;
