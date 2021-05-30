define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var _runtime_dependenciesJrsUiSrcComponentsComponentsTooltip = require("runtime_dependencies/jrs-ui/src/components/components.tooltip");

var DefaultJSTooltip = _runtime_dependenciesJrsUiSrcComponentsComponentsTooltip.JSTooltip;

var tooltipTemplate = require("text!./resourceTooltipTemplate.htm");

var i18n = require("bundle!HomeBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
// @ts-ignore
var tooltipFactory = exports.tooltipFactory = function tooltipFactory(JSTooltip, jQuery, id) {
  var template = _.template(tooltipTemplate, {
    uid: id,
    i18n: i18n
  });

  jQuery('body').append(jQuery(template));
  return function (props) {
    // eslint-disable-next-line no-new
    new JSTooltip(props.el, {
      text: [props.path, props.description],
      templateId: id
    });
  };
};

var tooltipId = _.uniqueId('tooltip');

var tooltip = exports.tooltip = tooltipFactory(DefaultJSTooltip, $, tooltipId);

});