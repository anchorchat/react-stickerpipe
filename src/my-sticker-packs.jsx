import React, { Component } from 'react';
import StickerPack from './sticker-pack';
import Sticker from './sticker';
import parseResponse from './parse-response';

class MyStickerPacks extends Component {
  constructor() {
    super();

    this.state = {
      stickerPacks: [],
      pack: null
    };

    this.showPack = this.showPack.bind(this);
  }

  componentWillMount() {
    const { client } = this.context;

    client.getMyPacks((err, res) => {
      if (err) {
        console.log(err);

        return false;
      }

      const stickerPacks = parseResponse(res);

      this.setState({
        stickerPacks
      });

      return false;
    });
  }

  showPack(packName) {
    const { client, storage } = this.context;

    const storedPack = storage.getPack(packName);

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

      const pack = parseResponse(res);

      storage.storePack(pack.pack_name, pack.title, pack.stickers);

      this.setState({
        pack
      });

      return false;
    });

    return false;
  }

  render() {
    const { pack } = this.state;
    const { sendSticker, stickerPacks } = this.props;

    return (
      <section>
        <h1>My Packs</h1>
        {
          !stickerPacks.lenght > 0
          ? stickerPacks.map(stickerPack => (
            <Sticker
              key={stickerPack.pack_name}
              src={stickerPack.main_icon.mdpi}
              onClick={() => this.showPack(stickerPack.pack_name)}
            />
          ))
          : <p>Loading...</p>
        }
        {pack ? <StickerPack pack={pack} sendSticker={sendSticker} /> : null}
      </section>
    );
  }
}

MyStickerPacks.propTypes = {
  sendSticker: React.PropTypes.func.isRequired,
  stickerPacks: React.PropTypes.arrayOf(React.PropTypes.shape({
    pack_name: React.PropTypes.string.isRequired,
    main_icon: React.PropTypes.shape({
      mdpi: React.PropTypes.string.isRequired,
      hdpi: React.PropTypes.string.isRequired,
      xhdpi: React.PropTypes.string.isRequired,
      xxhdpi: React.PropTypes.string.isRequired
    }).isRequired
  })).isRequired
};

MyStickerPacks.contextTypes = {
  client: React.PropTypes.shape({
    getMyPacks: React.PropTypes.func.isRequired,
    purchasePack: React.PropTypes.func.isRequired
  }).isRequired,
  storage: React.PropTypes.shape({
    storePack: React.PropTypes.func.isRequired,
    getPack: React.PropTypes.func.isRequired
  }).isRequired
};

export default MyStickerPacks;
