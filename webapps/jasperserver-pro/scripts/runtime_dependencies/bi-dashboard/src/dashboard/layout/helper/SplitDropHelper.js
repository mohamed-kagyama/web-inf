define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var dashboardSettings = require('../../dashboardSettings');

var dashboardComponentTypes = require('../../enum/dashboardComponentTypes');

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

var BasicHelper = require('./BasicHelper');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BasicHelper.extend({
  placement: ['bottom', 'left', 'right', 'top'],
  init: function init(container) {
    this.container = container;
    this.helper = $('<div>').addClass('helper split-drop').appendTo(container).hide();
    this.helper.position = {};
  },
  drag: function drag(event, componentObj) {
    var position,
        element = $(event.toElement || event.originalEvent.target);

    if (element.hasClass('dragHelper')) {
      element = this.lastTarget;
    } else {
      this.lastTarget = element;
    }

    element = element[0] === this.helper[0] ? this.helper.element : element.parents('[' + dashboardSettings.COMPONENT_ID_ATTRIBUTE + ']');

    if (!element || !element.length) {
      this.helper.hide();
      return;
    }

    if (element.hasClass('dashboardLevelPropertiesDialog') || element.parents('.dashboardLevelPropertiesDialog').length) {
      this.helper.hide();
      return;
    }

    var componentId = element.attr(dashboardSettings.COMPONENT_ID_ATTRIBUTE),
        component = this.strategy.model.currentFoundation.components.get(componentId);

    if (component.get('type') === dashboardComponentTypes.INPUT_CONTROL) {
      component = component.getParent();
      componentId = component.get('id');
      element = this.container.find('[' + dashboardSettings.COMPONENT_ID_ATTRIBUTE + '="' + componentId + '"]');
    }

    if (componentObj.resourceType === dashboardComponentTypes.INPUT_CONTROL && this.strategy.model.currentFoundation.components.getDashboardPropertiesComponent().get('dashletFilterShowPopup')) {
      this.helper.hide();
      return;
    } else if (component.get('type') === dashboardComponentTypes.FILTER_GROUP && componentObj.resourceType === repositoryResourceTypes.INPUT_CONTROL) {
      position = component.getPositionObject();
    } else if (componentObj.resourceType === repositoryResourceTypes.INPUT_CONTROL && component.get('type') !== dashboardComponentTypes.FILTER_GROUP && this.strategy.model.currentFoundation.components.findWhere({
      type: dashboardComponentTypes.FILTER_GROUP
    })) {
      position = this.strategy.model.currentFoundation.components.findWhere({
        type: dashboardComponentTypes.FILTER_GROUP
      }).getPositionObject();
    } else {
      position = this.detectPosition(event, element[0]);
      position = this.adjustPlacement(this.getPosition(element), this.detectPlacement(position));
    }

    this.helper.element = element;
    this.helper.css(this.strategy.cellCSS(position)).show();
  },
  stop: function stop(event) {
    this.helper.hide();
  },
  drop: function drop(event, ui, position) {
    var source,
        target,
        element = $(event.toElement || event.originalEvent.target);

    if (element.hasClass('dragHelper')) {
      element = this.lastTarget;
    } else {
      this.lastTarget = element;
    }

    element = element[0] === this.helper[0] ? this.helper.element : element.parents('[' + dashboardSettings.COMPONENT_ID_ATTRIBUTE + ']');

    if (!element || !element.length) {
      return;
    }

    var componentId = element.attr(dashboardSettings.COMPONENT_ID_ATTRIBUTE),
        component = this.strategy.model.currentFoundation.components.get(componentId),
        componentObj = ui.helper.data('data');

    if (component.get('type') === dashboardComponentTypes.INPUT_CONTROL) {
      component = component.getParent();
      componentId = component.get('id');
      element = this.container.find('[' + dashboardSettings.COMPONENT_ID_ATTRIBUTE + '="' + componentId + '"]');
    }

    if (component.get('type') === dashboardComponentTypes.FILTER_GROUP && componentObj && componentObj.resourceType === repositoryResourceTypes.INPUT_CONTROL) {
      return;
    }

    source = this.getPosition(element);
    target = this.detectPosition(event, element[0]);
    target = this.adjustPlacement(source, this.detectPlacement(target)); // copy target position to new element
    // copy target position to new element

    for (var i in target) {
      if (target.hasOwnProperty(i)) {
        position[i] = target[i];
      }
    } // update existent element position
    // update existent element position


    this.strategy.updateLayout(element.attr(dashboardSettings.COMPONENT_ID_ATTRIBUTE), source);
  },
  deinit: function deinit() {
    this.helper.remove();
  },
  // get element grid position
  getPosition: function getPosition(element) {
    var componentModel = this.strategy.model.currentFoundation.components.get(element.attr(dashboardSettings.COMPONENT_ID_ATTRIBUTE));
    return componentModel.getPositionObject();
  },
  // detect cursor position
  detectPosition: function detectPosition(event, element) {
    var position = element.getBoundingClientRect();
    return {
      x: event.clientX - position.left,
      y: event.clientY - position.top,
      width: position.width || position.right - position.left,
      height: position.height || position.bottom - position.top
    };
  },
  // detect helper placement relative to element position
  detectPlacement: function detectPlacement(position) {
    var placement;
    placement = (position.x / position.y > position.width / position.height) * 2;
    placement |= (position.width - position.x) / position.y > position.width / position.height;
    return this.placement[placement];
  },
  adjustPlacement: function adjustPlacement(position, placement) {
    var result = _.clone(position);

    if ('left' === placement || 'right' === placement) {
      result.width = parseInt(result.width / 2);
      position.width -= result.width;
    }

    if ('top' === placement || 'bottom' === placement) {
      result.height = parseInt(result.height / 2);
      position.height -= result.height;
    }

    if ('left' === placement) position.x += result.width;
    if ('right' === placement) result.x += position.width;
    if ('top' === placement) position.y += result.height;
    if ('bottom' === placement) result.y += position.height;
    return result;
  }
});

});