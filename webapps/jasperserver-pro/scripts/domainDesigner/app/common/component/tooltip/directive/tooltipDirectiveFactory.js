define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var jQuery = require('jquery');

var _ = require('underscore');

var domUtil = require("runtime_dependencies/js-sdk/src/common/util/domUtil");

var TooltipVueWrapper = require("./wrapper/TooltipVueWrapper");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getOffsetLeft($el) {
  var leftOffset;

  try {
    leftOffset = domUtil.getPaddings($el).left;
  } catch (err) {
    leftOffset = 0;
  }

  return leftOffset;
}

var DEFAULT_OFFSET_TOP = 2;
module.exports = {
  create: function create(options) {
    options = options || {};
    var $ = options.$ || jQuery;
    var tooltipVueWrapper = options.tooltipVueWrapper || new TooltipVueWrapper();
    $('body').append(tooltipVueWrapper.$mount().$el);

    function onMouseover(event) {
      var el = event.currentTarget;
      tooltipVueWrapper.setState(_.extend({
        target: el,
        offset: {
          left: getOffsetLeft($(el)),
          top: DEFAULT_OFFSET_TOP
        }
      }, el._value));
    }

    function resetTooltipState() {
      tooltipVueWrapper.resetState();
    }

    return {
      bind: function bind(el, binding) {
        var $el = $(el);
        $el.on('mouseover', onMouseover);
        $el.on('mouseout', resetTooltipState);
        el._value = binding.value;
      },
      componentUpdated: function componentUpdated(el, binding) {
        el._value = binding.value;
      },
      unbind: function unbind(el) {
        var $el = $(el);
        resetTooltipState();
        $el.off('mouseover', onMouseover);
        $el.off('mouseout', resetTooltipState);
        delete el._value;
      }
    };
  }
};

});