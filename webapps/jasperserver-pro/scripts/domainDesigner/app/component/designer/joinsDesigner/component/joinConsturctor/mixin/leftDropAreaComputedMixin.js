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
  computed: {
    isResourceDropped: function isResourceDropped() {
      return this.state.tableReferenceId && this.state.fieldId;
    },
    label: function label() {
      if (this.state.tableReferenceLabel && this.state.fieldLabel) {
        return this.state.tableReferenceLabel + ':' + this.state.fieldLabel;
      }

      return '';
    },
    isLabelVisible: function isLabelVisible() {
      return this.isResourceDropped;
    },
    placeholder: function placeholder() {
      return i18nMessage('domain.designer.joinsDesigner.dropArea.dragField');
    }
  }
};

});