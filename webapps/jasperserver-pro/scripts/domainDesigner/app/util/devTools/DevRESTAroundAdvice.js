define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DevRESTAroundAdvice = function DevRESTAroundAdvice(options) {
  _.bindAll(this, 'around', '_onError');

  this.devTools = options.devTools;
};

_.extend(DevRESTAroundAdvice.prototype, {
  around: function around(name, originalInvocation) {
    var passedArguments = Array.prototype.slice.call(arguments, 2);
    var result = originalInvocation.apply(null, passedArguments);

    var isPromise = _.isObject(result) && _.isFunction(result.fail);

    var isPrivateMethod = name.indexOf('_') === 0;

    if (isPromise && !isPrivateMethod) {
      result = result.fail(this._onError);
    }

    return result;
  },
  _onError: function _onError(xhr, status, errorMessage) {
    this.devTools.setError({
      statusCode: xhr.status,
      statusMessage: status,
      response: this._parseResponse(xhr.responseText),
      message: errorMessage
    });
  },
  _parseResponse: function _parseResponse(responseText) {
    try {
      return JSON.parse(responseText);
    } catch (e) {
      return responseText;
    }
  }
});

module.exports = DevRESTAroundAdvice;

});