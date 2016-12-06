import React, { Component, PropTypes } from 'react';
import StickerPack from './sticker-pack';
import Sticker from './sticker';
import parseResponse from '../parse-response';
import IconAdd from './icon-add';

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
    getMyPacks: React.PropTypes.func.isRequired,
    toggleShop: React.PropTypes.func.isRequired,
    shop: React.PropTypes.bool.isRequired
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
    this.props.getMyPacks((stickerPacks) => {
      this.showPack(stickerPacks[0].pack_name);
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
    const { sendSticker, stickerPacks, shop, toggleShop } = this.props;

    const style = {
      stickers: {
        minWidth: `calc((${stickerPacks.length} * 48px)`
      }
    };

    return (
      <section className="my-packs">
        <section className="pack-list">
          <div className="stickers-tab">
            <div className="stickers" style={style.stickers}>
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
            </div>
          </div>
          <div onClick={toggleShop} className="button-shop">
            <IconAdd color={shop ? '#00BCD4' : null} />
          </div>
        </section>
        {pack ? <StickerPack pack={pack} sendSticker={sendSticker} /> : null}
      </section>
    );
  }
}

export default MyStickerPacks;
