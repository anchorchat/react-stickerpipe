import React, { Component, PropTypes } from 'react';
import StickerPack from './sticker-pack';
import Sticker from './sticker';
import parseResponse from './parse-response';

class MyStickerPacks extends Component {
  static propTypes = {
    sendSticker: PropTypes.func.isRequired,
    stickerPacks: PropTypes.arrayOf(PropTypes.shape({
      pack_name: PropTypes.string.isRequired,
      main_icon: PropTypes.shape({
        mdpi: PropTypes.string.isRequired,
        hdpi: PropTypes.string.isRequired,
        xhdpi: PropTypes.string.isRequired,
        xxhdpi: PropTypes.string.isRequired
      }).isRequired
    })).isRequired,
    getMyPacks: React.PropTypes.func.isRequired
  }

  static contextTypes = {
    client: PropTypes.shape({
      getMyPacks: PropTypes.func.isRequired,
      purchasePack: PropTypes.func.isRequired
    }).isRequired,
    storage: PropTypes.shape({
      storePack: PropTypes.func.isRequired,
      getPack: PropTypes.func.isRequired
    }).isRequired
  }

  constructor() {
    super();

    this.state = {
      stickerPacks: [],
      pack: null
    };

    this.showPack = this.showPack.bind(this);
  }

  componentDidMount() {
    const { getMyPacks } = this.props;

    getMyPacks((err, res) => {
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
      <section className="my-packs">
        <h1>My Packs</h1>
        {
          stickerPacks.length > 0
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

export default MyStickerPacks;
