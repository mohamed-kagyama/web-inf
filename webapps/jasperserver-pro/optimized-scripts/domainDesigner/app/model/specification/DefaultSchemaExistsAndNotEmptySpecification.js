/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/defaultSchemaNameEnum","../../../model/schema/enum/schemaCollectionsEnum"],function(e,n,t){var i=e("underscore"),a=e("../enum/defaultSchemaNameEnum"),o=e("../../../model/schema/enum/schemaCollectionsEnum"),m=function(e){this.initialize(e)};i.extend(m.prototype,{initialize:function(e){this.dataStore=e.dataStore},isSatisfied:function(){var e=this.dataStore.getCollection(o.DATA_SOURCE_GROUPS).findWhere({name:a.DEFAULT_SCHEMA});return e&&e.children.size()>0}}),t.exports=m});