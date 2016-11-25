'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

var _myStickerPacks = require('./my-sticker-packs');

var _myStickerPacks2 = _interopRequireDefault(_myStickerPacks);

var _stickerShop = require('./sticker-shop');

var _stickerShop2 = _interopRequireDefault(_stickerShop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StickerMenu = function (_Component) {
  _inherits(StickerMenu, _Component);

  function StickerMenu(props) {
    _classCallCheck(this, StickerMenu);

    var _this = _possibleConstructorReturn(this, (StickerMenu.__proto__ || Object.getPrototypeOf(StickerMenu)).call(this, props));

    _this.state = {
      stickerPacks: []
    };

    var client = void 0;

    if (props && props.client) {
      client = props.client;
    }

    if (props && !props.client && props.apiKey) {
      client = new _client2.default(props.apiKey, props.userId, 'https://api.stickerpipe.com/api/v2');
    }

    _this.client = client;
    _this.storage = new _storage2.default(props.userId);

    _this.getMyPacks = _this.getMyPacks.bind(_this);
    return _this;
  }

  _createClass(StickerMenu, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        client: this.client,
        storage: this.storage
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getMyPacks();
    }
  }, {
    key: 'getMyPacks',
    value: function getMyPacks() {
      var _this2 = this;

      this.client.getMyPacks(function (err, res) {
        if (err) {
          console.log(err);

          return false;
        }

        var response = JSON.parse(res.text);
        var stickerPacks = response.data;

        _this2.setState({
          stickerPacks: stickerPacks
        });

        return false;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var sendSticker = this.props.sendSticker;
      var stickerPacks = this.state.stickerPacks;


      return _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(_myStickerPacks2.default, { sendSticker: sendSticker, stickerPacks: stickerPacks }),
        _react2.default.createElement(_stickerShop2.default, { getMyPacks: this.getMyPacks })
      );
    }
  }]);

  return StickerMenu;
}(_react.Component);

StickerMenu.propTypes = {
  apiKey: function apiKey(props, propName) {
    if (!props.client && !props[propName]) {
      return new Error('Prop ' + propName + ' is required when prop client is not specified!');
    }

    return null;
  },
  userId: _react2.default.PropTypes.string.isRequired,
  sendSticker: _react2.default.PropTypes.func.isRequired,
  client: _react2.default.PropTypes.shape({
    getMyPacks: _react2.default.PropTypes.func.isRequired,
    getShop: _react2.default.PropTypes.func.isRequired,
    getPackPreview: _react2.default.PropTypes.func.isRequired,
    purchasePack: _react2.default.PropTypes.func.isRequired
  })
};

StickerMenu.childContextTypes = {
  client: _react2.default.PropTypes.shape({
    getMyPacks: _react2.default.PropTypes.func.isRequired,
    purchasePack: _react2.default.PropTypes.func.isRequired
  }).isRequired,
  storage: _react2.default.PropTypes.shape({
    storePack: _react2.default.PropTypes.func.isRequired,
    getPack: _react2.default.PropTypes.func.isRequired
  }).isRequired
};

exports.default = StickerMenu;
module.exports = exports['default'];