define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var BaseInputControlView = require('../BaseInputControlView');

var singleValueNumberTemplate = require("text!../../template/singleValueNumberTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseInputControlView.extend({
  template: singleValueNumberTemplate,
  updateValue: function updateValue(controlData) {
    this.$el.find('input').val(controlData);
  },
  bindCustomEventListeners: function bindCustomEventListeners() {
    this.$el.on('change keyup', 'input', _.bind(function (evt) {
      this.model.changeState(evt.target.value);
    }, this));
    this.model.state.on('change:value', function (model, value) {
      this.updateValue(value);
    }, this);
  },
  remove: function remove() {
    this.$el.off('change', 'input');
    this.model.state.off('change:value', undefined, this);
    BaseInputControlView.prototype.remove.call(this);
  }
});

});