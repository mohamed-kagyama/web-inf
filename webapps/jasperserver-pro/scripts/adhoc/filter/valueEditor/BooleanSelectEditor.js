define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var AbstractValueEditor = require('./AbstractValueEditor');

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = AbstractValueEditor.extend({
  inputSelector: 'select',
  isMultiple: false,
  getDefaultViewModel: function getDefaultViewModel() {
    return {
      multiple: this.isMultiple,
      options: [{
        value: 'false',
        label: 'false'
      }, {
        value: 'true',
        label: 'true'
      }]
    };
  },
  serializeModel: function serializeModel() {
    var viewModel = this.getDefaultViewModel(),
        value = this.getValue() || '',
        selected;
    selected = _.find(viewModel.options, function (opt) {
      return opt.value === value;
    });

    if (selected) {
      selected.selected = true;
    }

    return viewModel;
  },
  events: function events() {
    var eventsObj = {};
    eventsObj['change ' + this.inputSelector] = 'onChange';
    return eventsObj;
  },
  onChange: function onChange() {
    var selected = this.$(this.inputSelector).val(),
        converted = this.convert(selected);
    this.setValue(converted);
  }
});

});