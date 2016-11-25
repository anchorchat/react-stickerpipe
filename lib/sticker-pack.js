'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sticker = require('./sticker');

var _sticker2 = _interopRequireDefault(_sticker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StickerPack = function (_Component) {
  _inherits(StickerPack, _Component);

  function StickerPack() {
    _classCallCheck(this, StickerPack);

    var _this = _possibleConstructorReturn(this, (StickerPack.__proto__ || Object.getPrototypeOf(StickerPack)).call(this));

    _this.sendSticker = _this.sendSticker.bind(_this);
    return _this;
  }

  _createClass(StickerPack, [{
    key: 'sendSticker',
    value: function sendSticker(sticker) {
      var sendSticker = this.props.sendSticker;


      sendSticker(sticker);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var pack = this.props.pack;


      return _react2.default.createElement(
        'section',
        { className: 'sticker-pack' },
        _react2.default.createElement(
          'h1',
          null,
          pack.title
        ),
        pack.stickers.map(function (sticker) {
          return _react2.default.createElement(_sticker2.default, {
            key: sticker.content_id,
            src: sticker.image.mdpi,
            onClick: function onClick() {
              return _this2.sendSticker(sticker);
            }
          });
        })
      );
    }
  }]);

  return StickerPack;
}(_react.Component);

StickerPack.propTypes = {
  pack: _react2.default.PropTypes.shape({
    title: _react2.default.PropTypes.string.isRequired,
    stickers: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
      content_id: _react2.default.PropTypes.number.isRequired,
      image: _react2.default.PropTypes.shape({
        mdpi: _react2.default.PropTypes.string.isRequired,
        hdpi: _react2.default.PropTypes.string.isRequired,
        xhdpi: _react2.default.PropTypes.string.isRequired,
        xxhdpi: _react2.default.PropTypes.string.isRequired
      }).isRequired
    }).isRequired).isRequired
  }).isRequired,
  sendSticker: _react2.default.PropTypes.func.isRequired
};

exports.default = StickerPack;
module.exports = exports['default'];