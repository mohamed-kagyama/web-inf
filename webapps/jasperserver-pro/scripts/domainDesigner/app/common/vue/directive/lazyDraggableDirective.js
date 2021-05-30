define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

require('jquery-ui/ui/widgets/draggable');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var omitOptions = ['onDragStart', 'onDrag', 'onDragStop', 'test'];

var LazyDraggable = function LazyDraggable(el, options) {
  this.initialize(el, options);
};

_.extend(LazyDraggable.prototype, {
  initialize: function initialize(el, options) {
    _.bindAll(this, '_onDraggableMouseOver', '_onDraggableMouseLeave');

    this.$lastDraggableEl = null;
    this.dragInProgress = false;
    this.$wrappedElement = $(el);
    this.options = options;

    this._initDraggableEvents();
  },
  isDragInProgress: function isDragInProgress() {
    return this.dragInProgress;
  },
  destroyDraggable: function destroyDraggable() {
    this._destroyDraggableAndRemoveListeners();
  },
  _initDraggableEvents: function _initDraggableEvents() {
    this.$wrappedElement.on('mouseover', this._onDraggableMouseOver);
    this.$wrappedElement.on('mouseleave', this._onDraggableMouseLeave);
  },
  _onDraggableMouseOver: function _onDraggableMouseOver() {
    if (!this._isDragInProgress()) {
      this.options.testFn() && this._initDraggable();
    }
  },
  _onDraggableMouseLeave: function _onDraggableMouseLeave() {
    if (!this._isDragInProgress()) {
      this._destroyDraggable();
    }
  },
  _isDragInProgress: function _isDragInProgress() {
    return this.dragInProgress;
  },
  _initDraggable: function _initDraggable() {
    this._destroyDraggable();

    var options = this._getDraggableOptions();

    this.$wrappedElement.draggable(options);
    this.$lastDraggableEl = this.$wrappedElement;
  },
  _getDraggableOptions: function _getDraggableOptions() {
    var draggableConfig = this.options.config;

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

    draggableOptions.start = this._getStartDraggableCallback(draggableConfig.onDragStart);
    draggableOptions.drag = this._getOnDragCallback(draggableConfig.onDrag);
    draggableOptions.stop = this._getOnDragStopCallback(draggableConfig.onDragStop);
    return draggableOptions;
  },
  _getStartDraggableCallback: function _getStartDraggableCallback(onDragStart) {
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
  },
  _getOnDragCallback: function _getOnDragCallback(onDrag) {
    var self = this;
    return function (e, ui) {
      var data = self._getDraggableData();

      ui.helper.data('data', data);
      data.label && ui.helper.text(data.label);
      onDrag && onDrag(data, e);
    };
  },
  _getOnDragStopCallback: function _getOnDragStopCallback(onDragStop) {
    var self = this;
    return function (e) {
      self.dragInProgress = false;

      var data = self._getDraggableData();

      var isDraggableElementExists = $.contains(document, self.$wrappedElement[0]);

      if (!isDraggableElementExists) {
        self._destroyDraggableAndRemoveListeners();
      }

      onDragStop && onDragStop(data, e);
    };
  },
  _getDraggableData: function _getDraggableData() {
    var draggableConfig = this.options.config;
    return draggableConfig.getData && draggableConfig.getData();
  },
  _destroyDraggable: function _destroyDraggable() {
    var $el = this.$lastDraggableEl || this.$wrappedElement;

    try {
      $el && $el.draggable('destroy');
    } catch (e) {} // destroyed already, skip


    this.$lastDraggableEl = null;
  },
  _destroyDraggableAndRemoveListeners: function _destroyDraggableAndRemoveListeners() {
    this._destroyDraggable();

    this.$wrappedElement.off('mouseover', this._onDraggableMouseOver);
    this.$wrappedElement.off('mouseleave', this._onDraggableMouseLeave);
  }
});

module.exports = {
  bind: function bind(el, binding) {
    var draggableConfig = binding.value;

    var testFn = draggableConfig.test || function () {
      return true;
    };

    var options = {
      testFn: testFn,
      config: draggableConfig
    };
    el._draggable = new LazyDraggable(el, options);
  },
  unbind: function unbind(el) {
    var draggable = el._draggable;

    if (draggable && !draggable.isDragInProgress()) {
      draggable.destroyDraggable();
    }
  }
};

});