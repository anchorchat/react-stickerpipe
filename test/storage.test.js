const chai = require('chai');
const sinon = require('sinon');
const Storage = require('../dist/storage.js');

describe('Storage', function() {

  before(function () {
    localStorage = {
      getItem(key) {
        return key
      },
      setItem(key, value) {
        return { key, value };
      }
    };
    sinon.stub(console, 'warn');
    sinon.spy(localStorage, 'getItem');
    sinon.spy(localStorage, 'setItem');
    sinon.spy(JSON, 'parse');
    sinon.spy(JSON, 'stringify');
  });

  after(function () {
    console.warn.restore();
    localStorage.getItem.restore();
    localStorage.setItem.restore();
    JSON.parse.restore();
    JSON.stringify.restore();
  });

  describe('storePack', function() {

    it('should store sticker pack', function() {
      const storage = new Storage('mocha');

      const data = {
        name: 'mocha-pack',
        title: 'mochaPack',
        stickers: [
          {
            image: 'https://static.stickerpipe.com/sticker/wowspacex73/2280_mdpi.png?scl=1039&sh=ir8SOb8hPXPNgxw5zszd4Q',
            content_id: 1234
          },
          {
            image: 'https://static.stickerpipe.com/sticker/wowspacex73/2279_mdpi.png?scl=1039&sh=tNwEVfpIJd8ODt_qsA-2Ag',
            content_id: 12345
          }
        ]
      };
      const value = JSON.stringify(data);

      storage.storePack(data.name, data.title, data.stickers);
      chai.assert(JSON.stringify.withArgs(data).called, 'Did not call JSON.stringify');
      chai.assert(localStorage.setItem.withArgs('mocha-mocha-pack', value).called, 'Did not call localStorage.setItem');
    });

  });

  describe('getPack', function() {

    it('should return null if pack is not stored', function() {
      const storage = new Storage('mocha');

      const pack = storage.getPack('test-pack');

      chai.assert(localStorage.getItem.withArgs('mocha-test-pack').called, 'Did not call localStorage.getItem');
      chai.assert(JSON.parse.withArgs('mocha-test-pack').called, 'Did not call JSON.parse');
      chai.assert(console.warn.called, 'Did not call console.warn');
      chai.assert.equal(null, pack, 'Did not return null');
    });

  });

});
