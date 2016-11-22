'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');
require('dotenv').config({ silent: true });

var StickerPipeClient = function () {
  function StickerPipeClient(key, userID, baseUrl) {
    _classCallCheck(this, StickerPipeClient);

    Object.assign(this, { key: key, userID: userID, baseUrl: baseUrl });
  }

  _createClass(StickerPipeClient, [{
    key: 'getShop',
    value: function getShop(callback) {
      request.get({
        url: this.baseUrl + '/shop',
        headers: {
          ApiKey: this.key,
          Platform: 'JS',
          UserId: this.userID
        }
      }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          callback(null, body);
        } else {
          callback(error);
        }
      });
    }
  }]);

  return StickerPipeClient;
}();

/*
  Usage:

  const key = process.env.STICKER_PIPE_KEY;
  const userId = process.env.USER_ID;
  const endpoint = 'https://api.stickerpipe.com/api/v2';

  const StickerPipeClient = require('./client.js');
  const client = new StickerPipeClient(key, userID, baseUrl);

  client.getShop((err, res) => {
    if(err) throw err;
    console.log(res);
  });

 */


exports.default = StickerPipeClient;
module.exports = exports['default'];