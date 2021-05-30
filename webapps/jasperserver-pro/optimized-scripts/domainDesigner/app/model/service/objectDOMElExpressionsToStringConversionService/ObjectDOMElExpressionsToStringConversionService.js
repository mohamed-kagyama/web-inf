/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../model/schema/util/entityUtil"],function(e,r,t){var i=e("underscore"),s=e("../../../../model/schema/util/entityUtil"),n=function(e){this.initialize(e)};i.extend(n.prototype,{initialize:function(e){this.validationService=e.validationService,this.filterExpressionsSerializer=e.filterExpressionsSerializer,this.entityFactory=e.entityFactory,this.complexFilterExpressionsWithContextProvider=e.complexFilterExpressionsWithContextProvider},convertObjectDOMElExpressionsToString:function(e){var r=this,t=this._getTableReferencesFilters(e),i=this._getJoinTreesFilters(e),s=this._createComplexFilters(t),n=this._createComplexFilters(i),o=s.concat(n),l=this.complexFilterExpressionsWithContextProvider.getExpressionsWithContext(o,e);return this.validationService.validateDOMElCollection(l).then(function(e){return r._updateComplexFilterExpressions({expressionContexts:e.expressionContexts,tableReferencesFilters:s,joinTreesFilters:n})}).then(function(s){return r._replaceFiltersToComplexFilters({dataStore:e,complexFilters:s,filters:t.concat(i)})})},_getTableReferencesFilters:function(e){var r=this;return e.tableReferences.reduce(function(t,i){var s,n,o=i.filters.toArray();return o.length&&(n=o.reduce(function(e,r){return e.concat(r.fieldReferences.toArray())},[]),s=r.filterExpressionsSerializer.serializeTableReferenceFilters(i,e),t.push({source:i,expression:s,fieldReferences:n})),t},[])},_getJoinTreesFilters:function(e){var r=this;return e.joinTrees.reduce(function(t,i){var s,n,o=i.filters.toArray();return o.length&&(n=o.reduce(function(e,r){return e.concat(r.fieldReferences.toArray())},[]),s=r.filterExpressionsSerializer.serializeJoinTreeFilters(i,e),t.push({source:i,expression:s,fieldReferences:n})),t},[],this)},_createComplexFilters:function(e){return i.map(e,function(e){var r=this.entityFactory.createComplexFilter({sourceId:e.source.id,sourceType:s.getEntityName(e.source),expression:e.expression});return r.setFieldReferences(e.fieldReferences),r},this)},_updateComplexFilterExpressions:function(e){var r=e.expressionContexts,t=e.tableReferencesFilters,s=e.joinTreesFilters,n=r.slice(0,t.length),o=r.slice(n.length,r.length);return i.each(n,function(e,r){t[r].setExpression({string:e.expression.string})}),i.each(o,function(e,r){s[r].setExpression({string:e.expression.string})}),t.concat(s)},_replaceFiltersToComplexFilters:function(e){var r=e.dataStore,t=e.filters,s=e.complexFilters,n=i.reduce(s,function(e,r){return e[r.sourceId]=r,e},{});return i.each(t,function(e){var r=e.source;r.filters.fromArray([n[r.id]])}),r.filters.fromArray(s),r}}),t.exports=n});