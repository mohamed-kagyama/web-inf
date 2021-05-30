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
        name: joinTree.name
      },
      action: 'renameJoinTree',
      triggerEvent: 'show:renameDraftJoinTreeDialog'
    }, {
      label: '',
      value: false,
      cssClass: 'separator'
    }, {
      label: i18nMessage('domain.designer.joinsDesigner.joinTree.contextMenu.useMinimumPathJoins'),
      value: joinTree.useMinimumPathJoins,
      joinTree: {
        useMinimumPathJoins: joinTree.useMinimumPathJoins
      },
      action: 'toggleUseMinimumPathJoins',
      triggerEvent: 'draftJoinTree:toggle:useMinimumPathJoins'
    }, {
      label: i18nMessage('domain.designer.joinsDesigner.joinTree.contextMenu.useAllDataIslandJoins'),
      value: joinTree.useAllDataIslandJoins,
      joinTree: {
        useAllDataIslandJoins: joinTree.useAllDataIslandJoins
      },
      action: 'toggleUseAllDataIslandJoins',
      triggerEvent: 'draftJoinTree:toggle:useAllDataIslandJoins'
    }];
  }
};

});