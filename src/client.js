import request from 'request';

class StickerPipeClient {
  constructor(key, userID, baseUrl) {
    Object.assign(this, { key, userID, baseUrl });
  }

  getShop(callback) {
    const options = {
      url: `${this.baseUrl}/shop`,
      headers: {
        ApiKey: this.key,
        Platform: 'JS',
        UserId: this.userID
      }
    };

    request.get(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(null, body);
      } else {
        callback(error);
      }
    });
  }

  getSticker(stickerId, callback) {
    const options = {
      url: `${this.baseUrl}/content/${stickerId}`,
      headers: {
        ApiKey: this.key,
        Platform: 'JS',
        UserId: this.userID
      }
    };

    request.get(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(null, body);
      } else {
        callback(error);
      }
    });
  }
}

export default StickerPipeClient;

/*
  Usage:

  const key = 'yourAPIKey'
  const userId = 'someUserID';
  const endpoint = 'https://api.stickerpipe.com/api/v2';

  const StickerPipeClient = require('./client.js');
  const client = new StickerPipeClient(key, userID, baseUrl);

  client.getShop((err, res) => {
    if(err) throw err;
    console.log(res);
  });

 */
