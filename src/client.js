import request from 'superagent';

class StickerPipeClient {
  constructor(key, userId, baseUrl) {
    Object.assign(this, { key, userId, baseUrl });
  }

  _performRequest(url, method, callback) {
    const options = {
      url,
      headers: {
        ApiKey: this.key,
        Platform: 'JS',
        UserId: this.userId
      }
    };

    request
      [method](options.url)
      .set(options.headers)
      .end(callback);
  }

  getMyPacks(callback) {
    this._performRequest(`${this.baseUrl}/shop/my`, 'get', callback);
  }

  getShop(callback) {
    this._performRequest(`${this.baseUrl}/shop`, 'get', callback);
  }

  getPackPreview(packName, callback) {
    this._performRequest(`${this.baseUrl}/packs/${packName}`, 'get', callback);
  }

  purchasePack(packName, callback) {
    this._performRequest(`${this.baseUrl}/packs/${packName}`, 'post', callback);
  }
}

export default StickerPipeClient;
