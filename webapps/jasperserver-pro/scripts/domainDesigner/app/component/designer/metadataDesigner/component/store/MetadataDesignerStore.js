define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var SimpleModel = require("../../../../../../model/util/SimpleModel");

var placementsEnum = require("../../../../../common/component/enum/placementsEnum");

var i18n = require("bundle!CommonBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = SimpleModel.extend({
  defaults: function defaults() {
    return {
      isSourceTreeInvalid: false,
      popoverType: 'error',
      popoverTitle: i18n['error.title'],
      popoverPlacement: placementsEnum.RIGHT_TOP,
      popoverText: '',
      popoverOffset: {
        top: 0,
        left: 0
      },
      ownDesigner: '',
      currentDesigner: '',
      schemaAttributeInput: {
        isVisible: false,
        attribute: '',
        parentId: '',
        dataSourceGroupId: '',
        error: ''
      },
      resourceInfo: {
        availableResourcesTitle: '',
        selectedResourcesTitle: '',
        manageResource: '',
        dataObjectName: '',
        instructionText: '',
        instructionTitle: ''
      }
    };
  }
});

});