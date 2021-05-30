define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var SimpleModel = require("../../../../../../model/util/SimpleModel");

var i18n = require("bundle!DomainDesignerBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = SimpleModel.extend({
  defaults: function defaults() {
    return {
      isSaveEnabled: false,
      undo: false,
      redo: false,
      labels: {
        'save': i18n['domain.designer.menu.save'],
        'export': i18n['domain.designer.menu.export'],
        'import': i18n['domain.designer.menu.import'],
        'undo': i18n['domain.designer.menu.undo'],
        'redo': i18n['domain.designer.menu.redo'],
        'undoAll': i18n['domain.designer.menu.undoAll']
      }
    };
  }
});

});