define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _react = require('react');

var React = _react;
var Component = _react.Component;

var _utilCookie = require('./util/cookie');

var defaultCookie = _utilCookie.cookie;

var CreateReport = require('../create/create.report');

var _converterHalModelToStateConverter = require('./converter/halModelToStateConverter');

var defaultHalModelToStateConverter = _converterHalModelToStateConverter.halModelToStateConverter;

var expandableBlockCookieStateEnum = require('./types/expandableBlockCookieStateEnum');

var _typesWorkflowNameEnum = require('./types/workflowNameEnum');

var workflowNameEnum = _typesWorkflowNameEnum.workflowNameEnum;

var _componentsHome = require('./components/Home');

var DefaultHome = _componentsHome.Home;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function onWorkflowPrimaryActionClick(name, url) {
  if (name === workflowNameEnum.REPORT) {
    CreateReport.selectADV();
  } else {
    window.location.href = url;
  }
}

function onWorkflowSecondaryActionClick(url) {
  window.location.href = url;
}

var getHomeApp = exports.getHomeApp = function getHomeApp(Home, halModelToStateConverter, cookie) {
  return (
    /*#__PURE__*/
    function (_Component) {
      _inherits(HomeApp, _Component);

      function HomeApp(props) {
        var _this;

        _classCallCheck(this, HomeApp);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(HomeApp).call(this, props));
        _this.onGroupExpand = _this.onGroupExpand.bind(_assertThisInitialized(_this));
        _this.state = halModelToStateConverter(props.recentResources, props.contentReferences, props.workFlows);
        return _this;
      }

      _createClass(HomeApp, [{
        key: "onGroupExpand",
        value: function onGroupExpand(isExpanded, groupId) {
          cookie.set(groupId, !isExpanded ? expandableBlockCookieStateEnum.EXPANDED : expandableBlockCookieStateEnum.COLLAPSED);
          this.setState(halModelToStateConverter(this.props.recentResources, this.props.contentReferences, this.props.workFlows));
        }
      }, {
        key: "render",
        value: function render() {
          return React.createElement(Home, {
            onGroupExpand: this.onGroupExpand,
            onWorkflowPrimaryActionClick: onWorkflowPrimaryActionClick,
            onWorkflowSecondaryActionClick: onWorkflowSecondaryActionClick,
            sidebarBlocks: this.state.sidebarBlocks,
            workflows: this.state.workflows
          });
        }
      }]);

      return HomeApp;
    }(Component)
  );
};

var HomeApp = exports.HomeApp = getHomeApp(DefaultHome, defaultHalModelToStateConverter, defaultCookie);

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});