define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var TrashBinButton = function TrashBinButton(props) {
  return (
    /* eslint-disable-next-line */
    React.createElement("button", {
      className: "jr-mButton jr-mButtonAction jr",
      onClick: props.onClick
    }, React.createElement("span", {
      className: "jr-mButton-icon jr-mIcon jr-delete jr"
    }))
  );
};

exports.TrashBinButton = TrashBinButton;

});