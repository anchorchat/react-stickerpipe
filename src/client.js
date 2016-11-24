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

    request.withCredentials = false;

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

    request.withCredentials = false;

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

    request.withCredentials = false;

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

    request.withCredentials = false;

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

    request.withCredentials = false;

    request
      .post(options.url)
      .set(options.headers)
      .end(callback);
  }
}

export default StickerPipeClient;
