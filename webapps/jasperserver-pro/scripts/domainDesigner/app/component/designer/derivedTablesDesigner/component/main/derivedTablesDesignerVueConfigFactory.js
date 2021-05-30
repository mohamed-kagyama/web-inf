define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var i18nComputed = require("../../../../../common/vue/computed/i18nComputed");

var queryRunningSourceEnum = require("../../enum/queryRunningSourceEnum");

var template = require("text!./template/derivedTablesDesignerTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  create: function create(options) {
    options = options || {};
    return {
      template: template,
      components: {
        virtualData: options.VirtualData
      },
      computed: _.extend({
        isCreateOrUpdateTableInProgress: function isCreateOrUpdateTableInProgress() {
          return this.isQueryRunning && this.queryRunningSource === queryRunningSourceEnum.CREATE_OR_UPDATE_DERIVED_TABLE;
        },
        isRunQueryInProgress: function isRunQueryInProgress() {
          return this.isQueryRunning && this.queryRunningSource === queryRunningSourceEnum.RUN_QUERY;
        },
        isCreateOrUpdateButtonDisabled: function isCreateOrUpdateButtonDisabled() {
          return _.isEmpty(this.query) || this.isRunQueryInProgress || _.isEmpty(this.selection.fields) && !_.isEmpty(this.queryAfterPreviousExecution);
        },
        isRunQueryDisabled: function isRunQueryDisabled() {
          return _.isEmpty(this.query) || this.isCreateOrUpdateTableInProgress;
        },
        selectedFields: function selectedFields() {
          return _.reduce(this.selection.fields, function (memo, index, fieldName) {
            memo[fieldName] = true;
            return memo;
          }, {});
        },
        virtualDataStyleObject: function virtualDataStyleObject() {
          return {
            height: this.queryResultSetHeight + 'px',
            overflowY: 'auto',
            width: '100%'
          };
        },
        tableNameErrorMessageStyle: function tableNameErrorMessageStyle() {
          return this.tableNameErrorMessage ? {} : {
            visibility: 'hidden'
          };
        },
        queryErrorMessageStyle: function queryErrorMessageStyle() {
          return this.queryErrorMessage ? {} : {
            visibility: 'hidden'
          };
        },
        cancelCreateOrUpdateButtonLabel: function cancelCreateOrUpdateButtonLabel() {
          if (this.id) {
            return i18nMessage('domain.designer.dialog.cancel.update');
          } else {
            return i18nMessage('domain.designer.dialog.cancel.creation');
          }
        },
        isCreateOrUpdateTableInProgressLabel: function isCreateOrUpdateTableInProgressLabel() {
          if (this.id) {
            return i18nMessage('domain.designer.dialog.updating');
          } else {
            return i18nMessage('domain.designer.dialog.creating');
          }
        },
        derivedTableDesignerTitleText: function derivedTableDesignerTitleText() {
          if (this.id) {
            return i18nMessage('domain.designer.derivedTables.createDerivedTables.dialog.title.edit');
          } else {
            return i18nMessage('domain.designer.derivedTables.createDerivedTables.dialog.title.new');
          }
        }
      }, i18nComputed),
      methods: {
        onCreateDerivedTable: function onCreateDerivedTable() {
          this.$options.derivedTablesDesignerEventBus.trigger('derivedTablesDesignerView:createDerivedTable');
        },
        onUpdateDerivedTable: function onUpdateDerivedTable() {
          this.$options.derivedTablesDesignerEventBus.trigger('derivedTablesDesignerView:updateDerivedTable');
        },
        onRunQuery: function onRunQuery() {
          this.$options.derivedTablesDesignerEventBus.trigger('derivedTablesDesignerView:runQuery');
        },
        onCancelQuery: function onCancelQuery() {
          this.$options.derivedTablesDesignerEventBus.trigger('derivedTablesDesignerView:cancelQuery');
        },
        onCancel: function onCancel() {
          this.$options.derivedTablesDesignerEventBus.trigger('derivedTablesDesignerView:cancel');
        },
        selectField: function selectField(field, $event) {
          if (!this.isQueryRunning && !$event.shiftKey && !$event.ctrlKey && !$event.metaKey) {
            this.$options.derivedTablesDesignerEventBus.trigger('derivedTablesDesignerView:selectField', field);
          }
        },
        toggleFieldSelection: function toggleFieldSelection(field, index) {
          if (!this.isQueryRunning) {
            this.$options.derivedTablesDesignerEventBus.trigger('derivedTablesDesignerView:toggleFieldSelection', field);
          }
        },
        addToRangeSelection: function addToRangeSelection(field, index) {
          if (!this.isQueryRunning) {
            this.$options.derivedTablesDesignerEventBus.trigger('derivedTablesDesignerView:addToRangeSelection', field);
          }
        }
      }
    };
  }
};

});