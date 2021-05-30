define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function DependenciesConverter(options) {
  options = options || {};

  _.bindAll(this, "convert");

  this.tableReducer = options.tableReducer;
  this.fieldReducer = options.fieldReducer;
  this.targetEntitiesReducer = options.targetEntitiesReducer;
  this.tableReferencesReducer = options.tableReferencesReducer;
  this.affectedEntitiesReducer = options.affectedEntitiesReducer;
  this.oneSchemaToSchemalessReducer = options.oneSchemaToSchemalessReducer;
  this.groupByTypeAndSortByNameReducer = options.groupByTypeAndSortByNameReducer;
  this.filterExpressionAndComplexReducer = options.filterExpressionAndComplexReducer;
  this.dependenciesToTreeNodeConverter = options.dependenciesToTreeNodeConverter;
}

_.extend(DependenciesConverter.prototype, {
  convert: function convert(entities, targetEntityOptions) {
    var self = this;
    var removedEntities = self.targetEntitiesReducer.reduce(entities.removedEntities, targetEntityOptions);
    var reducedRemovedEntities = self.tableReferencesReducer.reduce({
      collections: removedEntities,
      targetEntityOptions: targetEntityOptions,
      reducedCollections: removedEntities
    });
    reducedRemovedEntities = self.filterExpressionAndComplexReducer.reduce(removedEntities, reducedRemovedEntities);
    reducedRemovedEntities = self.tableReducer.reduce(reducedRemovedEntities);
    reducedRemovedEntities = self.fieldReducer.reduce(reducedRemovedEntities);
    reducedRemovedEntities = self.oneSchemaToSchemalessReducer.reduce({
      collections: removedEntities,
      targetEntityOptions: targetEntityOptions,
      reducedCollections: reducedRemovedEntities
    });
    reducedRemovedEntities = self.groupByTypeAndSortByNameReducer.reduce(reducedRemovedEntities);
    var leftGroupEntities = self.dependenciesToTreeNodeConverter.convert(reducedRemovedEntities);
    var reducedAffectedEntities = this.affectedEntitiesReducer.reduce(entities.affectedEntities, targetEntityOptions);
    reducedAffectedEntities = self.groupByTypeAndSortByNameReducer.reduce(reducedAffectedEntities);
    var rightGroupEntities = self.dependenciesToTreeNodeConverter.convert(reducedAffectedEntities);
    return {
      leftGroup: leftGroupEntities,
      rightGroup: rightGroupEntities
    };
  }
});

module.exports = DependenciesConverter;

});