import React, { Component } from 'react';
import StickerPack from './sticker-pack';
import Sticker from './sticker';

class MyStickerPacks extends Component {
  constructor() {
    super();

    this.state = {
      stickerPacks: [],
      loading: true,
      pack: null
    };

    this.showPack = this.showPack.bind(this);
  }

  componentWillMount() {
    const { client } = this.props;

    client.getMyPacks((err, res) => {
      if (err) {
        console.log(err);

        return false;
      }

      const response = JSON.parse(res.text);
      const stickerPacks = response.data;

      this.setState({
        stickerPacks,
        loading: false
      });

      return false;
    });
  }

  showPack(packName) {
    const { client } = this.props;

    const storedPack = client.getPack(packName);

    if (storedPack) {
      this.setState({
        pack: storedPack
      });

      return false;
    }

    client.purchasePack(packName, (err, res) => {
      if (err) {
        console.log(err);

        return false;
      }

      const response = JSON.parse(res.text);
      const pack = response.data;

      client.storePack(pack.pack_name, pack.title, pack.stickers);

      this.setState({
        pack
      });

      return false;
    });

    return false;
  }

  render() {
    const { loading, stickerPacks, pack } = this.state;

    return (
      <section>
        <h1>My Packs</h1>
        {
          !loading
          ? stickerPacks.map(stickerPack => (
            <Sticker
              key={stickerPack.pack_name}
              src={stickerPack.main_icon.mdpi}
              onClick={() => this.showPack(stickerPack.pack_name)}
            />
          ))
          : <p>Loading...</p>
        }
        {pack ? <StickerPack pack={pack} /> : null}
      </section>
    );
  }
}

MyStickerPacks.propTypes = {
  client: React.PropTypes.object.isRequired
};

export default MyStickerPacks;
