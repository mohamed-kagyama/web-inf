define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var dependenciesGroupNamesEnum = require("./dependenciesGroupNamesEnum");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
var mapping = {};
mapping[dependenciesGroupNamesEnum.DATA_SOURCE] = 'Datasource';
mapping[dependenciesGroupNamesEnum.TABLE] = i18nMessage('domain.designer.dependenciesInspector.dialog.tables');
mapping[dependenciesGroupNamesEnum.TABLE_REFERENCE] = i18nMessage('domain.designer.dependenciesInspector.dialog.tables');
mapping[dependenciesGroupNamesEnum.FIELD] = i18nMessage('domain.designer.dependenciesInspector.dialog.field');
mapping[dependenciesGroupNamesEnum.PRESENTATION_FIELD] = i18nMessage('domain.designer.dependenciesInspector.dialog.presentationField');
mapping[dependenciesGroupNamesEnum.PRESENTATION_SET] = i18nMessage('domain.designer.dependenciesInspector.dialog.presentationSet');
mapping[dependenciesGroupNamesEnum.CALC_FIELD] = i18nMessage('domain.designer.dependenciesInspector.dialog.calcfields');
mapping[dependenciesGroupNamesEnum.DATA_ISLAND] = i18nMessage('domain.designer.dependenciesInspector.dialog.dataIslands');
mapping[dependenciesGroupNamesEnum.DATA_SOURCE_GROUP] = i18nMessage('domain.designer.dependenciesInspector.dialog.dataSourceGroup');
mapping[dependenciesGroupNamesEnum.DERIVED_TABLE] = i18nMessage('domain.designer.dependenciesInspector.dialog.derivedTables');
mapping[dependenciesGroupNamesEnum.CONSTANT_GROUP] = 'Constant Group';
mapping[dependenciesGroupNamesEnum.PRE_FILTER] = i18nMessage('domain.designer.dependenciesInspector.dialog.preFilters');
mapping[dependenciesGroupNamesEnum.JOIN_TREE] = i18nMessage('domain.designer.dependenciesInspector.dialog.joinTrees');
module.exports = mapping;

});