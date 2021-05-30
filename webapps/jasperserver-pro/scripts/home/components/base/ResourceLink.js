define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var forwardRef = function forwardRef(props, ref) {
  var label = props.label,
      resourceType = props.resourceType,
      actionAvailable = props.actionAvailable,
      date = props.date,
      url = props.url;
  return React.createElement("li", {
    tabIndex: -1,
    ref: ref
  }, React.createElement("div", {
    className: "fileType"
  }, React.createElement("span", {
    className: "fileType-icon ".concat(resourceType)
  })), React.createElement("div", {
    className: "fileName  ".concat(!actionAvailable ? 'disableCursor' : '')
  }, React.createElement("a", {
    href: url,
    tabIndex: -1
  }, label), React.createElement("span", {
    className: "fileDate"
  }, date)));
};

forwardRef.displayName = 'ResourceLink';
var ResourceLink = React.forwardRef(forwardRef);
exports.ResourceLink = ResourceLink;

});