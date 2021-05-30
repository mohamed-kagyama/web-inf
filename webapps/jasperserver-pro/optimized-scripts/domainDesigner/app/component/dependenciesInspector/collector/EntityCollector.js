/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../model/schema/util/entityUtil","../../../../model/schema/enum/schemaEntitiesEnum","../../../../model/schema/enum/schemaCollectionsEnum"],function(e,t,i){var n=e("underscore"),o=e("../../../../model/schema/util/entityUtil"),c=e("../../../../model/schema/enum/schemaEntitiesEnum"),s=e("../../../../model/schema/enum/schemaCollectionsEnum"),r=function(e){this.initialize(e)};n.extend(r.prototype,{initialize:function(e){e=e||{},n.bindAll(this,"collectAffectedEntities"),this.dataStore=e.dataStore,this.dependenciesTrackingStore=e.dependenciesTrackingStore,this.applicationMutations=e.applicationMutations,this.clientDomainSchemaService=e.clientDomainSchemaService},collectAffectedEntities:function(e,t){return t=n.isArray(t)?t:[t],this._copyDataStoreToDependenciesTrackingStore(),this.applicationMutations[e].apply(this.applicationMutations,t),this._collectRemovedAndAffectedEntities()},_copyDataStoreToDependenciesTrackingStore:function(){this.dependenciesTrackingStore.deserialize(this.dataStore.serialize())},_collectRemovedAndAffectedEntities:function(){return{removedEntities:this._collectRemovedEntities(),affectedEntities:this._collectAffectedEntities()}},_collectRemovedEntities:function(){var e=this,t=this.dataStore.getCollections(),i=this.dependenciesTrackingStore.getCollections(),r=n.reduce(c,function(e,t){return e[t]=[],e},{});return n.each(s,function(n){var c=i[n].reduce(function(e,t){return e[t.id]=!0,e},{});t[n].each(function(t){var i;c[t.id]||(i=o.getEntityName(t),r[i].push(e._getSerializedEntity(t)))})}),r},_collectAffectedEntities:function(){var e=this.dependenciesTrackingStore.getCollection("joinTrees"),t=this.dataStore.getCollection("joinTrees");e=e.reduce(function(e,i){var n;if(this.clientDomainSchemaService.isJoinTreeConsistsOfASingleComponent(i)){n=t.byId(i.id);var c=n.getJoinAliases(),s=i.getJoinAliases(),r=n.getJoins(),a=i.getJoins(),d=function(e,t){return o.isJoin(t)?e+=t.getJoinExpressions().size():o.isComplexJoin(t)&&(e+=1),e},l=r.reduce(d,0),u=a.reduce(d,0);if(c.size()===s.size()&&r.size()===a.size()&&l===u)return e}return e.concat(this._getSerializedEntity(i))},[],this);var i={};return i[c.JOIN_TREE]=e,i},_getSerializedEntity:function(e){var t=n.extend({},e.toJSON(),{entityType:o.getEntityName(e)});return o.isFilterExpression(e)&&(t=n.extend({},t,{fieldReferences:e.getFieldReferences().map(function(e){return{id:e.id,sourceId:e.sourceId,sourceType:e.sourceType,fieldId:e.fieldId,fieldType:e.fieldType}})})),t}}),i.exports=r});