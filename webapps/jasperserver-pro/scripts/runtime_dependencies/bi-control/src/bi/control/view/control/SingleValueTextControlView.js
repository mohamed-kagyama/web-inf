define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var BaseInputControlView = require('../BaseInputControlView');

var substitutions = require('../../enum/substitutionConstants');

var singleTextInputTemplate = require("text!../../template/singleTextInputTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseInputControlView.extend({
  template: singleTextInputTemplate,
  updateValue: function updateValue(controlData) {
    var value = controlData == substitutions.NULL_SUBSTITUTION_VALUE ? substitutions.NULL_SUBSTITUTION_LABEL : controlData;
    this.$el.find('input').val(value);

    if (this.model.state.get('error')) {
      this.updateWarningMessage();
    }
  },
  bindCustomEventListeners: function bindCustomEventListeners() {
    this.$el.on('change keyup', 'input', _.bind(function (evt) {
      var inputValue = evt.target.value;
      var value = inputValue == substitutions.NULL_SUBSTITUTION_LABEL ? substitutions.NULL_SUBSTITUTION_VALUE : inputValue;
      this.model.changeState(value);
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