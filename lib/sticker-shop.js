'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sticker = require('./sticker');

var _sticker2 = _interopRequireDefault(_sticker);

var _stickerPackPreview = require('./sticker-pack-preview');

var _stickerPackPreview2 = _interopRequireDefault(_stickerPackPreview);

var _parseResponse = require('./parse-response');

var _parseResponse2 = _interopRequireDefault(_parseResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StickerShop = function (_Component) {
  _inherits(StickerShop, _Component);

  function StickerShop() {
    _classCallCheck(this, StickerShop);

    var _this = _possibleConstructorReturn(this, (StickerShop.__proto__ || Object.getPrototypeOf(StickerShop)).call(this));

    _this.state = {
      preview: null,
      stickerPacks: []
    };

    _this.previewPack = _this.previewPack.bind(_this);
    _this.onPurchase = _this.onPurchase.bind(_this);
    return _this;
  }

  _createClass(StickerShop, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var client = this.context.client;


      client.getShop(function (err, res) {
        if (err) {
          console.log(err);

          return false;
        }

        var stickerPacks = (0, _parseResponse2.default)(res);

        _this2.setState({
          stickerPacks: stickerPacks
        });

        return false;
      });
    }
  }, {
    key: 'onPurchase',
    value: function onPurchase() {
      var getMyPacks = this.props.getMyPacks;


      getMyPacks();
      this.setState({
        preview: null
      });
    }
  }, {
    key: 'previewPack',
    value: function previewPack(packName) {
      var _this3 = this;

      var client = this.context.client;


      this.setState({
        loading: true
      });

      client.getPackPreview(packName, function (err, res) {
        if (err) {
          console.log(err);

          return false;
        }

        var preview = (0, _parseResponse2.default)(res);

        _this3.setState({
          preview: preview
        });

        return false;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state = this.state,
          preview = _state.preview,
          stickerPacks = _state.stickerPacks;


      return _react2.default.createElement(
        'section',
        { className: 'sticker-shop' },
        _react2.default.createElement(
          'h1',
          null,
          'Sticker Shop'
        ),
        stickerPacks.length > 0 ? stickerPacks.map(function (stickerPack) {
          return _react2.default.createElement(_sticker2.default, {
            key: stickerPack.pack_name,
            onClick: function onClick() {
              return _this4.previewPack(stickerPack.pack_name);
            },
            src: stickerPack.main_icon.mdpi
          });
        }) : null,
        preview ? _react2.default.createElement(_stickerPackPreview2.default, { preview: preview, onPurchase: this.onPurchase }) : null
      );
    }
  }]);

  return StickerShop;
}(_react.Component);

StickerShop.propTypes = {
  getMyPacks: _react2.default.PropTypes.func.isRequired
};

StickerShop.contextTypes = {
  client: _react2.default.PropTypes.shape({
    getMyPacks: _react2.default.PropTypes.func.isRequired,
    purchasePack: _react2.default.PropTypes.func.isRequired
  }).isRequired
};

exports.default = StickerShop;
module.exports = exports['default'];