/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","../../../../../model/util/serverSchemaResourceTypeUtil","./util/unwrapMetadataUtil"],function(e,t,r){var a=e("underscore"),n=e("jquery"),i=e("../../../../../model/util/serverSchemaResourceTypeUtil"),u=e("./util/unwrapMetadataUtil"),o=function(e){this.initialize(e)};a.extend(o.prototype,{initialize:function(e){this.metadataService=e.metadataService},getSelectedResources:function(e){var t=e.selection,r=e.dataSourceUri,o=e.metadataResourcePath,c=o.length>0?[o]:o;return this.metadataService.getMetadata(r,c).then(function(r){r=u.unwrap(r,e);var o=a.chain(r).filter(function(e){return Boolean(t[e.group.name])}).map(function(e){return{name:e.group.name,type:i.getMetadataResourceType(e)}}).value();return(new n.Deferred).resolve(o)})}}),r.exports=o});