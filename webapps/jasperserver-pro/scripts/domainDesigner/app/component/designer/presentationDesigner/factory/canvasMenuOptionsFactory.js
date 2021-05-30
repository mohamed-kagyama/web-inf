define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var columnSetEnum = require("../enum/columnSetEnum");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  create: function create(columnSet) {
    return [{
      label: i18nMessage('domain.designer.presentationDesigner.columnSet.default'),
      value: columnSet === columnSetEnum.DEFAULT,
      action: 'defaultColumnSet',
      triggerEvent: 'select:defaultColumnSet'
    }, {
      label: i18nMessage('domain.designer.presentationDesigner.columnSet.identification'),
      value: columnSet === columnSetEnum.IDENTIFICATION,
      action: 'identificationColumnSet',
      triggerEvent: 'select:identificationColumnSet'
    }, {
      label: i18nMessage('domain.designer.presentationDesigner.columnSet.bundleKeys'),
      value: columnSet === columnSetEnum.BUNDLE_KEYS,
      action: 'bundleKeysColumnSet',
      triggerEvent: 'select:bundleKeysColumnSet'
    }, {
      label: i18nMessage('domain.designer.presentationDesigner.columnSet.data'),
      value: columnSet === columnSetEnum.DATA,
      action: 'dataColumnSet',
      triggerEvent: 'select:dataColumnSet'
    }, {
      label: '',
      value: '',
      cssClass: 'separator'
    }, {
      label: i18nMessage('domain.designer.presentationDesigner.canvasMenu.expandAll'),
      action: 'expandAllProperties',
      value: '',
      triggerEvent: 'select:expandAllProperties'
    }, {
      label: i18nMessage('domain.designer.presentationDesigner.canvasMenu.collapseAll'),
      action: 'collapseAllProperties',
      value: '',
      triggerEvent: 'select:collapseAllProperties'
    }];
  }
};

});