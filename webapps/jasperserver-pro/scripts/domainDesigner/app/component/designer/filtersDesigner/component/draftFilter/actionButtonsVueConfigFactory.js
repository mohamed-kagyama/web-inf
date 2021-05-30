define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!./template/actionButtonsTemplate.htm");

var i18nComputed = require("../../../../../common/vue/computed/i18nComputed");

var filterTypeUtil = require("../../util/filterTypeUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      props: ['filter'],
      components: {},
      computed: _.extend({
        isOkEnabled: function isOkEnabled() {
          var leftType = this.filter.leftOperand.type,
              rightType = this.filter.rightOperand.type;

          if (filterTypeUtil.isFieldToFieldFilter(leftType, rightType)) {
            return this.filter.leftOperand.fieldId && this.filter.rightOperand.fieldId;
          }

          return this.filter.leftOperand.fieldId;
        }
      }, i18nComputed),
      methods: {
        onCancelClick: function onCancelClick() {
          options.filtersDesignerEventBus.trigger('draftFilter:cancel');
        },
        onOkClick: function onOkClick() {
          options.filtersDesignerEventBus.trigger('draftFilter:edit');
        }
      }
    };
  }
};

});