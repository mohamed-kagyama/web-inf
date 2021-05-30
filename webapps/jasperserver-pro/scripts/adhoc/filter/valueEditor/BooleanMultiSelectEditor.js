define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BooleanSelectEditor = require('./BooleanSelectEditor');

var _ = require('underscore');

var filterOperators = require('../enum/filterOperators');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BooleanSelectEditor.extend({
  isMultiple: true,
  serializeModel: function serializeModel() {
    var viewModel = this.getDefaultViewModel(),
        // True All is supported only for IN operator
    trueAll = this.model.get('isAnyValue') && this.model.get('operatorName') === filterOperators.IN,
        selected = {
      'true': trueAll,
      'false': trueAll
    };

    if (!trueAll) {
      var modelValue = this.getValue();

      _.each(modelValue, function (value) {
        selected[value] = true;
      });
    }

    _.each(viewModel.options, function (option) {
      option.selected = selected[option.value] || false;
    });

    return viewModel;
  },
  setValue: function setValue(selected) {
    if (this.model.get('operatorName') === filterOperators.IN) {
      this.model.attributes.isAnyValue = selected && selected.length === 2;

      if (this.model.get('isAnyValue')) {
        selected = [];
      }
    }

    BooleanSelectEditor.prototype.setValue.call(this, selected || []);
  }
});

});