/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/defaultSchemaNameEnum","../enum/profileAttributeErrorEnum","../../../model/schema/enum/schemaCollectionsEnum"],function(e,t,r){var i=e("underscore"),n=e("../enum/defaultSchemaNameEnum"),o=e("../enum/profileAttributeErrorEnum"),u=e("../../../model/schema/enum/schemaCollectionsEnum"),a=function(e){this.initialize(e)};i.extend(a.prototype,{initialize:function(e){this.dataStore=e.dataStore,this.profileAttributesServiceCache=e.profileAttributesServiceCache},resolve:function(e){var t=this.profileAttributesServiceCache.get(e),r=t&&t.value;if(""===r){var a=this.dataStore.getCollection(u.DATA_SOURCE_GROUPS).byField("name",n.DEFAULT_SCHEMA);if(a)return a.sourceName;throw new Error(o.PROFILE_ATTRIBUTE_EMPTY_FOR_SCHEMA_FULL_DATASOURCE)}return i.isUndefined(r)?e:r}}),r.exports=a});