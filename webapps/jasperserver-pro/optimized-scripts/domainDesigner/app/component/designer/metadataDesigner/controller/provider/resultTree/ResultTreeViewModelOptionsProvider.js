/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../util/metadataDesignerUtil"],function(e,t,r){var n=e("underscore"),u=e("../../../util/metadataDesignerUtil"),i=function(e){this.initialize(e)};n.extend(i.prototype,{initialize:function(e){},get:function(e){var t=u.getCurrentResource(e),r=u.getCurrentDataSourceType(e);return{currentMetadataResourceId:t&&t.resourceId,currentDataSourceType:r,currentMetadataResourceType:t&&t.type}}}),r.exports=i});