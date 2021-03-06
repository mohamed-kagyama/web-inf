define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

var _ResourceLink = require('./ResourceLink');

var DefaultResourceLink = _ResourceLink.ResourceLink;

var _tooltipTooltip = require('./tooltip/tooltip');

var defaultTooltip = _tooltipTooltip.tooltip;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createResourceLinkWithTooltip = function createResourceLinkWithTooltip(tooltip, ResourceLink) {
  var _temp;

  return _temp =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(ResourceLinkWithTooltip, _React$Component);

    function ResourceLinkWithTooltip(props) {
      var _this;

      _classCallCheck(this, ResourceLinkWithTooltip);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ResourceLinkWithTooltip).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "liRef", void 0);

      _this.liRef = React.createRef();
      return _this;
    }

    _createClass(ResourceLinkWithTooltip, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        tooltip({
          path: this.props.path,
          description: this.props.description,
          el: this.liRef.current
        });
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement(ResourceLink, _extends({
          ref: this.liRef
        }, this.props));
      }
    }]);

    return ResourceLinkWithTooltip;
  }(React.Component), _temp;
};

var ResourceLinkWithTooltip = createResourceLinkWithTooltip(defaultTooltip, DefaultResourceLink);
exports.createResourceLinkWithTooltip = createResourceLinkWithTooltip;
exports.ResourceLinkWithTooltip = ResourceLinkWithTooltip;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});