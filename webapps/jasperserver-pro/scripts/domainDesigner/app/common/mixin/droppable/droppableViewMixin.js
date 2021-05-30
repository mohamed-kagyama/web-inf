define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var droppableFnWrapper = require('./util/droppableFnWrapper');

require('jquery-ui/ui/widgets/droppable');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var selfSelector = ':el';
var omitOptions = ['drop', 'over', 'out', 'el'];
module.exports = {
  _initializeDroppable: function _initializeDroppable(config) {
    var droppable = _.result(this, 'droppable') || config,
        el = _.result(droppable, 'el'),
        $el;

    $el = this._getDroppableElement(el);

    if (!$el || $el.length === 0) {
      throw new Error('Can not found droppable element');
    }

    var options = this._getDroppableOptions(droppable);

    this.$droppable = $el.droppable(options);
  },
  _getDroppableElement: function _getDroppableElement(selector) {
    if (selector === selfSelector) {
      return $(this.$el);
    } else {
      return $(this.$el).find(selector);
    }
  },
  _disableDroppable: function _disableDroppable() {
    this.$droppable.droppable('disable');
  },
  _enableDroppable: function _enableDroppable() {
    this.$droppable.droppable('enable');
  },
  _destroyDroppable: function _destroyDroppable() {
    if (this.$droppable && this.$droppable.data('ui-droppable')) {
      this.$droppable.droppable('destroy');
    }
  },
  _getDroppableOptions: function _getDroppableOptions(droppable) {
    var drop = _.result(droppable, 'drop'),
        over = _.result(droppable, 'over'),
        out = _.result(droppable, 'out');

    drop = droppableFnWrapper.call(this, drop);
    over = droppableFnWrapper.call(this, over);
    out = droppableFnWrapper.call(this, out);

    var options = _.extend({}, _.omit(droppable, omitOptions));

    if (drop) {
      options.drop = drop;
    }

    if (over) {
      options.over = over;
    }

    if (out) {
      options.out = out;
    }

    return options;
  }
};

});