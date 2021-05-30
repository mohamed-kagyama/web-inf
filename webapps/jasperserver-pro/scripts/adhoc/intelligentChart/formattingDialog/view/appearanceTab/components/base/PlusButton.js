define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PlusButton = function PlusButton(props) {
  return (
    /* eslint-disable-next-line react/button-has-type */
    React.createElement("button", {
      className: "jr-mButton jr-mButtonCombo jr-mButtonSmall jr",
      onClick: props.onClick
    }, React.createElement("span", {
      className: "jr-mButton-icon jr-mIcon jr-mIconTheme jr-plus jr"
    }), React.createElement("span", {
      className: "jr-mButton-label jr-mButton-labelTheme jr"
    }, props.label))
  );
};

exports.PlusButton = PlusButton;

});