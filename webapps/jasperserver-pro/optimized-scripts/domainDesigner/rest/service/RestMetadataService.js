/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/endpointsEnum","../enum/mimeTypesEnum"],function(e,n,t){var i=e("underscore"),o=e("../enum/endpointsEnum"),r=e("../enum/mimeTypesEnum"),u=function(e){this.initialize(e)};i.extend(u.prototype,{initialize:function(e){e=e||{},this.contextExecutor=e.contextExecutor},getMetadata:function(e,n,t){t=t||{},n=n||[];var i=JSON.stringify({uri:e}),u={contentType:r.RESOURCE_LOOKUP,data:i},c={includes:n};t.loadReferences&&(c.loadReferences=t.loadReferences);var s={url:o.DATA_SOURCE_METADATA,contentType:r.DATA_SOURCE_METADATA,data:JSON.stringify(c)};return this.contextExecutor.execute(u,s,t)}}),t.exports=u});