define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseInputControlView = require('../BaseInputControlView');

var _ = require('underscore');

var substitutions = require('../../enum/substitutionConstants');

var singleBooleanTemplate = require("text!../../template/singleBooleanTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseInputControlView.extend({
  template: singleBooleanTemplate,
  updateValue: function updateValue(controlData) {
    var input = this.$el.find('input');

    if (controlData === substitutions.NULL_SUBSTITUTION_VALUE || controlData === 'false') {
      input[0].checked = false;
    } else {
      input[0].checked = Boolean(controlData);
    }

    if (this.model.state.get('error')) {
      this.updateWarningMessage();
    }
  },
  bindCustomEventListeners: function bindCustomEventListeners() {
    this.$el.on('change', 'input', _.bind(function (evt) {
      var value = evt.target.checked ? 'true' : 'false';
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