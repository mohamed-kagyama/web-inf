define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var extractElementFromEvent = require("../../util/extractElementFromEventUtil");

var extractDataFromDraggable = require("../../util/extractDataFromDraggable");

require('jquery-ui/ui/widgets/droppable');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var omitOptions = ['drop', 'over', 'out', 'selector'];

function triggerDroppableEventWithData($el, event) {
  var data = [extractDataFromDraggable()];
  data.length && $el.droppable().trigger(event, data);
}

var LazyDroppable = function LazyDroppable(el, options) {
  this.initialize(el, options);
};

_.extend(LazyDroppable.prototype, {
  initialize: function initialize(el, options) {
    _.bindAll(this, '_onDroppableMouseEnter', '_onDroppableMouseLeave');

    this.$lastDroppableEl = null;
    this.options = options;

    this._initEvents(el);
  },
  _initEvents: function _initEvents(el) {
    var selector = this.options.selector;
    this.$wrappedElement = $(el);

    if (selector) {
      this.$wrappedElement.on('mouseenter', selector, this._onDroppableMouseEnter);
      this.$wrappedElement.on('mouseleave', selector, this._onDroppableMouseLeave);
    } else {
      this.$wrappedElement.on('mouseenter', this._onDroppableMouseEnter);
      this.$wrappedElement.on('mouseleave', this._onDroppableMouseLeave);
    }
  },
  _onDroppableMouseEnter: function _onDroppableMouseEnter(event) {
    var $el = extractElementFromEvent.byCurrentTarget(event);

    this._destroyDroppable();

    this.options.testFn(extractDataFromDraggable()) && this._initializeDroppable($el);
  },
  _onDroppableMouseLeave: function _onDroppableMouseLeave(event) {
    var $el = extractElementFromEvent.byCurrentTarget(event); // trigger out event, because droppable get destroyed sooner than
    // callback passed via droppable config is called.
    // trigger out event, because droppable get destroyed sooner than
    // callback passed via droppable config is called.

    if ($el.data('ui-droppable')) {
      triggerDroppableEventWithData($el, 'dropout');
    }

    this._destroyDroppable($el);
  },
  _initializeDroppable: function _initializeDroppable($el) {
    this.droppableOptions = this._getDroppableOptions();
    $el.droppable(this.droppableOptions); // subscribe to events since we want lazy initialization
    // subscribe to events since we want lazy initialization

    $el.droppable().on('drop', this.droppableOptions.onDrop);
    $el.droppable().on('dropover', this.droppableOptions.onOver);
    $el.droppable().on('dropout', this.droppableOptions.onOut); // trigger over event manually, because it was not trigger on mouseenter initialize
    // trigger over event manually, because it was not trigger on mouseenter initialize

    triggerDroppableEventWithData($el, 'dropover');
    this.$lastDroppableEl = $el;
  },
  _getDroppableOptions: function _getDroppableOptions() {
    var droppableConfig = this.options.config;
    var drop = droppableConfig.drop,
        over = droppableConfig.over,
        out = droppableConfig.out;

    var options = _.extend({}, _.omit(droppableConfig, omitOptions));

    if (drop) {
      options.onDrop = function (event, ui) {
        var data = ui.helper.data('data');

        _.defer(function () {
          drop(event, data);
        });
      };
    }

    if (over) {
      options.onOver = over;
    }

    if (out) {
      options.onOut = out;
    }

    return options;
  },
  _destroyDroppable: function _destroyDroppable($el) {
    $el = $el || this.$lastDroppableEl;

    if ($el && $el.data('ui-droppable')) {
      $el.droppable().off('drop', this.droppableOptions.onDrop);
      $el.droppable().off('dropover', this.droppableOptions.onOver);
      $el.droppable().off('dropout', this.droppableOptions.onOut);
      $el.droppable('destroy');
    }
  },
  destroyDroppable: function destroyDroppable() {
    this._destroyDroppable();

    this.$wrappedElement.off('mouseenter', this._onDroppableMouseEnter);
    this.$wrappedElement.off('mouseleave', this._onDroppableMouseLeave);
  }
});

module.exports = {
  bind: function bind(el, binding) {
    var droppableConfig = binding.value,
        selector = _.result(droppableConfig, 'selector');

    var testFn = droppableConfig.test || function () {
      return true;
    };

    var options = {
      selector: selector,
      testFn: testFn,
      config: droppableConfig
    };
    el._droppable = new LazyDroppable(el, options);
  },
  unbind: function unbind(el) {
    el._droppable && el._droppable.destroyDroppable();
  }
};

});