define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  create: function create(options) {
    var fieldName = options.fieldName,
        dataIslandName = options.dataIslandName,
        tableReferenceName = options.tableReferenceName;
    return {
      message: i18nMessage('domain.designer.joinsDesigner.create.join.attentionDialog.validationMessage'),
      details: i18nMessage('domain.designer.joinsDesigner.create.join.attentionDialog.validationMessageDetails', fieldName, tableReferenceName, dataIslandName)
    };
  }
};

});