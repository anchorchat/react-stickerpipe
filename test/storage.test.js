const chai = require('chai');
const sinon = require('sinon');
const Storage = require('../dist/storage.js');

describe('Storage', function() {

  beforeEach(function () {
    localStorage = {
      getItem(key) {
        return key
      }
    };
    sinon.stub(console, 'warn');
    sinon.spy(localStorage, 'getItem');
    sinon.spy(JSON, 'parse');
  });

  after(function () {
    console.warn.restore();
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
