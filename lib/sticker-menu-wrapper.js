'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StickerPipe = function (_Component) {
  _inherits(StickerPipe, _Component);

  function StickerPipe(props) {
    _classCallCheck(this, StickerPipe);

    var _this = _possibleConstructorReturn(this, (StickerPipe.__proto__ || Object.getPrototypeOf(StickerPipe)).call(this, props));

    _this.client = new _client2.default(props.apiKey, props.userId, 'https://api.stickerpipe.com/api/v2');
    _this.storage = new _storage2.default(props.userId);
    return _this;
  }

  return StickerPipe;
}(_react.Component);

StickerPipe.propTypes = {
  apiKey: _react2.default.PropTypes.string.isRequired,
  userId: _react2.default.PropTypes.string.isRequired
};

exports.default = StickerPipe;
module.exports = exports['default'];