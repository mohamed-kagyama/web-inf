define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  enter: function enter(context, stateFactory) {
    var deferred = context.deferred,
        currentFilter = context.currentFilter,
        newFilterOptions = context.newFilterOptions,
        error;

    _.extend(currentFilter.expression, {
      operator: newFilterOptions.operator,
      right: newFilterOptions.rightOperand
    });

    if (_.isEmpty(context.error) && !_.isEmpty(currentFilter.errors.right)) {
      error = currentFilter.errors.right;
    } else {
      error = {
        errorMessage: context.error
      };
    }

    currentFilter.errors = {
      right: error
    };

    if (!_.isUndefined(newFilterOptions.isRawValueEditor)) {
      _.extend(currentFilter, {
        isRawValueEditor: newFilterOptions.isRawValueEditor
      });
    }

    deferred.resolve(currentFilter);
  }
};

});