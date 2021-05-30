define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var messageTypesEnum = require("../../../../../common/component/validation/enum/messageTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create() {
    return {
      title: i18n["domain.designer.joinsDesigner.dialog.renameTable"],
      inputLabel: i18n["domain.designer.joinsDesigner.dialog.renameTable.inputLabel"],
      validationMessage: "",
      validationType: messageTypesEnum.ERROR,
      value: "",
      originalValue: "",
      show: false,
      focusInputOnShow: true,
      selectValueOnShow: true,
      tableReferenceId: null
    };
  }
};

});