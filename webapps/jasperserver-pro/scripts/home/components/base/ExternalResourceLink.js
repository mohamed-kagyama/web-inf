define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ExternalResourceLink = function ExternalResourceLink(props) {
  var url = props.url,
      title = props.title,
      linkClass = props.linkClass,
      description = props.description;
  var descriptionEl;

  if (description) {
    descriptionEl = React.createElement("span", {
      className: "resourceName-description"
    }, description);
  } else {
    descriptionEl = React.createElement(React.Fragment, null);
  }

  return React.createElement("li", {
    tabIndex: -1
  }, React.createElement("div", {
    className: "resourceType"
  }, React.createElement("span", {
    className: "resourceType-icon ".concat(linkClass)
  })), React.createElement("div", {
    className: "resourceName"
  }, React.createElement("a", {
    href: url,
    rel: "noopener noreferrer",
    className: "resourceName-link",
    target: "_blank",
    tabIndex: -1
  }, title), descriptionEl));
};

exports.ExternalResourceLink = ExternalResourceLink;

});