'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function parseResponse(response) {
  var text = void 0;

  if (response && response.content && typeof response.content === 'string') {
    text = response.content;
  }

  if (response && response.text && typeof response.text === 'string') {
    text = response.text;
  }

  try {
    var parsedResponse = JSON.parse(text);

    if (parsedResponse && parsedResponse.data && parsedResponse.data instanceof Object === true) {
      return parsedResponse.data;
    }
  } catch (err) {
    console.warn('Error while parsing JSON', err);
  }

  return {};
}

exports.default = parseResponse;
module.exports = exports['default'];