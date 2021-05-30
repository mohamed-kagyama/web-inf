define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ControlCheckbox = exports.ControlCheckbox = function ControlCheckbox(props) {
  return React.createElement("div", {
    className: "control checkBox"
  }, React.createElement("label", {
    htmlFor: props.id
  }, props.label), React.createElement("input", {
    id: props.id,
    name: props.id,
    type: "checkbox",
    defaultChecked: props.defaultChecked,
    onChange: props.onChange
  }));
};

});