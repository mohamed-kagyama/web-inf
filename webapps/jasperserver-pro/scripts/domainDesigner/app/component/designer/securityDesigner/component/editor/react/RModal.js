define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

var ReactDOM = require('react-dom');

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var i18n = require("bundle!DomainDesignerBundle"); // eslint-disable-line no-undef


var SAFE_MARGIN = 30; // Used to keep always a portion on the dialog inside the window area.

var RModal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RModal, _React$Component);

  function RModal(props) {
    var _this;

    _classCallCheck(this, RModal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RModal).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "overlayDiv", void 0);

    _defineProperty(_assertThisInitialized(_this), "modalDiv", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      top: 0,
      left: 0,
      dragging: false,
      lastPosition: {
        x: 0,
        y: 0
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      // Let's calculate the proper position of the modal on the screen...
      _this.updateModalRect(); // Center the dialog if it has been just opened.


      window.addEventListener('mousemove', _this.onMouseMove);
      window.addEventListener('mouseup', _this.onMouseUp);
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps) {
      if (_this.modalDiv.current // if we actually have a dialog on screen
      && _this.props.open // which we have just opened...
      && _this.props.open !== prevProps.open) {
        _this.updateModalRect();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "updateModalRect", function () {
      var center = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (!_this.overlayDiv.current || !_this.modalDiv.current) {
        return;
      }

      var overlayRect = _this.overlayDiv.current.getBoundingClientRect();

      var modalRect = _this.modalDiv.current.getBoundingClientRect(); // If the window must be centered, let's recalculate the center...


      if (center) {
        _this.setState({
          top: (overlayRect.height - modalRect.height) / 2,
          left: (overlayRect.width - modalRect.width) / 2
        });

        return;
      }

      var _this$state = _this.state,
          top = _this$state.top,
          left = _this$state.left;

      if (top > overlayRect.height) {
        top = overlayRect.height - SAFE_MARGIN;
      }

      if (left > overlayRect.width) {
        left = overlayRect.width - SAFE_MARGIN;
      }

      _this.setState({
        left: left,
        top: top
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function (e) {
      _this.stopEventPropagation(e);

      _this.setState({
        dragging: true,
        lastPosition: {
          x: e.pageX,
          y: e.pageY
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseMove", function (e) {
      if (!_this.state.dragging) {
        return;
      }

      _this.stopEventPropagation(e);

      var lastPosition = _this.state.lastPosition; // Calculate delta

      var delta = {
        x: e.pageX - lastPosition.x,
        y: e.pageY - lastPosition.y
      }; // Apply the delta...

      delta = _this.moveOf(delta); // Update the state...

      _this.setState({
        lastPosition: {
          x: lastPosition.x + delta.x,
          y: lastPosition.y + delta.y
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function (e) {
      _this.setState({
        dragging: false
      });

      _this.stopEventPropagation(e);
    });

    _defineProperty(_assertThisInitialized(_this), "moveOf", function (delta) {
      if (delta.x === 0 && delta.y === 0) {
        return delta; // Nothing to do...
      }

      var overlayRect = _this.overlayDiv.current.getBoundingClientRect();

      var modalRect = _this.modalDiv.current.getBoundingClientRect();

      var windowHeight = overlayRect.height;
      var windowWidth = overlayRect.width;
      var _this$state2 = _this.state,
          left = _this$state2.left,
          top = _this$state2.top; // The window left should not be less than

      var newLeft = Math.max(-modalRect.width + SAFE_MARGIN, Math.min(left + delta.x, windowWidth - SAFE_MARGIN));
      var newTop = Math.max(0, Math.min(top + delta.y, windowHeight - SAFE_MARGIN));
      var realDelta = {
        x: newLeft - left,
        y: newTop - top
      };

      _this.setState({
        top: newTop,
        left: newLeft
      });

      return realDelta;
    });

    _defineProperty(_assertThisInitialized(_this), "stopEventPropagation", function (e) {
      e.stopPropagation();
      e.preventDefault();
    });

    _this.overlayDiv = React.createRef();
    _this.modalDiv = React.createRef();
    return _this;
  }
  /**
   *
   *
   * @memberof RModal
   */


  _createClass(RModal, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
    }
  }, {
    key: "render",
    value: function render() {
      var modalWidth = typeof this.props.width !== 'undefined' ? this.props.width : 500;
      return this.props.open ? ReactDOM.createPortal(React.createElement("div", {
        className: "jr-mOverlay jr",
        style: {
          zIndex: 4000,
          display: 'block',
          overflow: 'hidden'
        },
        ref: this.overlayDiv
      }, React.createElement("div", {
        className: "jr-mDialog jr-mDialogModal jr jr-mDialogWarning",
        style: {
          position: 'absolute',
          top: this.state.top,
          left: this.state.left,
          width: modalWidth
        },
        ref: this.modalDiv
      }, React.createElement("div", {
        className: "jr-mDialog-header jr",
        onMouseDown: this.onMouseDown
      }, React.createElement("h1", {
        className: "jr-mDialog-header-title jr"
      }, i18n['domain.designer.dialog.title.warning'])), this.props.children)), document.body) : null;
    }
  }]);

  return RModal;
}(React.Component);

module.exports = RModal;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});