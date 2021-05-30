define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SelectControl = exports.SelectControl = function SelectControl(props) {
  return React.createElement("div", {
    className: "control"
  }, React.createElement("label", null, props.label, ":", React.createElement("select", {
    className: props["class"],
    onChange: props.onChange,
    value: props.selectedValue
  }, props.options.map(function (option) {
    return React.createElement("option", {
      key: option.value,
      value: option.value
    }, option.label);
  }))));
};

});