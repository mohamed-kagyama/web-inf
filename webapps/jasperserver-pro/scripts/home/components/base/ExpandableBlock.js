define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ExpandableBlock = function ExpandableBlock(props) {
  var children = props.children,
      title = props.title,
      isExpanded = props.isExpanded,
      onClick = props.onClick;
  var style = {
    display: isExpanded ? 'block' : 'none'
  };
  return React.createElement("div", {
    className: "resourceBlock"
  }, React.createElement("div", {
    className: "resourceBlock-header",
    onClick: function (_onClick2) {
      function onClick() {
        return _onClick2.apply(this, arguments);
      }

      onClick.toString = function () {
        return _onClick2.toString();
      };

      return onClick;
    }(function () {
      return onClick(isExpanded);
    })
  }, React.createElement("button", {
    type: "button",
    onClick: function (_onClick) {
      function onClick() {
        return _onClick.apply(this, arguments);
      }

      onClick.toString = function () {
        return _onClick.toString();
      };

      return onClick;
    }(function () {
      return onClick(isExpanded);
    }),
    className: "buttonIconToggle ".concat(isExpanded ? 'isOpen' : 'isClosed')
  }), React.createElement("div", {
    className: "resourceBlock-title"
  }, title)), React.createElement("ul", {
    className: "resourceBlock-list",
    "js-navtype": "list",
    style: style,
    tabIndex: 0
  }, children));
};

exports.ExpandableBlock = ExpandableBlock;

});