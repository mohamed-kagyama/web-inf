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
  create: function create(joinTree) {
    return [{
      label: i18nMessage('domain.designer.joinsDesigner.joinTree.contextMenu.rename'),
      value: false,
      joinTree: {
        id: joinTree.id,
        name: joinTree.name
      },
      action: 'renameJoinTree',
      triggerEvent: 'show:renameJoinTreeDialog'
    }, {
      label: '',
      value: false,
      cssClass: 'separator'
    }, {
      label: i18nMessage('domain.designer.joinsDesigner.joinTree.contextMenu.useMinimumPathJoins'),
      value: joinTree.useMinimumPathJoins,
      joinTree: {
        id: joinTree.id,
        useMinimumPathJoins: joinTree.useMinimumPathJoins
      },
      action: 'toggleUseMinimumPathJoins',
      triggerEvent: 'toggle:useMinimumPathJoins'
    }, {
      label: i18nMessage('domain.designer.joinsDesigner.joinTree.contextMenu.useAllDataIslandJoins'),
      value: joinTree.useAllDataIslandJoins,
      joinTree: {
        id: joinTree.id,
        useAllDataIslandJoins: joinTree.useAllDataIslandJoins
      },
      action: 'toggleUseAllDataIslandJoins',
      triggerEvent: 'toggle:useAllDataIslandJoins'
    }];
  }
};

});