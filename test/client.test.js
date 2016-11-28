const chai = require('chai');
const sinon = require('sinon');
const StickerPipeClient = require('../dist/client.js');

describe('StickerPipeClient', function () {

  describe('getMyPacks', function () {

    before(function () {
      client = new StickerPipeClient('mochaKey', 'mocha', 'mochaUrl');
    });

    it('should call performRequest', function () {
      const callback = () => {};
      sinon.stub(client, 'performRequest');

      client.getMyPacks(callback);

      chai.assert(client.performRequest.withArgs('get', 'mochaUrl/shop/my', callback).called, 'Did not call performRequest');

      client.performRequest.restore();
    });

  });

});
