define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

var _basePlusButton = require('./base/PlusButton');

var PlusButtonComponent = _basePlusButton.PlusButton;

var i18n = require("bundle!adhoc_messages");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
// @ts-ignore
var createAddSeriesColorButton = function createAddSeriesColorButton(PlusButton) {
  return function AddSeriesColorButton(props) {
    var labelKey = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_ADD_SERIES_COLOR';
    return React.createElement(PlusButton, {
      label: i18n[labelKey],
      onClick: props.onClick
    });
  };
};

var AddSeriesColorButton = createAddSeriesColorButton(PlusButtonComponent);
exports.createAddSeriesColorButton = createAddSeriesColorButton;
exports.AddSeriesColorButton = AddSeriesColorButton;

});