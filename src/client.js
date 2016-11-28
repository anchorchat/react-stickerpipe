import request from 'superagent';

class StickerPipeClient {
  constructor(apiKey, userId, baseUrl) {
    Object.assign(this, { apiKey, userId, baseUrl });
  }

  performRequest(method, url, callback) {
    const options = {
      url,
      headers: {
        ApiKey: this.apiKey,
        Platform: 'JS',
        UserId: this.userId
      }
    };

    request[method](options.url)
      .set(options.headers)
      .end(callback);
  }

  getMyPacks(callback) {
    this.performRequest('get', `${this.baseUrl}/shop/my`, callback);
  }

  getShop(callback) {
    this.performRequest('get', `${this.baseUrl}/shop`, callback);
  }

  getPackPreview(packName, callback) {
    this.performRequest('get', `${this.baseUrl}/packs/${packName}`, callback);
  }

  purchasePack(packName, callback) {
    this.performRequest('post', `${this.baseUrl}/packs/${packName}`, callback);
  }
}

export default StickerPipeClient;
