define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var selectionRulesUtil = require("../../util/selectionRulesUtil");

var extractElementFromEvent = require("../../util/extractElementFromEventUtil");

var collectElementDataAttributes = require("../../util/collectElementDataAttributesUtil");

var extractFnFromConfigurationUtil = require("../../util/extractFnFromConfigurationUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function initSelectableEvents(options) {
  var allowed = _.result(options, 'allowed') || true,
      event = _.result(options, 'event') || 'click',
      $el = $(this.$el);

  if (allowed) {
    $el.on(event, options.selector, _.bind(onSelection, this, options));
  }
}

function getDefaultCallback(options, attrs) {
  return extractFnFromConfigurationUtil({
    config: options,
    name: 'onSelection',
    context: this,
    options: attrs
  });
}

function onSelection(options, e) {
  var multiple = _.result(options, 'multiple') || false,
      onToggleSelection = _.result(options, 'onToggleSelection'),
      onRangeSelection = _.result(options, 'onRangeSelection'),
      onSelection = _.result(options, 'onSelection'),
      $selectedEl = extractElementFromEvent.byCurrentTarget(e),
      attrs = collectElementDataAttributes.getElementDataAttributes(options.attrs, $selectedEl),
      callback,
      fnName = 'onSelection';

  if (multiple) {
    if (selectionRulesUtil.isCtrlKeyHeld(e)) {
      fnName = 'onToggleSelection';
    } else if (selectionRulesUtil.isShiftKeyHeld(e)) {
      fnName = 'onRangeSelection';
    }
  }

  callback = extractFnFromConfigurationUtil({
    config: options,
    name: fnName,
    context: this,
    options: attrs
  }) || getDefaultCallback.call(this, options, attrs);

  if (selectionRulesUtil.isLeftMouseButton(e)) {
    options.testFn(attrs) && callback && callback(e);
  }
}

module.exports = {
  _initializeSelectable: function _initializeSelectable() {
    var selectableConfiguration = _.result(this, 'selection'),
        selector = _.result(selectableConfiguration, 'selector');

    if (!selector) {
      throw new Error('Selector must be specified.');
    }

    var attrs = _.result(selectableConfiguration, 'attrs') || [],
        testFn = extractFnFromConfigurationUtil({
      config: selectableConfiguration,
      name: 'shouldBeSelectable',
      context: this
    }) || function () {
      return true;
    };

    var options = _.extend(selectableConfiguration, {
      selector: selector,
      testFn: testFn,
      attrs: attrs
    });

    initSelectableEvents.call(this, options);
  }
};

});