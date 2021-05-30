define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var dateTrait = require('./dateTrait');

var InputRangeValueEditor = require('./InputRangeValueEditor');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var InputRangeValueEditorProto = InputRangeValueEditor.prototype;
module.exports = InputRangeValueEditor.extend(_.extend({}, dateTrait, {
  /**
       * Reset true all flag if date was changed
       *
       * @param ev
       */
  onChange: function onChange(ev) {
    this.model.set('isAnyValue', false, {
      silent: true
    });
    InputRangeValueEditorProto.onChange.call(this, ev);
  },
  registerEvents: function registerEvents() {
    InputRangeValueEditorProto.registerEvents.call(this);
    this.$el.on('change', 'input[type=checkbox]', _.bind(function (ev) {
      var isAnyValue = $(ev.target).prop('checked');
      this.model.set('isAnyValue', isAnyValue);

      if (isAnyValue) {
        this.model._setDefaultValue();

        this.render();
      }
    }, this));
  }
}));

});