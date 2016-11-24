'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StickerPipeClient = function () {
  function StickerPipeClient(key, userId, baseUrl) {
    _classCallCheck(this, StickerPipeClient);

    Object.assign(this, { key: key, userId: userId, baseUrl: baseUrl });
  }

  _createClass(StickerPipeClient, [{
    key: 'getMyPacks',
    value: function getMyPacks(callback) {
      var options = {
        url: this.baseUrl + '/shop/my',
        headers: {
          ApiKey: this.key,
          Platform: 'JS',
          UserId: this.userId
        }
      };

      _superagent2.default.withCredentials = false;

      _superagent2.default.get(options.url).set(options.headers).end(callback);
    }
  }, {
    key: 'getShop',
    value: function getShop(callback) {
      var options = {
        url: this.baseUrl + '/shop',
        headers: {
          ApiKey: this.key,
          Platform: 'JS',
          UserId: this.userId
        }
      };

      _superagent2.default.withCredentials = false;

      _superagent2.default.get(options.url).set(options.headers).end(callback);
    }
  }, {
    key: 'getSticker',
    value: function getSticker(stickerId, callback) {
      var options = {
        url: this.baseUrl + '/content/' + stickerId,
        headers: {
          ApiKey: this.key,
          Platform: 'JS',
          UserId: this.userId
        }
      };

      _superagent2.default.withCredentials = false;

      _superagent2.default.get(options.url).set(options.headers).end(callback);
    }
  }, {
    key: 'getPackPreview',
    value: function getPackPreview(packName, callback) {
      var options = {
        url: this.baseUrl + '/packs/' + packName,
        headers: {
          ApiKey: this.key,
          Platform: 'JS',
          UserId: this.userId
        }
      };

      _superagent2.default.withCredentials = false;

      _superagent2.default.get(options.url).set(options.headers).end(callback);
    }
  }, {
    key: 'purchasePack',
    value: function purchasePack(packName, callback) {
      var options = {
        url: this.baseUrl + '/packs/' + packName,
        headers: {
          ApiKey: this.key,
          Platform: 'JS',
          UserId: this.userId
        }
      };

      _superagent2.default.withCredentials = false;

      _superagent2.default.post(options.url).set(options.headers).end(callback);
    }
  }]);

  return StickerPipeClient;
}();

exports.default = StickerPipeClient;
module.exports = exports['default'];