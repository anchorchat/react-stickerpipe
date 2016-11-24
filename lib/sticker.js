'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Sticker(_ref) {
  var src = _ref.src,
      onClick = _ref.onClick;

  var style = {
    sticker: {
      width: '50px',
      cursor: 'pointer'
    }
  };

  return _react2.default.createElement('img', { onClick: onClick, style: style.sticker, src: src, role: 'presentation' });
}

Sticker.propTypes = {
  src: _react2.default.PropTypes.string.isRequired,
  onClick: _react2.default.PropTypes.func
};

exports.default = Sticker;
module.exports = exports['default'];