'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
  function Storage(userId) {
    _classCallCheck(this, Storage);

    Object.assign(this, { userId: userId });
  }

  _createClass(Storage, [{
    key: 'storePack',
    value: function storePack(packName, packTitle, packStickers) {
      var stickers = packStickers.map(function (packSticker) {
        return {
          image: packSticker.image,
          content_id: packSticker.content_id
        };
      });

      try {
        var key = this.userId + '-' + packName;
        var data = {
          name: packName,
          title: packTitle,
          stickers: stickers
        };

        var value = JSON.stringify(data);

        localStorage.setItem(key, value);
      } catch (err) {
        console.warn('Error while saving to localStorage.', err);
      }
    }
  }, {
    key: 'getPack',
    value: function getPack(packName) {
      try {
        var key = this.userId + '-' + packName;

        var storedPack = JSON.parse(localStorage.getItem(key));

        return storedPack;
      } catch (err) {
        console.warn('Error while retrieving item from localStorage.', err);
      }

      return null;
    }
  }]);

  return Storage;
}();

exports.default = Storage;
module.exports = exports['default'];