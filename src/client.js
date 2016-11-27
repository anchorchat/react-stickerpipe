import request from 'superagent';

function performRequest(method, url, callback) {
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

class StickerPipeClient {
  constructor(apiKey, userId, baseUrl) {
    Object.assign(this, { apiKey, userId, baseUrl });
  }

  getMyPacks(callback) {
    performRequest('get', `${this.baseUrl}/shop/my`, callback);
  }

  getShop(callback) {
    performRequest('get', `${this.baseUrl}/shop`, callback);
  }

  getPackPreview(packName, callback) {
    performRequest('get', `${this.baseUrl}/packs/${packName}`, callback);
  }

  purchasePack(packName, callback) {
    performRequest('post', `${this.baseUrl}/packs/${packName}`, callback);
  }
}

export default StickerPipeClient;
