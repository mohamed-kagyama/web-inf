define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _react = require('react');

var React = _react;
var Component = _react.Component;

var _baseTooltipWorkflowTooltip = require('./base/tooltip/workflowTooltip');

var workflowTooltip = _baseTooltipWorkflowTooltip.workflowTooltip;

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

var createWorkflow = function createWorkflow(tooltip) {
  var _temp;

  return _temp =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Workflow, _Component);

    function Workflow(props) {
      var _this;

      _classCallCheck(this, Workflow);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Workflow).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "secondaryActionButtonRef", void 0);

      _this.secondaryActionButtonRef = React.createRef();
      return _this;
    }

    _createClass(Workflow, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        tooltip(this.props.secondaryActionLabel, this.secondaryActionButtonRef.current);
      }
    }, {
      key: "render",
      value: function render() {
        var props = this.props;
        var name = props.name,
            title = props.title,
            description = props.description,
            primaryActionLabel = props.primaryActionLabel,
            primaryActionUrl = props.primaryActionUrl,
            secondaryActionLabel = props.secondaryActionLabel,
            secondaryActionUrl = props.secondaryActionUrl,
            onPrimaryActionClick = props.onPrimaryActionClick,
            onSecondaryActionClick = props.onSecondaryActionClick,
            primaryActionAriaLabel = props.primaryActionAriaLabel,
            secondaryActionAriaLabel = props.secondaryActionAriaLabel;
        return React.createElement("li", {
          className: "workflow",
          "js-navtype": "workflowCard",
          tabIndex: 0
        }, React.createElement("div", {
          className: "workflow-iconContainer"
        }, React.createElement("div", {
          className: props.iconClass
        }, secondaryActionUrl && React.createElement("button", {
          ref: this.secondaryActionButtonRef,
          onClick: function onClick() {
            return onSecondaryActionClick(secondaryActionUrl);
          },
          type: "button",
          className: "button",
          "aria-label": secondaryActionAriaLabel,
          role: "link",
          "js-navtype": "workflowCard",
          tabIndex: -1
        }))), React.createElement("div", {
          className: "workflow-container"
        }, React.createElement("div", {
          className: "workflow-textblock"
        }, React.createElement("h2", {
          className: "workflow-title"
        }, title), React.createElement("p", {
          className: "workflow-description"
        }, description)), React.createElement("div", {
          className: "workflow-actions"
        }, primaryActionUrl && React.createElement("button", {
          onClick: function onClick() {
            return onPrimaryActionClick(name, primaryActionUrl);
          },
          type: "button",
          className: "button action ".concat(props.primaryActionClass, " primary up"),
          "aria-label": primaryActionAriaLabel,
          role: "link",
          "js-navtype": "workflowCard",
          tabIndex: -1
        }, props.primaryActionHasIcon && React.createElement("span", {
          className: "icon"
        }), React.createElement("span", {
          className: "wrap"
        }, primaryActionLabel)), secondaryActionUrl && React.createElement("button", {
          onClick: function onClick() {
            return onSecondaryActionClick(secondaryActionUrl);
          },
          type: "button",
          className: "button action view theme border",
          "aria-label": secondaryActionAriaLabel,
          role: "link",
          "js-navtype": "workflowCard",
          tabIndex: -1
        }, React.createElement("span", {
          className: "icon"
        }), React.createElement("span", {
          className: "wrap"
        }, secondaryActionLabel)))));
      }
    }]);

    return Workflow;
  }(Component), _temp;
};

var Workflow = createWorkflow(workflowTooltip);
exports.createWorkflow = createWorkflow;
exports.Workflow = Workflow;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});