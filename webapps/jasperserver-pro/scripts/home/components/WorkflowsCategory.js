define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _react = require('react');

var React = _react;
var Children = _react.Children;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var WorkflowsCategory = function WorkflowsCategory(props) {
  var title = props.title,
      children = props.children,
      categoryClass = props.categoryClass;
  var childrenComponents = Children.toArray(children);
  return React.createElement("div", {
    className: "workflowsCategory ".concat(categoryClass)
  }, React.createElement("div", {
    className: "workflowsTitle"
  }, title), React.createElement("ul", {
    className: "workflowsBlock",
    "js-itemplural": "items",
    role: "application",
    "aria-label": "List of ".concat(childrenComponents.length, " items"),
    "js-navtype": "workflowCard",
    "js-suspended-tabindex": "0"
  }, childrenComponents));
};

exports.WorkflowsCategory = WorkflowsCategory;

});