import request from 'superagent';

class StickerPipeClient {
  constructor(key, userId, baseUrl) {
    Object.assign(this, { key, userId, baseUrl });
  }

  getMyPacks(callback) {
    const options = {
      url: `${this.baseUrl}/shop/my`,
      headers: {
        ApiKey: this.key,
        Platform: 'JS',
        UserId: this.userId
      }
    };

    request
      .get(options.url)
      .set(options.headers)
      .end(callback);
  }

  getShop(callback) {
    const options = {
      url: `${this.baseUrl}/shop`,
      headers: {
        ApiKey: this.key,
        Platform: 'JS',
        UserId: this.userId
      }
    };

    request
      .get(options.url)
      .set(options.headers)
      .end(callback);
  }

  getSticker(stickerId, callback) {
    const options = {
      url: `${this.baseUrl}/content/${stickerId}`,
      headers: {
        ApiKey: this.key,
        Platform: 'JS',
        UserId: this.userId
      }
    };

    request
      .get(options.url)
      .set(options.headers)
      .end(callback);
  }

  getPackPreview(packName, callback) {
    const options = {
      url: `${this.baseUrl}/packs/${packName}`,
      headers: {
        ApiKey: this.key,
        Platform: 'JS',
        UserId: this.userId
      }
    };

    request
      .get(options.url)
      .set(options.headers)
      .end(callback);
  }

  purchasePack(packName, callback) {
    const options = {
      url: `${this.baseUrl}/packs/${packName}`,
      headers: {
        ApiKey: this.key,
        Platform: 'JS',
        UserId: this.userId
      }
    };

    request
      .post(options.url)
      .set(options.headers)
      .end(callback);
  }

  storePack(packName, packTitle, packStickers) {
    const stickers = packStickers.map(packSticker => (
      {
        srcset: packSticker.image,
        stickerId: packSticker.content_id
      }
    ));

    try {
      const key = `${this.userId}-${packName}`;
      const data = {
        name: packName,
        title: packTitle,
        stickers
      };

      const value = JSON.stringify(data);

      localStorage.setItem(key, value);
    } catch (err) {
      console.warn('Error while saving to localStorage.', err);
    }
  }
}

export default StickerPipeClient;
