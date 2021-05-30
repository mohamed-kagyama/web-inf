/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,r){var o=e("underscore"),i=function(e){this.initialize(e)};o.extend(i.prototype,{initialize:function(e){this.model=e.model,this.treeSelectionProvider=e.treeSelectionProvider},get:function(e){return{dataStore:e.dataStore,metadataResourceId:this.model.get("currentMetadataResourceId"),metadataResourceType:this.model.get("currentMetadataResourceType"),dataSourceType:this.model.get("currentDataSourceType"),selection:this.treeSelectionProvider.get(e)}}}),r.exports=i});