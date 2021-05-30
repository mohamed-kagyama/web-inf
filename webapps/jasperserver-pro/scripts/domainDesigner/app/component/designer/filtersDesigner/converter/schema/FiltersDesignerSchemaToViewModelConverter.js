define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var operandSideEnum = require("../../enum/operandSideEnum");

var byIdReducer = require("../../../../../common/util/byIdReducer");

var filterOperandTypeUtil = require("../../util/filterOperandTypeUtil");

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

var filtersDesignerUtil = require("../../util/filtersDesignerUtil");

var numberUtil = require("../../../../../common/util/numberUtil");

var schemaEntitiesEnum = require("../../../../../../model/schema/enum/schemaEntitiesEnum");

var schemaModelUtil = require("../../../../../../model/schema/util/schemaModelUtil");

var collectionComponentsVisibilityUtil = require("../../../../../util/designer/collectionComponentsVisibilityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FiltersDesignerSchemaToViewModelConverter = function FiltersDesignerSchemaToViewModelConverter(options) {
  this.settings = options.settings;
  this.filterExpressionSerializer = options.filterExpressionSerializer;
  this.filtersDesignerViewStateModelService = options.filtersDesignerViewStateModelService;
  this.shouldDropZoneBeActiveSpecification = options.shouldDropZoneBeActiveSpecification;
};

