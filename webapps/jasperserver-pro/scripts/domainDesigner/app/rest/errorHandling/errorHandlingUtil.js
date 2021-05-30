define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getErrorParameters(response) {
  return response.properties || response.parameters || [];
}

function getError(response) {
  var parameters = getErrorParameters(response);
  var error = {
    errorCode: response.errorCode,
    parameters: parameters
  };

  if (response.details) {
    error.details = _getErrors(response.details);
  }

  return error;
}

function _getErrors(response) {
  response = _.isArray(response) ? response : [response];
  return _.map(response, getError);
}

function getResponseJson(xhr) {
  var responseJson = {};

  if (xhr.responseJSON) {
    responseJson = xhr.responseJSON;
  } else if (xhr.responseText) {
    try {
      responseJson = JSON.parse(xhr.responseText);
    } catch (e) {}
  }

  return responseJson;
}

module.exports = {
  getErrors: function getErrors(xhr) {
    return _getErrors(getResponseJson(xhr));
  }
};

});