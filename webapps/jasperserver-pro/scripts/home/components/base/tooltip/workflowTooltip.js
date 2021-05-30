define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var _runtime_dependenciesJrsUiSrcComponentsComponentsTooltip = require("runtime_dependencies/jrs-ui/src/components/components.tooltip");

var DefaultJSTooltip = _runtime_dependenciesJrsUiSrcComponentsComponentsTooltip.JSTooltip;

var tooltipTemplate = require("text!./workflowTooltipTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
// @ts-ignore
var workflowTooltipFactory = exports.workflowTooltipFactory = function workflowTooltipFactory(JSTooltip, jQuery, id) {
  var template = _.template(tooltipTemplate, {
    uid: id
  });

  jQuery('body').append(jQuery(template));
  return function (label, el) {
    // eslint-disable-next-line no-new
    new JSTooltip(el, {
      text: [label],
      templateId: id
    });
  };
};

var tooltipId = _.uniqueId('workflowTooltip');

var workflowTooltip = exports.workflowTooltip = workflowTooltipFactory(DefaultJSTooltip, $, tooltipId);

});