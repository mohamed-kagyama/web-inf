/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../mixin/allCollectionsMixin","../util/entityUtil","../util/schemaModelUtil","../enum/validationRegExpEnum","../enum/fieldTypeToFieldTypeCategoryEnum"],function(e,t,n){var i=e("underscore"),r=e("../mixin/allCollectionsMixin"),a=e("../util/entityUtil"),l=e("../util/schemaModelUtil"),o=e("../enum/validationRegExpEnum"),d=e("../enum/fieldTypeToFieldTypeCategoryEnum"),s=function(e){i.bindAll(this,"presentationItemNameShouldBeUniqueThroughAllPresentationItemNames","calcFieldNameShouldBeUniqueThroughOtherFieldNamesOnSameLevel"),this._initialize(e)};i.extend(s.prototype,{_initialize:function(e){this.dataStore=e.dataStore,this.mixInAllCollections(this.dataStore)},resourceNameShouldNotContainForbiddenCharacters:function(e){return!o.RESOURCE_ID_BLACKLIST_REGEX_PATTERN.test(e)},canNotRemoveTheVeryLastTableReferenceForSpecificTable:function(e){var t=this.tableReferences.byId(e),n=t&&t.getTableId();return this.tableReferences.where({tableId:n}).length>1},tableReferenceNameShouldBeUniqueAcrossAllTableReferences:function(e,t){return!this.tableReferences.some(function(n){return n.getId()!==e&&n.getName()===t})},derivedTableNameShouldBeUniqueAmongTables:function(e,t,n){return!this.dataSources.byId(n).getChildren().some(function(n){var i=!e||n.id!==e;return n.name===t&&i})},derivedTableNameShouldBeUniqueAmongAllTableReferences:function(e,t){var n=e?this.tableReferences.findWhere({tableId:e}).getId():null;return this.tableReferenceNameShouldBeUniqueAcrossAllTableReferences(n,t)},dataSourceGroupNameShouldBeUniqueOnSameLevel:function(e){var t,n,i=e.name,r=e.id,a=e.parentId;return r&&!a&&(t=this._getDataSourceGroupById(r),a=t?t.getParentId():null),!a||(n=this._getDataSourceGroupOrDataSourceById(a),!n.getChildren().some(function(e){return e.getName()===i&&e.getId()!==r}))},joinExpressionShouldUseDifferentLeftAndRightTableReferences:function(e){return e.leftTableReferenceId!==e.rightTableReferenceId},joinExpressionShouldUseUniqueCombinationOfLeftTableAndFieldAndRightTableAndField:function(e){var t=this.joinAliases.byField("tableReferenceId",e.leftTableReferenceId),n=this.joinAliases.byField("tableReferenceId",e.rightTableReferenceId),r=i.partial(this._sameJoinExpressionAlreadyExistsPredicate,i.extend({leftJoinAliasId:t?t.getId():null,rightJoinAliasId:n?n.getId():null},e));return!this.joinExpressions.chain().filter(this._excludeConstantJoinExpressionPredicate).find(r)},joinTreeNameShouldBeUniqueThroughAllJoinTreeNames:function(e,t){return!this.joinTrees.some(function(n){return n.getName()===e&&(!t||t!==n.getId())})},newPresentationItemNamesShouldBeUniqueBetweenThemselves:function(e){var t={};return!i.some(e,function(e){if(t[e])return!0;t[e]=!0})},presentationItemNameShouldBeUniqueThroughAllPresentationItemNames:function(e){var t,n=e.id,i=e.name,r=e.existingPresentationItemsByNameMap;return!(t=r?r[i]:this.presentationSets.byField("name",i)||this.presentationFields.byField("name",i))||!!n&&t.id===n},dataIslandNameShouldBeUniqueThroughAllDataIslandNames:function(e,t){return!this.dataIslands.some(function(n){return n.getName()===e&&(!t||t!==n.getId())})},calcFieldNameShouldBeUniqueThroughOtherFieldNamesOnSameLevel:function(e,t){var n=this._findFieldByNameInCalcFieldParent(e,t),i=e.calcFieldId;return!n||!!i&&n.getId()===i},calcFieldNameCanNotBeEmpty:function(e){return e=e?e.replace(/\s+/g,""):e,Boolean(e)},calcFieldDataTypeCanNotBeChangedIfThereAreDependentFilters:function(e,t){var n=this.fields.byId(e),i=n.type,r=!1;return this._fieldTypeHasChanged(t,i)&&(r=this.filters.some(function(t){return t.fieldReferences.some(function(t){return t.fieldId===e})})),r},derivedTableFieldDataTypeCanNotBeChangedIfThereAreDependentFilters:function(e,t){for(var n=this.fields.where({tableId:e}),i=n.reduce(function(e,t){return e[t.name]=t,e},{}),r=!1,a=0;a<t.length&&!r;a++){var l=t[a],o=i[l.name];o&&(this._fieldTypeHasChanged(o.type,l.type)&&(r=this.filters.some(function(e){return e.fieldReferences.some(function(e){return e.fieldId===o.id})})))}return r},joinAliasNameShouldBeRenamedIfItIsTheSameAsTableReferenceName:function(e,t){return e===t},_fieldTypeHasChanged:function(e,t){return d[e]!==d[t]},_excludeConstantJoinExpressionPredicate:function(e){if(!a.isConstantJoinExpression(e))return!0},_sameJoinExpressionAlreadyExistsPredicate:function(e,t){var n=e.leftJoinAliasId,i=e.rightJoinAliasId;if(n&&i){var r=t.getLeftJoinAliasId()===n,a=t.getRightJoinAliasId()===i,l=t.getLeftJoinAliasId()===i,o=t.getRightJoinAliasId()===n,d=t.getLeftFieldId()===e.leftTableFieldId,s=t.getRightFieldId()===e.rightTableFieldId,u=t.getLeftFieldId()===e.rightTableFieldId,c=t.getRightFieldId()===e.leftTableFieldId,f=r&&a&&d&&s,h=l&&o&&u&&c;return f||h}},_getDataSourceGroupById:function(e){return this.dataSourceGroups.byId(e)},_getDataSourceGroupOrDataSourceById:function(e){return l.getDataSourceGroupOrDataSource(e,{dataSources:this.dataSources,dataSourceGroups:this.dataSourceGroups})},_findFieldByNameInCalcFieldParent:function(e,t){var n=[],r=e.sourceId,o=e.sourceType,d=e.sourceName,s=this.dataStore.getCollections();if(a.isConstantGroup(o)){var u;d?u=this.constantGroups.byField("name",d):r&&(u=this.constantGroups.byId(r)),n=u?u.getCalcFields().toArray():[]}else if(a.isTableReference(o)){var c=this.tableReferences.byId(r),f=l.getTableFieldsByTableReference(c,s);n=f.concat(c.getCalcFields().toArray())}else a.isJoinTree(o)&&(n=this.joinTrees.byId(r).getCalcFields().toArray());return i.find(n,function(e){return e.getName()===t})}}),i.extend(s.prototype,r),n.exports=s});