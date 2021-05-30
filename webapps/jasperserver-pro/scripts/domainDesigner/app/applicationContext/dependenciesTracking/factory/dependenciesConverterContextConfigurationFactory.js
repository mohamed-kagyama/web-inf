define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var DependenciesConverter = require("../../../component/dependenciesInspector/convertor/DependenciesConverter");

var TableReferencesReducer = require("../../../component/dependenciesInspector/convertor/reducer/TableReferencesReducer");

var TableReducer = require("../../../component/dependenciesInspector/convertor/reducer/TableReducer");

var FieldReducer = require("../../../component/dependenciesInspector/convertor/reducer/FieldReducer");

var FilterExpressionAndComplexReducer = require("../../../component/dependenciesInspector/convertor/reducer/FilterExpressionAndComplexReducer");

var TargetEntitiesReducer = require("../../../component/dependenciesInspector/convertor/reducer/TargetEntitiesReducer");

var AffectedEntitiesReducer = require("../../../component/dependenciesInspector/convertor/reducer/AffectedEntitiesReducer");

var OneSchemaToSchemalessReducer = require("../../../component/dependenciesInspector/convertor/reducer/OneSchemaToSchemalessReducer");

var GroupByTypeAndSortByNameReducer = require("../../../component/dependenciesInspector/convertor/reducer/GroupByTypeAndSortByNameReducer");

var DependencySourcePathGenerator = require("../../../component/dependenciesInspector/convertor/generator/DependencySourcePathGenerator");

var DependenciesToTreeNodeConverter = require("../../../component/dependenciesInspector/convertor/DependenciesToTreeNodeConverter");

var dependenciesSortSequenceEnum = require("../../../component/dependenciesInspector/enum/dependenciesSortSequenceEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var tableReducer = new TableReducer({});
    var fieldReducer = new FieldReducer({});
    var filterExpressionAndComplexReducer = new FilterExpressionAndComplexReducer({
      filterExpressionSerializer: options.filterExpressionSerializer
    });
    var tableReferencesReducer = new TableReferencesReducer({
      clientDomainSchemaService: options.clientDomainSchemaService
    });
    var targetEntitiesReducer = new TargetEntitiesReducer({});
    var affectedEntitiesReducer = new AffectedEntitiesReducer({});
    var oneSchemaToSchemalessReducer = new OneSchemaToSchemalessReducer();
    var groupByTypeAndSortByNameReducer = new GroupByTypeAndSortByNameReducer({
      dependenciesSortSequenceEnum: dependenciesSortSequenceEnum
    });
    var dependencySourcePathGenerator = new DependencySourcePathGenerator({
      schemaPathGenerationService: options.schemaPathGenerationService
    });
    var dependenciesToTreeNodeConverter = new DependenciesToTreeNodeConverter({
      itemHeight: options.dependencyItemHeight,
      dependencySourcePathGenerator: dependencySourcePathGenerator
    });
    return new DependenciesConverter({
      tableReducer: tableReducer,
      fieldReducer: fieldReducer,
      targetEntitiesReducer: targetEntitiesReducer,
      affectedEntitiesReducer: affectedEntitiesReducer,
      tableReferencesReducer: tableReferencesReducer,
      oneSchemaToSchemalessReducer: oneSchemaToSchemalessReducer,
      filterExpressionAndComplexReducer: filterExpressionAndComplexReducer,
      groupByTypeAndSortByNameReducer: groupByTypeAndSortByNameReducer,
      dependenciesToTreeNodeConverter: dependenciesToTreeNodeConverter
    });
  }
};

});