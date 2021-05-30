define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var DataSourceMenuOptionsFactory = function DataSourceMenuOptionsFactory(options) {
  _.bindAll(this, 'create');

  this.clientDomainSchemaService = options.clientDomainSchemaService;
};

_.extend(DataSourceMenuOptionsFactory.prototype, {
  create: function create() {
    var self = this;
    return [{
      label: i18nMessage('domain.designer.sidebar.addDomainResources.menu.createCalcField'),
      action: 'createCalcField',
      triggerEvent: 'createCalcField',
      cssClass: ''
    }, {
      label: i18nMessage('domain.designer.derivedTables.createDerivedTables'),
      action: 'createDerivedTable',
      triggerEvent: 'createDerivedTable',
      cssClass: ''
    }, {
      label: '',
      value: false,
      cssClass: 'separator'
    }, {
      label: i18nMessage('domain.designer.sidebar.dataSource.menu.replaceDataSource'),
      action: 'replaceDataSource',
      triggerEvent: 'replaceDataSource',
      cssClass: ''
    }, {
      label: i18nMessage('domain.designer.sidebar.dataSource.menu.clearAllData'),
      action: 'clearAllData',
      triggerEvent: 'clearAllData',
      cssClass: '',
      test: function test() {
        return self.clientDomainSchemaService.getDataSourcesCount();
      }
    }];
  }
});

module.exports = DataSourceMenuOptionsFactory;

});