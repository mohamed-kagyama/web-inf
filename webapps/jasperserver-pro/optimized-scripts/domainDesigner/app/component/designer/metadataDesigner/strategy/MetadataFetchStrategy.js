/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/schema/util/entityUtil"],function(e,t,r){var a=e("underscore"),n=e("../../../../../model/schema/util/entityUtil"),i=function(e){this.metadataService=e.metadataService};a.extend(i.prototype,{fetch:function(e){var t=e.parentPath,r=e.resources,i=e.resourceType,c=e.dataSourceUri,o=r.map(function(e){return n.isTable(i)&&t?[].concat(t).concat(e.name):[e.name]});return this.metadataService.getMetadata(c,o).then(function(e){return e&&(e=a.isArray(e)?e:[e]),e||[]})}}),r.exports=i});