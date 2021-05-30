/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./util/getResourcesByParentResourceUtil"],function(e,t,s){var i=e("underscore"),r=e("./util/getResourcesByParentResourceUtil"),o=function(e){this.initialize(e)};i.extend(o.prototype,{initialize:function(e){this.process=e.process||i.identity,this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec=e.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec},getSelectedResources:function(e){var t=e.selection,s=this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec.isSatisfied();return r.getResources({parentId:e.metadataResourceId,parentType:e.metadataResourceType,collections:e.dataStore,isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute:s}).map(function(e){return this.process(e.toJSON(),{entity:e})},this).filter(function(e){return Boolean(t[e.name])},this).toArray()}}),s.exports=o});