_.extend(FiltersDesignerSchemaToViewModelConverter.prototype, {
  convert: function convert(state) {
    var dataStore = state.dataStore,
        draftFilterState = this.filtersDesignerViewStateModelService.getDraftFilterState();
    var maps = {
      tablesMap: dataStore.tables.reduce(byIdReducer, {}),
      fieldsMap: dataStore.fields.reduce(byIdReducer, {}),
      tableReferencesMap: dataStore.tableReferences.reduce(byIdReducer, {}),
      joinAliasesMap: dataStore.joinAliases.reduce(byIdReducer, {})
    };
    var convertedDraftFilter,
        mapperOptions = {
      state: state,
      maps: maps
    };

    if (!_.isEmpty(draftFilterState)) {
      if (draftFilterState.id) {
        mapperOptions.draftFilterState = draftFilterState;
      } else {
        convertedDraftFilter = this._convertDraftFilter(state, draftFilterState);
      }
    }

    var filters = dataStore.filters.reduce(_.bind(this._filterReducer, this, mapperOptions), []);
    filters = this._sortFilters(filters);

    if (convertedDraftFilter) {
      filters = filters.concat([convertedDraftFilter]);
    }

    return filters;
  },
  _sortFilters: function _sortFilters(filters) {
    var filtersPositions = this.filtersDesignerViewStateModelService.getFiltersPositions();
    return _.sortBy(filters, function (filter) {
      return filtersPositions[filter.id];
    });
  },
  _filterReducer: function _filterReducer(options, memo, filter) {
    var state = options.state,
        draftFilterState = options.draftFilterState,
        convertedFilter;

    if (draftFilterState && filter.getId() === draftFilterState.id) {
      convertedFilter = this._convertDraftFilter(state, draftFilterState);
    } else if (entityUtil.isFilterExpression(filter)) {
      convertedFilter = this._convertFilterExpression(state, filter);
    } else if (entityUtil.isComplexFilter(filter)) {
      convertedFilter = this._convertComplexFilterExpression(state, filter);
    }

    var searchKeyword = filtersDesignerUtil.getSearchKeyword(state);
    var matchSearchKeywordOptions = {
      filter: filter,
      maps: options.maps,
      convertedFilter: convertedFilter,
      searchKeyword: searchKeyword
    };

    if (this._isFilterMatchSearchKeyword(matchSearchKeywordOptions)) {
      memo.push(convertedFilter);
    }

    return memo;
  },
  _isFilterMatchSearchKeyword: function _isFilterMatchSearchKeyword(options) {
    var convertedFilter = options.convertedFilter,
        searchKeyword = options.searchKeyword,
        filter = options.filter,
        maps = options.maps;

    if (_.isEmpty(searchKeyword) || convertedFilter.isDraft) {
      return true;
    }

    var filterExpression;

    if (entityUtil.isFilterExpression(convertedFilter.type)) {
      filterExpression = [convertedFilter.rightString, convertedFilter.leftString, convertedFilter.operatorString];

      if (numberUtil.isInteger(convertedFilter.rightString) || numberUtil.isDecimal(convertedFilter.rightString)) {
        filterExpression.push(numberUtil.removeThousandsDelimiter(convertedFilter.rightString));
      }
    } else {
      filterExpression = [convertedFilter.expression];
    }

    filterExpression = filter.fieldReferences.reduce(function (memo, fieldReference) {
      var field = maps.fieldsMap[fieldReference.fieldId],
          table,
          joinAlias,
          tableReference;

      if (entityUtil.isTableReference(fieldReference.sourceType)) {
        tableReference = maps.tableReferencesMap[fieldReference.sourceId];
      } else if (entityUtil.isJoinAlias(fieldReference.sourceType)) {
        joinAlias = maps.joinAliasesMap[fieldReference.sourceId];
        tableReference = maps.tableReferencesMap[joinAlias.tableReferenceId];
      }

      if (tableReference) {
        table = maps.tablesMap[tableReference.tableId];
      }

      if (field.sourceName) {
        filterExpression.push(field.sourceName);
      }

      if (table) {
        filterExpression.push(table.name);
      }

      return filterExpression;
    }, filterExpression);
    return _.some(filterExpression, function (string) {
      return collectionComponentsVisibilityUtil.matchSearchKeyword(string, searchKeyword);
    });
  },
  _convertComplexFilterExpression: function _convertComplexFilterExpression(state, filter) {
    var filterType = schemaEntitiesEnum.COMPLEX_FILTER;
    return {
      id: filter.getId(),
      type: filterType,
      sourceId: filter.getSourceId(),
      sourceType: filter.getSourceType(),
      height: this.settings.height[filterType],
      expression: filter.expression.string
    };
  },
  _convertDraftFilter: function _convertDraftFilter(state, filter) {
    var filterType = schemaEntitiesEnum.FILTER_EXPRESSION,
        expression = filter.expression,
        operator = expression.operator;
    var options = {
      state: state,
      filter: filter
    };

    var leftOperandOptions = _.extend({
      which: operandSideEnum.LEFT
    }, options);

    var rightOperandOptions = _.extend({
      which: operandSideEnum.RIGHT
    }, options);

    var rightOperand = this._convertDraftFilterOperand(expression.right, rightOperandOptions),
        leftOperand = this._convertDraftFilterOperand(expression.left, leftOperandOptions);

    var height = this._getDraftFilterHeight({
      filterType: filterType,
      rightOperandType: rightOperand.type,
      isRawValueEditor: filter.isRawValueEditor,
      errors: filter.errors
    });

    return {
      id: filter.id,
      isDraft: true,
      dataType: filter.dataType,
      errors: filter.errors,
      isRawValueEditor: filter.isRawValueEditor,
      type: filterType,
      sourceId: filter.sourceId,
      sourceType: filter.sourceType,
      height: height,
      leftOperand: leftOperand,
      operator: operator,
      rightOperand: rightOperand
    };
  },
  _getDraftFilterHeight: function _getDraftFilterHeight(options) {
    var filterType = options.filterType,
        rightOperandType = options.rightOperandType,
        isRawValueEditor = options.isRawValueEditor,
        errors = options.errors;
    var height = this.settings.height[filterType].edit[rightOperandType];

    if (filterOperandTypeUtil.isLiteral(rightOperandType)) {
      height = isRawValueEditor ? height.rawValueEditor : height.singleSelectEditor;
    }

    var hasErrors = this._hasErrors(errors, rightOperandType);

    return height[hasErrors ? 'error' : 'normal'];
  },
  _hasErrors: function _hasErrors(filterErrors, rightOperandType) {
    var errors = filterErrors && filterErrors.right;
    var hasErrors = !_.isEmpty(errors);

    if (hasErrors && filterOperandTypeUtil.isRange(rightOperandType)) {
      hasErrors = errors.startErrorMessage || errors.endErrorMessage;
    } else if (hasErrors) {
      hasErrors = errors.errorMessage;
    }

    return hasErrors;
  },
  _convertDraftFilterOperand: function _convertDraftFilterOperand(operand, options) {
    if (filterOperandTypeUtil.isVariable(operand.type)) {
      return this._convertDraftFilterVariable(operand, options);
    } else if (filterOperandTypeUtil.isRange(operand.type)) {
      return this._convertDraftFilterRange(operand, options);
    } else if (filterOperandTypeUtil.isList(operand.type)) {
      return this._convertDraftFilterList(operand, options);
    } else if (filterOperandTypeUtil.isLiteral(operand.type)) {
      return this._convertDraftFilterLiteral(operand, options);
    }
  },
  _convertDraftFilterVariable: function _convertDraftFilterVariable(operand, options) {
    var filter = options.filter,
        state = options.state,
        which = options.which;
    var variable = {
      type: operand.type
    };

    if (!_.isUndefined(operand.fieldId)) {
      var field = state.dataStore.fields.byId(operand.fieldId),
          source = schemaModelUtil.getResourceByIdAndType(operand.sourceId, operand.sourceType, state.dataStore);
      variable = _.extend(variable, {
        fieldName: field.getName(),
        sourceName: source.getName()
      }, operand);
    }

    variable = _.extend(variable, {
      which: which
    });

    if (this.shouldDropZoneBeActiveSpecification.isSatisfiedBy(filter, which)) {
      variable = _.extend(variable, {
        shouldDropZoneBeActive: true
      });
    }

    return variable;
  },
  _convertDraftFilterRange: function _convertDraftFilterRange(operand, options) {
    return operand;
  },
  _convertDraftFilterList: function _convertDraftFilterList(operand, options) {
    return operand;
  },
  _convertDraftFilterLiteral: function _convertDraftFilterLiteral(operand, options) {
    return operand;
  },
  _convertFilterExpression: function _convertFilterExpression(state, filter) {
    var filterType = entityUtil.getEntityName(filter);
    var serializedFilterExpression = this.filterExpressionSerializer.serialize(filter);
    return _.extend({
      id: filter.getId(),
      sourceId: filter.getSourceId(),
      sourceType: filter.getSourceType(),
      height: this.settings.height[filterType].readOnly,
      type: filterType
    }, serializedFilterExpression);
  }
});

module.exports = FiltersDesignerSchemaToViewModelConverter;

});