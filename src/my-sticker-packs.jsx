import React, { Component } from 'react';
import _ from 'underscore';
import StickerPack from './sticker-pack';
import Sticker from './sticker';

class MyStickerPacks extends Component {
  constructor() {
    super();

    this.state = {
      stickerPacks: [],
      loading: true,
      currentPack: null
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
      const packs = response.data;

      const storedPacks = [];

      packs.forEach((pack) => {
        const storedPack = client.getPack(pack.pack_name);

        if (!storedPack) {
          // TODO Restore purchase, save to localStorage
          console.log('Did not find pack in localStorage.');
        } else {
          storedPacks.push(storedPack);
        }
      });

      this.setState({
        stickerPacks: response.data,
        storedPacks,
        loading: false
      });

      return false;
    });
  }

  showPack(packName) {
    this.setState({
      currentPack: packName
    });
  }

  renderPack(packName) {
    const { storedPacks } = this.state;

    const pack = _.find(storedPacks, storedPack => storedPack.name === packName);

    return <StickerPack pack={pack} />;
  }

  render() {
    const { loading, stickerPacks, currentPack } = this.state;

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
        {currentPack ? this.renderPack(currentPack) : null}
      </section>
    );
  }
}

MyStickerPacks.propTypes = {
  client: React.PropTypes.object.isRequired
};

export default MyStickerPacks;
