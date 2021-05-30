define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var _i18n = require("bundle!DomainDesignerBundle");

var columnSetUtil = require("../../util/columnSetUtil");

var propertyToPropertyNameEnum = require("../presentationItem/enum/propertyToPropertyNameEnum");

var template = require("text!./template/dataIslandOrSetTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      props: ['item', 'editProperty', 'tableRowClass', 'treeIconClass', 'eventName', 'column0Width', 'column1Width'],
      components: {
        presentationItem: options.presentationItem,
        property: options.property,
        cell: options.cell,
        propertyEditor: options.propertyEditor,
        inputGroup: options.inputGroup
      },
      computed: {
        i18n: function i18n() {
          return _i18n;
        },
        propertyNames: function propertyNames() {
          return propertyToPropertyNameEnum;
        }
      },
      methods: _.extend({}, columnSetUtil)
    };
  }
};

});