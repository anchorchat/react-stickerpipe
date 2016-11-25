import request from 'superagent';

function performRequest(url, method, callback) {
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

class StickerPipeClient {
  constructor(key, userId, baseUrl) {
    Object.assign(this, { key, userId, baseUrl });
  }

  getMyPacks(callback) {
    performRequest(`${this.baseUrl}/shop/my`, 'get', callback);
  }

  getShop(callback) {
    performRequest(`${this.baseUrl}/shop`, 'get', callback);
  }

  getPackPreview(packName, callback) {
    performRequest(`${this.baseUrl}/packs/${packName}`, 'get', callback);
  }

  purchasePack(packName, callback) {
    performRequest(`${this.baseUrl}/packs/${packName}`, 'post', callback);
  }
}

export default StickerPipeClient;
