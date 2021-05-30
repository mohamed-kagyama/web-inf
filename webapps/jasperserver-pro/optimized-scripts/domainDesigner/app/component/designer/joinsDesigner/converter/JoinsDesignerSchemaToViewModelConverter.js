/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/schema/util/entityUtil","../util/joinsDesignerUtil","../../../../common/util/byIdReducer","../util/joinTreeComponentsVisibilityUtil","../../../../../model/schema/enum/schemaEntitiesEnum"],function(e,i,n){var t=e("underscore"),s=e("../../../../../model/schema/util/entityUtil"),o=e("../util/joinsDesignerUtil"),r=e("../../../../common/util/byIdReducer"),a=e("../util/joinTreeComponentsVisibilityUtil"),d=e("../../../../../model/schema/enum/schemaEntitiesEnum"),l=function(e){this.initialize(e)};t.extend(l.prototype,{initialize:function(e){this.settings=e.settings,this.clientDomainSchemaService=e.clientDomainSchemaService,this.joinsDesignerViewStateModelService=e.joinsDesignerViewStateModelService,this.advancedJoinsMappingSpecification=e.advancedJoinsMappingSpecification,this.shouldJoinConstructorRightDroppableAreaBeActiveSpecification=e.shouldJoinConstructorRightDroppableAreaBeActiveSpecification},convert:function(e){return this._convertJoinTrees(e)},_convertJoinTrees:function(e){var i=e.dataStore,n=i.joinTrees,s=n.size(),o=n.size()-1,a=[],d=this._getDraftJoinTreeModels({joinTreesSize:s});if(s){var l=i.tables.reduce(r,{}),c=i.tableReferences.reduce(r,{}),h=i.joinAliases.reduce(r,{}),g=i.fields.reduce(r,{});a=n.reduce(function(i,n,s){var r,a,p=0===s,u=s===o;return d&&d.index===s&&(p=0!==d.index,i=i.concat(d.models)),a=this._getJoinTreePlaceHolder({isFirstJoinTree:p,joinTree:n,index:s}),r=this._convertJoinTree({index:s,joinTree:n,state:e,maps:{tablesMap:l,tableReferencesMap:c,joinAliasesMap:h,fieldsMap:g}}),r&&(i=i.concat(a).concat(r)),u&&(a=this._getJoinTreePlaceHolder({isFirstJoinTree:!1,joinTree:n,index:s+1}),a=t.extend({},a,{isLastJoinTreePlaceholder:!0}),i=i.concat(a)),d&&u&&d.index===s+1&&(i=i.concat(d.models)),i},[],this)}else d&&(a=d.models);return a},_convertJoinTree:function(e){var i=e.joinTree,n=e.index,s=[],r=e.state,d=r.dataStore,l=o.getSearchKeyword(r),c={joinTree:i,index:n,searchKeyword:l,collections:d,state:r,maps:e.maps},h=this._getJoinConstructor(),g=this._convertJoinTreeOwnProps(c),p=a.isJoinTreeVisible(l,g);if(c.isParentVisible=p,g.isExpanded&&(s=s.concat(this._convertJoinTreeChildren(c)),h&&h.joinTreeId===i.id&&(s=s.concat(h))),t.extend(g,{isValid:this.clientDomainSchemaService.isJoinTreeConsistsOfASingleComponent(i)}),p||s.length)return[g].concat(s)},_getJoinConstructor:function(){var e=this.joinsDesignerViewStateModelService.getJoinConstructor(),i=this.joinsDesignerViewStateModelService.getCurrentSidebarResource();if(e){var n=this.shouldJoinConstructorRightDroppableAreaBeActiveSpecification.isSatisfiedBy({joinConstructor:e,currentSidebarResource:i});return e=t.extend({},t.cloneDeep(e),{height:this.settings.height.JOIN_CONSTRUCTOR,isJoinConstructor:!0}),e.rightSide.isDropAreaEnabled=n,e}},_getDraftJoinTreeModels:function(e){var i=e.joinTreesSize,n=this.joinsDesignerViewStateModelService.getDraftJoinTree(),s=this.joinsDesignerViewStateModelService.getCurrentSidebarResource();if(n){var o=n.suppressCircularJoins,r=n.includeAllDataIslandJoins,a={index:n.index,label:n.name,name:n.name,isDraftJoinTree:!0,isValid:!0,isExpanded:n.isExpanded,height:this.settings.height.JOIN_TREE,useMinimumPathJoins:this.advancedJoinsMappingSpecification.isUseMinimumPathJoinsOn(o,r),useAllDataIslandJoins:this.advancedJoinsMappingSpecification.isUseAllDAtaIslandJoinsOn(o,r)},l={modelType:d.JOIN,height:this.settings.height.JOIN,weight:n.join.weight,isWeightEnabled:this.advancedJoinsMappingSpecification.isJoinWeightEnabled(o,r),type:n.join.type,leftTableReference:n.join.leftSide,leftTableAlias:n.join.leftSide,rightTableReference:"",rightTableAlias:"",isExpanded:n.join.isExpanded,isDraftJoinTreeChild:!0},c=this.shouldJoinConstructorRightDroppableAreaBeActiveSpecification.isSatisfiedBy({joinConstructor:n.joinConstructor,currentSidebarResource:s}),h=t.extend({height:this.settings.height.JOIN_CONSTRUCTOR,isJoinConstructor:!0,isDraftJoinTreeChild:!0},t.cloneDeep(n.joinConstructor));h.rightSide.isDropAreaEnabled=c;var g;n.index!==i&&(g=this._getJoinTreePlaceHolder({isFirstJoinTree:0===n.index,joinTree:n,index:n.index}));var p=[];return g&&(p=[g]),p=p.concat(a),n.isExpanded&&(p=p.concat(l)),n.isExpanded&&n.join.isExpanded&&(p=p.concat(h)),{index:n.index,models:p}}},_getJoinTreePlaceHolder:function(e){var i=e.index,n=e.joinTree,t=e.isFirstJoinTree,s=this.settings.height.JOIN_TREE_PLACEHOLDER;t&&(s=this.settings.height.JOIN_TREE_FIRST_PLACEHOLDER);var o={index:i,isJoinTreePlaceholder:!0,height:s};return n.id&&(o.joinTreeId=n.id),o},_convertJoinTreeOwnProps:function(e){var i=e.joinTree,n=e.index,t=e.state,s=i.getIncludeAllDataIslandJoins(),o=i.getSuppressCircularJoins();return{id:i.id,index:n,label:i.name,name:i.name,modelType:d.JOIN_TREE,isExpanded:this._isJoinTreeExpanded(i.id,t),height:this.settings.height.JOIN_TREE,useMinimumPathJoins:this.advancedJoinsMappingSpecification.isUseMinimumPathJoinsOn(o,s),useAllDataIslandJoins:this.advancedJoinsMappingSpecification.isUseAllDAtaIslandJoinsOn(o,s)}},_isJoinTreeExpanded:function(e,i){return((o.getJoinTrees(i)||{})[e]||{}).isExpanded||!1},_convertJoinTreeChildren:function(e){return this._convertJoinTreeNodes(e)||[]},_convertJoinTreeNodes:function(e){var i=e.joinTree,n=e.searchKeyword,s=e.isParentVisible,o=e.state,r=e.collections,a=this,d=[],l=i.getJoins().reduce(function(t,d){var l=a._convertAnyJoin({join:d,joinTree:i,searchKeyword:n,isParentVisible:s,collections:r,state:o,maps:e.maps})||[];return t.concat(l)},[]);d=this._getLoneJoinAliases(i).reduce(function(t,o){var d=a._convertJoinAlias({collections:r,joinTreeId:i.id,searchKeyword:n,isParentVisible:s,joinAlias:o,maps:e.maps})||[];return t.concat(d)},[]).concat(l);var c=t.last(d);return c&&(c.isLastChild=!0),d},_getLoneJoinAliases:function(e){var i=e.getJoins().reduce(function(e,i){return e[i.getLeftJoinAliasId()]=!0,e[i.getRightJoinAliasId()]=!0,e},{});return e.getJoinAliases().chain().filter(function(e){return t.isUndefined(i[e.getId()])})},_convertJoinAlias:function(e){var i=e.joinAlias,n=e.joinTreeId,t=e.searchKeyword,s=e.isParentVisible,o=e.maps,r=o.tableReferencesMap[i.getTableReferenceId()],l=o.tablesMap[r.tableId],c={id:i.getId(),joinTreeId:n,name:r.getName(),modelType:d.JOIN_ALIAS,height:this.settings.height.JOIN_ALIAS};if(s||a.isJoinAliasVisible(t,c,[l.name]))return c},_convertAnyJoin:function(e){var i=e.join;return s.isJoin(i)?this._convertJoin(e):s.isComplexJoin(i)?this._convertComplexJoin(e):void 0},_convertComplexJoin:function(e){var i=e.join,n=e.searchKeyword,s=e.isParentVisible,o=e.maps,r=this._convertGenericJoinProperties(e),l=r.leftTableName,c=r.rightTableName;delete r.leftTableName,delete r.rightTableName;var h=t.extend({modelType:d.COMPLEX_JOIN,expression:i.getExpression().string},r);h.height=h.isExpanded?this.settings.height.COMPLEX_JOIN_EXPANDED:this.settings.height.COMPLEX_JOIN;var g=i.fieldReferences.reduce(function(e,i){var n=o.fieldsMap[i.fieldId];return n&&(e.push(n.name),n.sourceName&&e.push(n.sourceName)),e},[]);if(s||a.isComplexJoinVisible(n,h,[l,c].concat(g)))return h},_convertJoin:function(e){var i=e.join,n=[],o=e.joinTree,r=e.searchKeyword,l=e.isParentVisible,c=e.collections,h=this,g=this._convertGenericJoinProperties(e),p=g.leftTableName,u=g.rightTableName;delete g.leftTableName,delete g.rightTableName;var J=t.extend({modelType:d.JOIN,height:this.settings.height.JOIN},g),f=l||a.isJoinVisible(r,J,[p,u]);if(J.isExpanded&&(n=i.getJoinExpressions().chain().sortBy(function(e){return s.isConstantJoinExpression(e)}).reduce(function(n,t){var s=h._convertAnyJoinExpression({joinId:i.getId(),joinTreeId:o.id,joinExpression:t,collections:c,isParentVisible:f,searchKeyword:r,maps:e.maps})||[];return n.concat(s)},[])),f||n.length)return[J].concat(n)},_convertGenericJoinProperties:function(e){var i=e.join,n=e.joinTree,t=n.getSuppressCircularJoins(),s=n.getIncludeAllDataIslandJoins(),r=e.state,a=e.maps,d=i.getId(),l=a.joinAliasesMap[i.getLeftJoinAliasId()],c=a.joinAliasesMap[i.getRightJoinAliasId()],h=a.tableReferencesMap[l.getTableReferenceId()],g=a.tableReferencesMap[c.getTableReferenceId()],p=a.tablesMap[h.tableId],u=a.tablesMap[g.tableId];return{id:d,joinTreeId:n.id,weight:i.getWeight(),isWeightEnabled:this.advancedJoinsMappingSpecification.isJoinWeightEnabled(t,s),originalWeight:o.getJoinOriginalWeight(d,r),type:i.getType(),leftTableReference:h.getName(),leftTableAlias:l.getName(),rightTableReference:g.getName(),rightTableAlias:c.getName(),leftTableName:p.getName(),rightTableName:u.getName(),isExpanded:o.isJoinExpanded(d,r)}},_convertAnyJoinExpression:function(e){var i=e.joinExpression;return s.isJoinExpression(i)?this._convertJoinExpression(e):s.isConstantJoinExpression(i)?this._convertConstantJoinExpression(e):void 0},_convertJoinExpression:function(e){var i=e.joinId,n=e.joinTreeId,t=e.joinExpression,s=e.searchKeyword,o=e.isParentVisible,r=e.maps,l=r.joinAliasesMap[t.getLeftJoinAliasId()],c=r.joinAliasesMap[t.getRightJoinAliasId()],h=r.tableReferencesMap[l.getTableReferenceId()],g=r.tableReferencesMap[c.getTableReferenceId()],p=r.tablesMap[h.tableId],u=r.tablesMap[g.tableId],J=r.fieldsMap[t.getLeftFieldId()],f=r.fieldsMap[t.getRightFieldId()],m={id:t.getId(),joinId:i,joinTreeId:n,modelType:d.JOIN_EXPRESSION,leftField:J.getName(),leftFieldId:J.getId(),leftFieldType:J.type,rightField:f.getName(),rightFieldId:f.getId(),rightFieldType:f.type,leftJoinAlias:l.getName(),leftJoinAliasId:l.getId(),rightJoinAlias:c.getName(),rightJoinAliasId:c.getId(),operator:t.getOperator(),height:this.settings.height.JOIN_EXPRESSION},T=[p.name,u.name,J.name,f.name];if(J.sourceName&&T.push(J.sourceName),f.sourceName&&T.push(f.sourceName),o||a.isJoinExpressionVisible(s,m,T))return m},_convertConstantJoinExpression:function(e){var i=e.joinId,n=e.joinTreeId,s=e.joinExpression,o=e.searchKeyword,r=e.isParentVisible,l=e.maps,c=l.joinAliasesMap[s.getJoinAliasId()],h=l.tableReferencesMap[c.getTableReferenceId()],g=l.tablesMap[h.tableId],p=l.fieldsMap[s.getFieldId()],u={id:s.getId(),joinId:i,joinTreeId:n,modelType:d.CONSTANT_JOIN_EXPRESSION,field:p.getName(),fieldId:p.getId(),fieldType:p.type,joinAlias:c.getName(),joinAliasId:c.getId(),operator:s.getOperator(),value:t.cloneDeep(s.getValue()),height:this.settings.height.JOIN_EXPRESSION},J=[g.name,p.name];if(p.sourceName&&J.push(p.sourceName),r||a.isConstantJoinExpressionVisible(o,u,J))return u}}),n.exports=l});