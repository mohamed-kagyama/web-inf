define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var dashboardSettings = require('../../dashboardSettings');

var BasicHelper = require('./BasicHelper');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BasicHelper.extend({
  elements: '> .content > .body > [' + dashboardSettings.COMPONENT_ID_ATTRIBUTE + ']:not(.inputControlWrapper)',
  init: function init(container) {
    this.container = container;
    this.mouseEnter = _.bind(this.mouseEnter, this);
    this.mouseLeave = _.bind(this.mouseLeave, this);
    this.container.on('mouseenter', this.elements, this.mouseEnter);
    this.container.on('mouseleave', this.elements, this.mouseLeave);
  },
  mouseEnter: function mouseEnter(event) {
    var target = $(event.target).parents('[' + dashboardSettings.COMPONENT_ID_ATTRIBUTE + ']');

    if (target.parents('.ui-dropping').length || target.hasClass('inputControlWrapper')) {
      return;
    }

    target.draggable({
      cursor: 'move',
      appendTo: this.container.parent(),
      cursorAt: {
        top: 0,
        left: 0
      },
      zIndex: 100,
      distance: 10,
      start: _.bind(this.dashletDragStart, this),
      stop: _.bind(this.dashletDragStop, this),
      drag: _.bind(this.dashletDrag, this)
    });
  },
  mouseLeave: function mouseLeave(event) {
    var target = $(event.target);

    if (!target.hasClass('ui-draggable')) {
      target = target.parents('[' + dashboardSettings.COMPONENT_ID_ATTRIBUTE + ']');
    }

    if (target.hasClass('ui-draggable-dragging')) {
      return;
    }

    try {
      target.draggable('destroy');
    } catch (ex) {}
  },
  dashletDragStart: function dashletDragStart(event, ui) {
    var element = $(event.target),
        componentId = element.attr(dashboardSettings.COMPONENT_ID_ATTRIBUTE),
        data = {
      componentId: componentId
    };
    this.strategy.model.currentFoundation.components.selectComponent(componentId);

    try {
      ui.helper.resizable('destroy');
    } catch (ex) {}

    ui.helper.attr('class', 'wrap button draggable dragging dragHelper').attr('style', '');
    data.dashletEl = ui.helper.find('> .dashlet').detach();
    var component = this.strategy.model.currentFoundation.components.get(componentId);
    ui.helper.text(component.get('name')).data('data', data);
    this.strategy.onDashletDragStart.call(this.strategy, data, event);
  },
  dashletDrag: function dashletDrag(event, ui) {
    var element = $(event.target),
        componentId = element.attr(dashboardSettings.COMPONENT_ID_ATTRIBUTE);
    this.strategy.onDashletDrag.call(this.strategy, {
      componentId: componentId
    }, event);
  },
  dashletDragStop: function dashletDragStop(event, ui) {
    var element = $(event.target),
        componentId = element.attr(dashboardSettings.COMPONENT_ID_ATTRIBUTE);

    if (!ui.helper.find('> .dashlet').length) {
      var movingComponent = this.strategy.model.currentFoundation.components.get(ui.helper.data('data').componentId);
      ui.helper.attr('class', '').attr('style', '').html(ui.helper.data('data').dashletEl).css(movingComponent.getCssPosition());
    }

    this.strategy.onDashletDragStop.call(this.strategy, {
      componentId: componentId
    }, event);
  },
  drop: function drop(event, ui, position) {
    if (ui.helper.data('data') && ui.helper.data('data').componentId && ui.helper.data('data').dashletEl) {
      var movingComponent = this.strategy.model.currentFoundation.components.get(ui.helper.data('data').componentId);
      movingComponent.unset('x', {
        silent: true
      });
      movingComponent.unset('y', {
        silent: true
      });
      movingComponent.unset('width', {
        silent: true
      });
      movingComponent.unset('height', {
        silent: true
      });
      ui.helper.attr('class', '').attr('style', '').html(ui.helper.data('data').dashletEl);
    }
  },
  deinit: function deinit() {
    this.container.off('mouseenter', this.elements, this.mouseEnter);
    this.container.off('mouseleave', this.elements, this.mouseLeave);
  }
});

});