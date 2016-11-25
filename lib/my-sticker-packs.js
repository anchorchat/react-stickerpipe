'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stickerPack = require('./sticker-pack');

var _stickerPack2 = _interopRequireDefault(_stickerPack);

var _sticker = require('./sticker');

var _sticker2 = _interopRequireDefault(_sticker);

var _parseResponse = require('./parse-response');

var _parseResponse2 = _interopRequireDefault(_parseResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyStickerPacks = function (_Component) {
  _inherits(MyStickerPacks, _Component);

  function MyStickerPacks() {
    _classCallCheck(this, MyStickerPacks);

    var _this = _possibleConstructorReturn(this, (MyStickerPacks.__proto__ || Object.getPrototypeOf(MyStickerPacks)).call(this));

    _this.state = {
      stickerPacks: [],
      pack: null
    };

    _this.showPack = _this.showPack.bind(_this);
    return _this;
  }

  _createClass(MyStickerPacks, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var client = this.context.client;


      client.getMyPacks(function (err, res) {
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
    key: 'showPack',
    value: function showPack(packName) {
      var _this3 = this;

      var _context = this.context,
          client = _context.client,
          storage = _context.storage;


      var storedPack = storage.getPack(packName);

      if (storedPack) {
        this.setState({
          pack: storedPack
        });

        return false;
      }

      client.purchasePack(packName, function (err, res) {
        if (err) {
          console.log(err);

          return false;
        }

        var pack = (0, _parseResponse2.default)(res);

        storage.storePack(pack.pack_name, pack.title, pack.stickers);

        _this3.setState({
          pack: pack
        });

        return false;
      });

      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var pack = this.state.pack;
      var _props = this.props,
          sendSticker = _props.sendSticker,
          stickerPacks = _props.stickerPacks;


      return _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'My Packs'
        ),
        !stickerPacks.lenght > 0 ? stickerPacks.map(function (stickerPack) {
          return _react2.default.createElement(_sticker2.default, {
            key: stickerPack.pack_name,
            src: stickerPack.main_icon.mdpi,
            onClick: function onClick() {
              return _this4.showPack(stickerPack.pack_name);
            }
          });
        }) : _react2.default.createElement(
          'p',
          null,
          'Loading...'
        ),
        pack ? _react2.default.createElement(_stickerPack2.default, { pack: pack, sendSticker: sendSticker }) : null
      );
    }
  }]);

  return MyStickerPacks;
}(_react.Component);

MyStickerPacks.propTypes = {
  sendSticker: _react2.default.PropTypes.func.isRequired,
  stickerPacks: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    pack_name: _react2.default.PropTypes.string.isRequired,
    main_icon: _react2.default.PropTypes.shape({
      mdpi: _react2.default.PropTypes.string.isRequired,
      hdpi: _react2.default.PropTypes.string.isRequired,
      xhdpi: _react2.default.PropTypes.string.isRequired,
      xxhdpi: _react2.default.PropTypes.string.isRequired
    }).isRequired
  })).isRequired
};

MyStickerPacks.contextTypes = {
  client: _react2.default.PropTypes.shape({
    getMyPacks: _react2.default.PropTypes.func.isRequired,
    purchasePack: _react2.default.PropTypes.func.isRequired
  }).isRequired,
  storage: _react2.default.PropTypes.shape({
    storePack: _react2.default.PropTypes.func.isRequired,
    getPack: _react2.default.PropTypes.func.isRequired
  }).isRequired
};

exports.default = MyStickerPacks;
module.exports = exports['default'];