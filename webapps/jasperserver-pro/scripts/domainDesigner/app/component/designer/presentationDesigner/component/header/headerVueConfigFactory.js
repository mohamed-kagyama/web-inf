define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var _i18n = require("bundle!DomainDesignerBundle");

var columnSetUtil = require("../../util/columnSetUtil");

var template = require("text!./template/headerTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      props: ['scrollBarWidth', 'isScrollBarPresent', 'column0Width', 'column1Width', 'columnSet'],
      mixins: options.mixins,
      components: {
        cell: options.cell,
        textCell: options.textCell
      },
      directives: {
        clickMenu: options.clickMenuDirective
      },
      computed: {
        i18n: function i18n() {
          return _i18n;
        },
        fullWidthCorrection: function fullWidthCorrection() {
          if (this.isScrollBarPresent) {
            return this.scrollBarWidth + 'px';
          } else {
            return 'initial';
          }
        },
        canvasMenuOptions: function canvasMenuOptions() {
          return options.canvasMenuOptionsFactory.create(this.columnSet);
        }
      },
      methods: _.extend({}, columnSetUtil)
    };
  }
};

});