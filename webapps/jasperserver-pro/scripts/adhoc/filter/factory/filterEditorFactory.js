define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var FilterEditor = require('../editor/FilterEditor');

var ReadOnlyFilterEditor = require('../editor/ReadOnlyFilterEditor');

var OlapFilterEditor = require('../editor/OlapFilterEditor');

var filterDataTypes = require('../enum/filterDataTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (filterDataType, isOlap) {
  var editorConstructor;

  if (isOlap) {
    editorConstructor = OlapFilterEditor;
  } else {
    editorConstructor = filterDataType === filterDataTypes.READ_ONLY ? ReadOnlyFilterEditor : FilterEditor;
  }

  return function (model) {
    return new editorConstructor({
      model: model
    });
  };
};

});