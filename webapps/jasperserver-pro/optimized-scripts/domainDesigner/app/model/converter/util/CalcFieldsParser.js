/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../util/pathUtil","../../expression/expressionVariables","../../util/serverSchemaResourceTypeUtil","../../../../model/schema/util/entityUtil","../exception/CanNotParseDependenciesException","../exception/CircularReferenceException","../exception/IllegalCalcFieldUsageException","../../../../model/schema/util/schemaModelUtil"],function(e,t,l){function n(e){this.entityFactory=e.entityFactory}var o=e("underscore"),i=e("../../../util/pathUtil"),c=e("../../expression/expressionVariables"),r=e("../../util/serverSchemaResourceTypeUtil"),s=e("../../../../model/schema/util/entityUtil"),a=e("../exception/CanNotParseDependenciesException"),d=e("../exception/CircularReferenceException"),u=e("../exception/IllegalCalcFieldUsageException"),p=e("../../../../model/schema/util/schemaModelUtil"),f=c.collect;o.extend(n.prototype,{parseConstantGroups:function(e){for(var t=e.constantGroups,l=e.collections,n=this,i=this._getAllConstantGroups(t),c=this._getNotParsedConstants(t),r=this._getNotParsedConstantsSize(c);r>0;){c=o.keys(c).reduce(function(e,t){var o=i[t];if(c[t].length>0){var r=n._getScopedFieldsCollectionForConstantGroup(o,i),s=[];try{n._parseCalcFields({collections:l,scopedFieldsCollections:r,calcFieldsJson:c[o.getName()],parent:o,parentCollection:o.getCalcFields()})}catch(e){if(!(e instanceof d))throw e;s=e.getNotParsedCalcFields()}e[t]=s}return e},c);var s=this._getNotParsedConstantsSize(c);if(s===r)throw new d("Circular reference found",c);r=s}o.each(i,function(e){l.constantGroups.add(e)})},_getScopedFieldsCollectionForConstantGroup:function(e,t){return o.values(t).reduce(function(t,l){var n=[{source:l,collection:l.getCalcFields()}];return l===e&&(t[""]=n),t[l.getName()]=n,t},{})},_getAllConstantGroups:function(e){var t=this;return e.reduce(function(e,l){var n=l.name,o=t.entityFactory.createConstantGroup({name:n});return e[n]=o,e},{})},_getNotParsedConstants:function(e){return e.reduce(function(e,t){return e[t.name]=o.clone(t.elements).map(function(e){return e.element}),e},{})},_getNotParsedConstantsSize:function(e){return o.values(e).reduce(function(e,t){return e+t.length},0)},parseSingleTableCalcFields:function(e){var t=e.table,l=e.tableReference,n=e.collections,i=e.elements,c=l.getCalcFields(),r=this._filterSingleTableCalcFields(i);if(o.size(r)>0){var s=this._getScopedCollectionsForSingleTableCalcFields({collections:n,table:t,tableReference:l,calcFieldsCollection:c});this._parseCalcFields({parent:l,parentCollection:c,collections:n,scopedFieldsCollections:s,calcFieldsJson:r})}},parseCrossTableCalcFields:function(e){var t=e.collections,l=e.joinTree,n=l.getCalcFields(),i=e.elements,c=this._filterCrossTableCalcFields(i);if(o.size(c)>0){var r=this._getScopedCollectionsForCrossTableCalcFields({collections:t,joinTree:l,crossTableCalcFields:n});this._parseCalcFields({parent:l,parentCollection:n,collections:t,scopedFieldsCollections:r,calcFieldsJson:c})}},_getScopedCollectionsForConstantGroup:function(e){return e.constantGroups.reduce(function(e,t){return e[t.getName()]=[{source:t,collection:t.getCalcFields()}],e},{})},_getScopedCollectionsForSingleTableCalcFields:function(e){var t=e.collections,l=e.calcFieldsCollection,n=e.table,o=e.tableReference,i=p.getAllTableFields(n),c=this._getScopedCollectionsForConstantGroup(t),r=[{source:o,collection:i},{source:o,collection:l}];return c[""]=r,c[o.getName()]=r,c},_getScopedCollectionsForCrossTableCalcFields:function(e){var t=e.collections,l=e.crossTableCalcFields,n=e.joinTree,o=this._getScopedCollectionsForConstantGroup(t);return o[""]=[{source:n,collection:l}],o=n.getJoinAliases().reduce(function(e,l){var n=p.getTableReferenceByJoinAlias(l,t),o=n.getCalcFields(),i=p.getTableByTableReference(n,t),c=p.getAllTableFields(i);return e[l.getName()]=[{source:l,collection:o},{source:l,collection:c}],e},o)},_parseCalcFields:function(e){for(var t=e.collections,l=e.parent,n=e.parentCollection,i=e.scopedFieldsCollections,c=e.calcFieldsJson,r=c.length;r>0;){var s=o.partial(this._tryToParseCalcFieldAndReturnNotParsed,{collections:t,scopedFieldsCollections:i,parent:l,parentCollection:n});c=o.reduce(c,s,[],this);var a=c.length;if(a===r)throw new d("Circular reference found",c);r=a}},_tryToParseCalcFieldAndReturnNotParsed:function(e,t,l){var n=e.collections,o=e.parent,i=e.parentCollection,c=e.scopedFieldsCollections;try{var r=this._parseCalcField({parent:o,calcFieldJson:l,collections:n,scopedFieldsCollections:c});i.add(r)}catch(e){if(!(e instanceof a))throw e;t.push(l)}return t},_parseCalcField:function(e){var t=e.calcFieldJson,l=e.parent,n=e.collections,o=e.scopedFieldsCollections,i=t.expression,c=i.object,r=f(c),a=this._createFieldReferencesByScopedName(r,o),d=this.entityFactory.createCalcField({name:t.name,type:t.type,sourceId:l.getId(),sourceType:s.getEntityName(l),expression:i,fieldReferences:a});return n.fields.add(d),d},_createFieldReferencesByScopedName:function(e,t){return o.map(e,function(e){var l=this._splitFieldNameToComponents(e),n=this._getScopePrefixAndRawFieldName(l,e),o=n.scopePrefix,i=n.rawFieldName,c=this._getFieldsCollectionsForScope(t,o);return this._createFieldReferenceByName(c,i)},this)},_splitFieldNameToComponents:function(e){return i.split(e,"\\",".")},_getScopePrefixAndRawFieldName:function(e,t){var l,n;if(1===e.length)l="",n=o.first(e);else{if(2!==e.length)throw new Error("Expressions contains not supported variable name: "+t);l=o.first(e),n=o.last(e)}return{scopePrefix:l,rawFieldName:n}},_getFieldsCollectionsForScope:function(e,t){var l=e[t];if(!l)throw new u("Can not use fields from "+t+" in this calc field");return l},_createFieldReferenceByName:function(e,t){var l=null,n=null;if(o.find(e,function(e){var i=e.collection;return n=e.source,l=i.byField?i.byField("name",t):o.findWhere(i,{name:t})}),l)return this.entityFactory.createFieldReference({sourceId:n.getId(),sourceType:s.getEntityName(n),fieldId:l.getId(),fieldType:s.getEntityName(l)});throw new a("Field ["+t+"] not found")},_filterCrossTableCalcFields:function(e){return this._filterCalcFields(e)},_filterSingleTableCalcFields:function(e){return this._filterCalcFields(e)},_filterCalcFields:function(e){return o.reduce(e,function(e,t){var l=r.getResourceType(t),n=r.getResourceValue(t,l);return this._isCalcField(l,n)&&e.push(n),e},[],this)},_isCalcField:function(e,t){return r.isResourceElement(e)&&t.expression}}),l.exports=n});