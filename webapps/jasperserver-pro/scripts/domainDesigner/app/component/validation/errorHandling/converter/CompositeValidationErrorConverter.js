define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CompositeValidationErrorConverter = function CompositeValidationErrorConverter(options) {
  this.initialize(options);
};

_.extend(CompositeValidationErrorConverter.prototype, {
  initialize: function initialize(options) {
    this.unknownErrorConverter = options.unknownErrorConverter;
    this.categoryAndErrorsConverterConfig = options.categoryAndErrorsConverterConfig;
  },
  convert: function convert(error, options) {
    options = options || {};
    error = error || {
      errorCode: ''
    };
    var errors = _.isArray(error) ? error : [error];

    var groupedErrors = this._groupErrors(errors);

    var convertedAndUnknownErrors = _.reduce(groupedErrors, function (memo, groupedError) {
      var converter = this.categoryAndErrorsConverterConfig[groupedError.errorCode],
          convertedError;

      if (converter) {
        convertedError = converter.convert(groupedError.errors, options);
      }

      if (convertedError) {
        memo.convertedErrors = memo.convertedErrors.concat(convertedError);
      } else {
        memo.unknownErrors = memo.unknownErrors.concat(groupedError.errors);
      }

      return memo;
    }, {
      convertedErrors: [],
      unknownErrors: []
    }, this);

    var convertedErrors = convertedAndUnknownErrors.convertedErrors,
        unknownErrors = convertedAndUnknownErrors.unknownErrors;

    var unknownErrorConverterOptions = _.extend({}, options, {
      convertedErrors: convertedErrors
    });

    var convertedUnknownErrors = this.unknownErrorConverter && this.unknownErrorConverter.convert(unknownErrors, unknownErrorConverterOptions);
    return convertedErrors.concat(convertedUnknownErrors || []);
  },
  _groupErrors: function _groupErrors(errors) {
    return _.reduce(errors, function (memo, error) {
      var errorCode = error.errorCode;
      var errors = memo.map[errorCode];

      if (!errors) {
        errors = [];
        memo.map[errorCode] = errors;
        memo.array.push({
          errorCode: errorCode,
          errors: errors
        });
      }

      errors.push(error);
      return memo;
    }, {
      map: {},
      array: []
    }, this).array;
  }
});

module.exports = CompositeValidationErrorConverter;

});