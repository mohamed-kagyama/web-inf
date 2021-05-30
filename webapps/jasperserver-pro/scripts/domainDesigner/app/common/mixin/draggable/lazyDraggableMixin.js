define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var extractElementFromEvent = require("../../util/extractElementFromEventUtil");

var collectElementDataAttributes = require("../../util/collectElementDataAttributesUtil");

var extractFnFromConfigurationUtil = require("../../util/extractFnFromConfigurationUtil");

require('jquery-ui/ui/widgets/draggable');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SELF_SELECTOR = ':el';
var omitOptions = ['onDragStart', 'onDrag', 'onDragStop', 'shouldDrag', 'attrs', 'selector'];

function initDraggableEvents(options) {
  var selector = options.selector,
      $el = $(this.$el);

  if (selector === SELF_SELECTOR) {
    $el.on('mouseover', _.bind(onMouseOver, this, options));
    $el.on('mouseleave', _.bind(onMouseLeave, this));
  } else {
    $el.on('mouseover', selector, _.bind(onMouseOver, this, options));
    $el.on('mouseleave', selector, _.bind(onMouseLeave, this));
  }
}

function onMouseOver(options, event) {
  var $el = extractElementFromEvent.byCurrentTarget(event),
      attrs = collectElementDataAttributes.getElementDataAttributes(options.attrs, $el);
  options = _.extend({}, options, {
    attrs: attrs
  });

  if (!this._isDragInProgress()) {
    options.testFn(attrs) && this._initDraggable($el, options);
  }
}

function onMouseLeave(event) {
  var $el = extractElementFromEvent.byCurrentTarget(event);

  if (!this._isDragInProgress()) {
    this._destroyDraggable($el);
  }
}

function getDraggableUserCallback(name, options) {
  return extractFnFromConfigurationUtil(_.extend({}, options, {
    name: name
  }));
}

function getDraggableOptions(options) {
  var draggableConfig = options.config;
  var callbackOptions = {
    config: draggableConfig,
    context: this,
    options: options.attrs
  };
  var onDragStart = getDraggableUserCallback('onDragStart', callbackOptions),
      onDrag = getDraggableUserCallback('onDrag', callbackOptions),
      onDragStop = getDraggableUserCallback('onDragStop', callbackOptions);

  var draggableOptions = _.extend({
    appendTo: $('body'),
    cursor: 'move',
    cursorAt: {
      top: 0,
      left: 0
    },
    helper: function helper() {
      return $('<div class="wrap button draggable dragging dragHelper"></div>');
    }
  }, _.omit(draggableConfig, omitOptions));

  draggableOptions.start = getStartDraggableCallback.call(this, onDragStart);
  draggableOptions.drag = getOnDragCallback.call(this, onDrag);
  draggableOptions.stop = getOnDragStopCallback.call(this, onDragStop);
  return draggableOptions;
}

function getStartDraggableCallback(onDragStart) {
  var self = this,
      defaultUiHelperOptions = {
    label: '',
    data: []
  };
  return function (e, ui) {
    e.originalEvent.preventDefault();
    self.dragInProgress = true;
    var onStartHelperOptions = onDragStart && onDragStart(e);

    var uiHelperOptions = _.extend({}, defaultUiHelperOptions, onStartHelperOptions);

    ui.helper.text(uiHelperOptions.label).data('data', uiHelperOptions.data);
  };
}

function getOnDragCallback(onDrag) {
  return function (e, ui) {
    var data = ui.helper.data('data');
    onDrag && onDrag(data, e);
  };
}

function getOnDragStopCallback(onDragStop) {
  var self = this;
  return function (e, ui) {
    self.dragInProgress = false;
    var data = ui.helper.data('data');
    onDragStop && onDragStop(data, e);
  };
}

module.exports = {
  _initializeDraggable: function _initializeDraggable() {
    var draggableConfig = _.result(this, 'draggable'),
        selector = _.result(draggableConfig, 'selector');

    if (!selector) {
      throw new Error('Selector for draggable is required.');
    }

    this.$lastDraggableEl = null;
    this.dragInProgress = false;
    var attrs = _.result(draggableConfig, 'attrs') || [];

    var testFn = extractFnFromConfigurationUtil({
      config: draggableConfig,
      name: 'shouldBeDraggable',
      context: this
    }) || function () {
      return true;
    };

    var options = {
      selector: selector,
      attrs: attrs,
      testFn: testFn,
      config: draggableConfig
    };
    initDraggableEvents.call(this, options);
  },
  _isDragInProgress: function _isDragInProgress() {
    return this.dragInProgress;
  },
  _initDraggable: function _initDraggable($el, options) {
    this._destroyDraggable();

    options = getDraggableOptions.call(this, options);
    $el.draggable(options);
    this.$lastDraggableEl = $el;
  },
  _destroyDraggable: function _destroyDraggable($el) {
    $el = $el || this.$lastDraggableEl;

    try {
      $el && $el.draggable('destroy');
    } catch (e) {} // destroyed already, skip


    this.$lastDraggableEl = null;
  }
};

});