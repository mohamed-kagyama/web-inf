/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,t){function d(e){e=e||{},c.bindAll(this,"convert"),this.tableReducer=e.tableReducer,this.fieldReducer=e.fieldReducer,this.targetEntitiesReducer=e.targetEntitiesReducer,this.tableReferencesReducer=e.tableReferencesReducer,this.affectedEntitiesReducer=e.affectedEntitiesReducer,this.oneSchemaToSchemalessReducer=e.oneSchemaToSchemalessReducer,this.groupByTypeAndSortByNameReducer=e.groupByTypeAndSortByNameReducer,this.filterExpressionAndComplexReducer=e.filterExpressionAndComplexReducer,this.dependenciesToTreeNodeConverter=e.dependenciesToTreeNodeConverter}var c=e("underscore");c.extend(d.prototype,{convert:function(e,r){var t=this,d=t.targetEntitiesReducer.reduce(e.removedEntities,r),c=t.tableReferencesReducer.reduce({collections:d,targetEntityOptions:r,reducedCollections:d});c=t.filterExpressionAndComplexReducer.reduce(d,c),c=t.tableReducer.reduce(c),c=t.fieldReducer.reduce(c),c=t.oneSchemaToSchemalessReducer.reduce({collections:d,targetEntityOptions:r,reducedCollections:c}),c=t.groupByTypeAndSortByNameReducer.reduce(c);var n=t.dependenciesToTreeNodeConverter.convert(c),o=this.affectedEntitiesReducer.reduce(e.affectedEntities,r);return o=t.groupByTypeAndSortByNameReducer.reduce(o),{leftGroup:n,rightGroup:t.dependenciesToTreeNodeConverter.convert(o)}}}),t.exports=d});