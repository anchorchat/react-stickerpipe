'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function parseResponse(response) {
  if (response && response.data && _typeof(response.data) === 'object') {
    return response.data;
  }

  if (response && response.text && typeof response.text === 'string') {
    try {
      var parsedResponse = JSON.parse(response.text);

      if (parsedResponse && parsedResponse.data && parsedResponse.data instanceof Object === true) {
        return parsedResponse.data;
      }
    } catch (err) {
      console.warn('Error while parsing JSON', err);
    }
  }

  return {};
}

exports.default = parseResponse;
module.exports = exports['default'];