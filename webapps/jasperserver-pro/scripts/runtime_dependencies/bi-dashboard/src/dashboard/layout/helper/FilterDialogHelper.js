define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var dashboardComponentTypes = require('../../enum/dashboardComponentTypes');

var BasicHelper = require('./BasicHelper');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BasicHelper.extend({
  init: function init(container) {
    this.container = container;
    this.helper = $('<div>').addClass('helper filter-dialog-drop').appendTo($('body#dashboard')).hide();
    this.helper.position = {};
  },
  drag: function drag(event, data) {
    if (!this.strategy.model.currentFoundation.components.getDashboardPropertiesComponent().get('dashletFilterShowPopup')) {
      return;
    }

    var position,
        componentId = data ? data.componentId : undefined,
        element = $(event.toElement || event.originalEvent.target),
        dialog = $('.filterGroup.dialog.open');

    if (data.resourceType === dashboardComponentTypes.INPUT_CONTROL && (element.is(this.helper) || element.parents('.dashboardCanvas').length || element.is('.filterGroup.dialog.open') || element.parents('.filterGroup.dialog.open').length)) {
      if (!dialog.length) {
        this.strategy.model.currentFoundation.trigger('open:filterDialog');
        return;
      }

      var dialogRect = dialog[0].getBoundingClientRect();
      this.helper.element = dialog;
      this.helper.css(_.extend({
        zIndex: parseInt(dialog.css('zIndex')) + 2
      }, _.pick(dialogRect, ['top', 'left', 'width', 'height'])));
      this.helper.show();
    } else {
      this.helper.hide();
    }
  },
  stop: function stop() {
    this.helper.hide();
  }
});

});