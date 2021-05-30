/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","underscore","../enum/endpointsEnum","../enum/mimeTypesEnum"],function(e,t,n){var i=(e("jquery"),e("underscore")),u=e("../enum/endpointsEnum"),r=e("../enum/mimeTypesEnum"),o=function(e){this.initialize(e)};i.extend(o.prototype,{initialize:function(e){e=e||{},this.contextExecutor=e.contextExecutor},getDerivedTableMetadata:function(e,t){var n=JSON.stringify({dataSourceUri:e,sql:t}),i={contentType:r.SQL_EXECUTION_REQUEST_CONTEXT,data:n},o={type:"GET",accept:r.DATASET_JSON,url:u.DATA_SOURCE_METADATA,contentType:r.SQL_EXECUTION_REQUEST_CONTEXT};return this.contextExecutor.execute(i,o)}}),n.exports=o});