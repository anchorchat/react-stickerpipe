import React, { Component } from 'react';
import Sticker from './sticker';

class MyStickerPacks extends Component {
  constructor() {
    super();

    this.state = {
      stickerPacks: [],
      loading: true
    };
  }

  componentWillMount() {
    const { client } = this.props;

    client.getMyPacks((err, res) => {
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
    const { loading, stickerPacks } = this.state;

    return (
      <section>
        <h1>My Packs</h1>
        {
          !loading
          ? stickerPacks.map(stickerPack => (
            <Sticker
              key={stickerPack.pack_name}
              src={stickerPack.main_icon.mdpi}
            />
          ))
          : <p>Loading...</p>
        }
      </section>
    );
  }
}

MyStickerPacks.propTypes = {
  client: React.PropTypes.object.isRequired
};

export default MyStickerPacks;
