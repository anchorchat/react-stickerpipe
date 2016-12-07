const chai = require('chai');
const sinon = require('sinon');
const parseResponse = require('../dist/parse-response');

describe('parseResponse', function() {

  before(function () {
    sinon.stub(console, 'warn');
  });

  after(function () {
    console.warn.restore();
  });

  it('should return null if called without arguments', function() {
    const response = parseResponse();

    chai.assert(console.warn.called, 'Did not call console.warn');
    chai.assert.equal(null , response, 'Did not return null');
  });

  it('should return null if response does not contain content or text', function() {
    const data = {
      data: {
        test: 'test'
      }
    };

    const response = {
      data: JSON.stringify(data)
    };

    const parsedResponse = parseResponse(response);

    chai.assert(console.warn.called, 'Did not call console.warn');
    chai.assert.equal(null , parsedResponse, 'Did not return null');
  });

  it('should return null if response.content does not contain data', function () {
    const content = {
      test: {
        test: 'test'
      }
    };

    const response = {
      content: JSON.stringify(content)
    };

    chai.assert(console.warn.called, 'Did not call console.warn');
    chai.assert.equal(null , parseResponse(response), 'Did not return null');
  });

  it('should return null if response.content.data instanceof Object === false', function () {
    const content = {
      test: 'test'
    };

    const response = {
      content: JSON.stringify(content)
    };

    chai.assert(console.warn.called, 'Did not call console.warn');
    chai.assert.equal(null , parseResponse(response), 'Did not return null');
  });

  it('should parse and return response.content', function() {
    const content = {
      data: {
        test: 'test'
      }
    };

    const response = {
      content: JSON.stringify(content)
    };

    chai.assert.deepEqual(content.data, parseResponse(response), 'Did not parse response.content');
  });

  it('should return null if response.text does not contain data', function () {
    const text = {
      test: {
        test: 'test'
      }
    };

    const response = {
      text: JSON.stringify(text)
    };

    chai.assert(console.warn.called, 'Did not call console.warn');
    chai.assert.equal(null , parseResponse(response), 'Did not return null');
  });

  it('should return null if response.text.data instanceof Object === false', function () {
    const text = {
      test: 'test'
    };

    const response = {
      text: JSON.stringify(text)
    };

    chai.assert(console.warn.called, 'Did not call console.warn');
    chai.assert.equal(null , parseResponse(response), 'Did not return null');
  });

  it('should parse and return response.text', function() {
    const text = {
      data: {
        test: 'test'
      }
    };

    const response = {
      text: JSON.stringify(text)
    };

    chai.assert.deepEqual(text.data, parseResponse(response), 'Did not parse response.content');
  });

});
