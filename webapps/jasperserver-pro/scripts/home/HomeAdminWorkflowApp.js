define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _react = require('react');

var React = _react;
var Component = _react.Component;

var _converterHomeAdminWorkflowsConverter = require('./converter/homeAdminWorkflowsConverter');

var adminWorkflowsConverter = _converterHomeAdminWorkflowsConverter.adminWorkflowsConverter;

var _componentsWorkflowsCategory = require('./components/WorkflowsCategory');

var WorkflowsCategory = _componentsWorkflowsCategory.WorkflowsCategory;

var _componentsWorkflow = require('./components/Workflow');

var Workflow = _componentsWorkflow.Workflow;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function onWorkflowPrimaryActionClick(name, url) {
  window.location.href = url;
}

function onWorkflowSecondaryActionClick(url) {
  window.location.href = url;
}

var HomeAdminWorkflowApp =
/*#__PURE__*/
function (_Component) {
  _inherits(HomeAdminWorkflowApp, _Component);

  function HomeAdminWorkflowApp() {
    _classCallCheck(this, HomeAdminWorkflowApp);

    return _possibleConstructorReturn(this, _getPrototypeOf(HomeAdminWorkflowApp).apply(this, arguments));
  }

  _createClass(HomeAdminWorkflowApp, [{
    key: "render",
    value: function render() {
      var workflowCategory = adminWorkflowsConverter(this.props.workflows);
      return React.createElement("div", {
        className: "homeAdmin"
      }, React.createElement(WorkflowsCategory, {
        key: workflowCategory.title,
        title: workflowCategory.title,
        categoryClass: workflowCategory.categoryClass
      }, workflowCategory.items.map(function (item) {
        return React.createElement(Workflow, _extends({
          key: item.title
        }, item, {
          onPrimaryActionClick: onWorkflowPrimaryActionClick,
          onSecondaryActionClick: onWorkflowSecondaryActionClick
        }));
      })));
    }
  }]);

  return HomeAdminWorkflowApp;
}(Component);

module.exports = HomeAdminWorkflowApp;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});