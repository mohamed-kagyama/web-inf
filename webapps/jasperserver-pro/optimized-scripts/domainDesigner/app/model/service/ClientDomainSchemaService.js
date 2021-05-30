/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../model/schema/mixin/allCollectionsMixin","../../util/pathUtil","../../../model/schema/util/entityUtil","../../../model/schema/util/schemaModelUtil","../../../util/graphUtil","../../../model/schema/enum/fieldTypesToGenericTypesEnum"],function(e,t,n){var i=e("underscore"),r=e("../../../model/schema/mixin/allCollectionsMixin"),a=e("../../util/pathUtil"),s=e("../../../model/schema/util/entityUtil"),o=e("../../../model/schema/util/schemaModelUtil"),d=e("../../../util/graphUtil"),l=e("../../../model/schema/enum/fieldTypesToGenericTypesEnum"),u=function(e){this.initialize(e)};i.extend(u.prototype,{initialize:function(e){i.bindAll(this,"_resourceWithExpressionMapper"),this.dataStore=e.dataStore,this.serverSchemaModelSerializer=e.serverSchemaModelSerializer,this.domainSchemaService=e.domainSchemaService,this.constantDataIslandNameGenerator=e.constantDataIslandNameGenerator,this.domainSchemaSpecification=e.domainSchemaSpecification,this.mixInAllCollections(this.dataStore)},getFieldsAsMap:function(){return this.fields.reduce(function(e,t){return e[t.getId()]=t.toJSON(),e},{})},getDataStore:function(){return this.dataStore.clone()},serialize:function(){return this.dataStore.serialize()},serializeWithDataAdapter:function(){return this.serverSchemaModelSerializer.toJSON(this.dataStore.getCollections())},getTablesCount:function(e){return this.tables.filter(i.partial(this._filterTableByDataSourceId,e)).length},getFieldsSize:function(){return this.fields.size()},getAllGenericTablesWithParents:function(e){var t=this;return this.tables.chain().filter(s.isGenericTable).filter(i.partial(this._filterTableByDataSourceId,e)).map(function(n){var r=o.getResourceParents(n,{dataSourceGroups:t.dataSourceGroups,dataSources:t.dataSources}).map(function(t){var n=i.extend(t.toJSON(),{type:s.getEntityName(t)});return s.isDataSource(t)||(n=i.extend({},n,{parentId:i.result(t,"getParentId"),dataSourceId:e})),n});return n=i.extend({parentId:n.getParentId(),dataSourceId:e},n.toJSON()),{table:n,parents:r}}).toArray()},getAllTablesByDataSourceGroups:function(e){e=i.isArray(e)?e:[e];var t=i.reduce(e,function(e,t){return e[t]=!0,e},{});return this.tables.reduce(function(e,n){return t[n.parentId]&&e.push(n.toJSON()),e},[])},getSourceLessDataIslands:function(){return o.getSourceLessDataIslands(this.dataStore.getCollections()).map(function(e){return e.toJSON()})},getChildrenLessDataIslands:function(){return o.getChildrenLessDataIslands(this.dataStore.getCollections()).map(function(e){return e.toJSON()})},getDataSourceById:function(e){return this.dataSources.byId(e).toJSON()},getDataSourcesCount:function(){return this.dataSources.size()},getDerivedTableJsonByIdWithFields:function(e){var t=this.tables.byId(e),n=t.toJSON();return i.extend(n,{children:t.getChildren().map(function(e){return e.toJSON()}),dataSourceId:t.dataSourceId,parentId:t.parentId}),n},isDerivedTable:function(e){var t=this.tables.byId(e);return s.isDerivedTable(t)},getFirstDataSource:function(){return this.dataSources.first().toJSON()},getTableById:function(e){return this.tables.byId(e).toJSON()},getTableByNameAndParent:function(e,t){var n=o.getDataSourceGroupOrDataSource(t,this.dataStore.getCollections()),i=n.getChildren().chain().filter(function(e){return s.isTable(e)}).findWhere({name:e});return i&&i.toJSON()},getTableByTableReferenceId:function(e){var t=this.tableReferences.byId(e);return this.tables.byId(t.tableId).toJSON()},getTableGroupByNameAndParent:function(e,t){var n=o.getTableGroupOrTable(t,this.dataStore.getCollections()),i=n.getChildren().chain().filter(function(e){return s.isTableGroup(e)}).findWhere({name:e});return i&&i.toJSON()},getFieldByNameAndParent:function(e,t){var n=o.getTableGroupOrTable(t,this.dataStore.getCollections()),i=n.getChildren().chain().filter(function(e){return s.isField(e)}).findWhere({name:e});return i&&i.toJSON()},getFirstDataSourceGroupByDataSourceId:function(e){return this.dataSources.byId(e).getChildren().first().toJSON()},getDataSourceGroups:function(){return this.dataSourceGroups.map(function(e){return e.toJSON()})},getDataSourceGroupByName:function(e){var t=this.dataSourceGroups.findWhere({name:e});return t&&t.toJSON()},getDataSourceGroupBySourceName:function(e){var t=this.dataSourceGroups.findWhere({sourceName:e});return t&&t.toJSON()},getTableReferenceByName:function(e){var t=this.tableReferences.findWhere({name:e});return t&&t.toJSON()},getTableReferenceById:function(e){var t=this.tableReferences.byId(e);return t&&t.toJSON()},getFieldByName:function(e){var t=this.fields.findWhere({name:e});return t&&t.toJSON()},getFieldById:function(e){return this.fields.byId(e).toJSON()},getGenericFiledTypeById:function(e){var t=this.fields.byId(e);return l[t.getType()]},isFieldChildOfDerivedTable:function(e){var t=this.fields.byId(e).getTableId();return this.isDerivedTable(t)},getDataIslands:function(){return this.dataIslands.map(function(e){return e.toJSON()})},getDataIslandsSize:function(){return this.dataIslands.size()},getJoinTreesSize:function(){return this.joinTrees.size()},getDataIslandIndex:function(e){var t=this.dataStore.getCollection("dataIslands");return o.getResourceIndexInCollectionById(e,t)},getPresentationItemChildrenSize:function(e){var t=this.dataStore.getCollections();return o.getDataIslandOrPresentationSetById(e,t).getChildren().size()},getPresentationItemsInRangeOnLevel:function(e){var t=e.levelId,n=e.start,r=e.end;if(n>r)throw new Error("The start index of the range cannot be greater then the end.");var a,d;return t?(d=o.getDataIslandOrPresentationSetById(t,this.dataStore.getCollections()),a=d.getChildren()):a=this.dataIslands,a.reduce(function(e,t,a){if(a>=n&&a<=r){var o=t.toJSON();s.isDataIsland(t)||(o=i.extend({parentId:t.parentId,dataIslandId:t.dataIslandId},o)),o=i.extend({type:s.getEntityName(t)},o),e.push(o)}return e},[])},getPresentationSetsAndFieldsGroupedByProperty:function(e){return o.reduceCollectionByProperty({collection:this.presentationSets.concat(this.presentationFields),reducer:function(t,n){return t[n[e]]=n.toJSON(),t}})},isDataIslandHasSource:function(e){var t=this.dataIslands.by({id:e});return t&&i.isNumber(t.getSourceId())},getDataIslandById:function(e){var t=this.dataIslands.by({id:e});return t&&t.toJSON()},isJoinTreeConsistsOfASingleComponent:function(e){var t=e.getJoinAliases(),n=e.getJoins(),i=this._convertJoinsToGraph(n),r=n.first()&&n.first().leftJoinAliasId;return d.findComponentForVertex(r,i).length===t.size()},_convertJoinsToGraph:function(e){var t=function(e,t){return t||(t=[]),t.push(e),t};return e.reduce(function(e,n){var i=n.leftJoinAliasId,r=n.rightJoinAliasId;return e[i]=t(r,e[i]),e[r]=t(i,e[r]),e},{})},isJoinTreesConsistOfASingleComponent:function(){return this.joinTrees.every(function(e){return this.isJoinTreeConsistsOfASingleComponent(e)},this)},isAtLeastOnePresentationFieldInTheModel:function(){return Boolean(this.presentationFields.size())},generateConstantDataIslandName:function(){var e=i.bind(this.dataIslands.byField,this.dataIslands,"name");return this.constantDataIslandNameGenerator.generate(null,e)},isConstantDataIslandAlreadyExists:function(){return this.dataIslands.some(function(e){return s.isConstantGroup(e.getSourceType())})},isConstantDataIsland:function(e){var t=this.getDataIslandById(e);return s.isConstantGroup(t.sourceType)},isPresentationItemHasTransitiveParent:function(e,t){var n=this.dataStore.getCollections(),r=o.getPresentationSetOrFieldById(e,n);if(r){var a=o.getPresentationParents(r,n);return i.some(a,function(e){return e.getId()===t})}},getNameForTableReferenceCopy:function(e){return this.domainSchemaService.getNameForTableReferenceCopy(e)},getEntityByIdAndType:function(e,t){return o.getResourceByIdAndType(e,t,this.dataStore.getCollections()).toJSON()},getDataSourceByEntityIdAndType:function(e,t){var n=this.dataStore.getCollections(),i=o.getResourceByIdAndType(e,t,n),r=o.getDataSourceByChildResource(i,n);return r&&r.toJSON()},getAllDependenciesWithExpressionsForTableReference:function(e){var t=i.bind(this._filterCalcFieldsWithExpressionByTableReferenceId,this,e),n=this.fields.filter(t),r=this.tableReferences.byId(e),a=i.bind(this._filterComplexJoinsWithExpressionByTableReferenceId,this,r),s=this.joins.filter(a);return n=n.concat(s),n.map(this._resourceWithExpressionMapper)},isAllDataIslandsHaveSources:function(){return this.dataIslands.some(function(e){return i.isNull(e.getSourceId())})},getAllDependenciesWithExpressionsForField:function(e,t){var n=i.bind(this._filterCalcFieldsWithExpressionByFieldAndSourceId,this,e,t),r=this.fields.filter(n),a=i.bind(this._filterComplexJoinsWithExpressionByFieldAndSourceId,this,e,t),s=this.joins.filter(a);return r=r.concat(s),r.map(this._resourceWithExpressionMapper)},getJoinTreeIdByJoinAliasId:function(e){return this.joinAliases.byId(e).getJoinTreeId()},getTableReferenceIdByJoinAliasId:function(e){return this.joinAliases.byId(e).getTableReferenceId()},getTableByJoinAliasId:function(e){var t=this.joinAliases.byId(e),n=this.tableReferences.byId(t.getTableReferenceId());return this.tables.byId(n.getTableId()).toJSON()},getJoinAliasIdByTableReferenceId:function(e){var t=this.joinAliases.byField("tableReferenceId",e);return t&&t.getId()},getResourceByIdAndType:function(e,t){var n=o.getResourceByIdAndType(e,t,this.dataStore.getCollections());return n&&n.toJSON()},_filterCalcFieldsWithExpressionByFieldAndSourceId:function(e,t,n){var r=i.bind(this._isCalcFieldUsedByAnotherCalcField,this,{fieldId:e,sourceId:t});if(s.isCalcField(n))return n.getFieldReferences().some(r)},_isCalcFieldUsedByAnotherCalcField:function(e,t){var n=t.getSourceId();if(s.isJoinAlias(t.getSourceType())){var i=t.getSourceId();n=this.joinAliases.byId(i).getTableReferenceId()}return n===e.sourceId&&t.getFieldId()===e.fieldId},_filterComplexJoinsWithExpressionByFieldAndSourceId:function(e,t,n){var i=this;if(s.isComplexJoin(n))return n.getFieldReferences().some(function(n){if(n.getFieldId()===e){var r=n.getSourceId();return i.joinAliases.byId(r).getTableReferenceId()===t}})},_filterComplexJoinsWithExpressionByTableReferenceId:function(e,t){var n=this;if(s.isComplexJoin(t))return t.getFieldReferences().some(function(t){var i=t.getSourceId(),r=n.joinAliases.byId(i);if(r.getTableReferenceId()===e.getId())return n.domainSchemaSpecification.shouldRenameJoinAliasOnTableReferenceRename(e.getName(),r.getName())})},_filterCalcFieldsWithExpressionByTableReferenceId:function(e,t){var n=i.bind(this._isCalcFieldUsedByTableReference,this,e);if(s.isCalcField(t)&&t.getSourceId()!==e)return t.getFieldReferences().some(n)},_isCalcFieldUsedByTableReference:function(e,t){var n=t.getSourceId();if(s.isJoinAlias(t.getSourceType())){var i=t.getSourceId();n=this.joinAliases.byId(i).getTableReferenceId()}return n===e},_calcFieldForDependencyExpressionMapper:function(e){return i.extend(this._baseResourceWithExpressionMapper(e),{sourceId:e.getSourceId(),sourceType:e.getSourceType()})},_convertFieldReferencesToVariables:function(e,t,n){var r,d=this.dataStore.getCollections(),l=o.getSourceByFieldReference(n,d),u=o.getFieldByFieldReference(n,d);s.isJoinAlias(l)&&(r=o.getTableReferenceByJoinAlias(l,d));var c=a.join([l.getName(),u.getName()],"\\","."),f={name:u.getName(),type:u.getType(),fieldName:u.getName(),sourceName:l.getName(),id:u.getId()};return this._shouldAddShortVariableName(e,l)&&(t[u.getName()]=i.extend({},f,{fieldOnlyVariable:!0}),r&&(t[u.getName()].tableReferenceName=r.getName())),this._shouldAddFullVariableName(e,l)&&(t[c]=i.extend({},f,{name:c}),r&&(t[c].tableReferenceName=r.getName())),t},_shouldAddShortVariableName:function(e,t){return s.isCalcField(e)&&e.getSourceId()===t.getId()},_shouldAddFullVariableName:function(e,t){return!(s.isCalcField(e)&&e.getSourceId()===t.getId()&&!s.isConstantGroup(e.getSourceType()))},_baseResourceWithExpressionMapper:function(e){return i.extend(e.toJSON(),{variables:e.getFieldReferences().reduce(i.bind(this._convertFieldReferencesToVariables,this,e),{}),entityType:s.getEntityName(e)})},_resourceWithExpressionMapper:function(e){return s.isCalcField(e)?this._calcFieldForDependencyExpressionMapper(e):s.isComplexJoin(e)?this._baseResourceWithExpressionMapper(e):void 0},_filterTableByDataSourceId:function(e,t){return t.getDataSourceId()===e}}),i.extend(u.prototype,r),n.exports=u});