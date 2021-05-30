/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,r){var i=e("underscore"),a=function(e){this.initialize(e)};i.extend(a.prototype,{initialize:function(e){this.model=e.model,this.treeSelectionProvider=e.treeSelectionProvider,this.metadataDesignerViewStateModelService=e.metadataDesignerViewStateModelService},get:function(e){return{dataStore:e.dataStore,dataSourceUri:this.model.get("currentDataSourceUri"),metadataResourcePath:this.model.get("currentMetadataResourcePath"),selection:this.treeSelectionProvider.get(e),highlightInvalidResources:this.metadataDesignerViewStateModelService.getAddResourcesError().highlightInvalidResources,currentMetadataResourceId:this.model.get("currentMetadataResourceId")}}}),r.exports=a});