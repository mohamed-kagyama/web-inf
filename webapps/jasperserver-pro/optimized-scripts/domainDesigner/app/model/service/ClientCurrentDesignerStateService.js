/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../util/resourcePropertiesUtil"],function(e,t,r){var i=e("underscore"),o=e("../util/resourcePropertiesUtil"),s=function(e){this.initialize(e)};i.extend(s.prototype,{initialize:function(e){this.dataStore=e.dataStore,this.resourceProperties=e.resourceProperties,this.viewStateModel=e.viewStateModel},getDesignerState:function(){return{schema:this.dataStore.serialize(),resourceProperties:this.resourceProperties.toJSON(),viewState:this.viewStateModel.toJSON()}},doesCurrentDesignerStateContainsDataSources:function(){var e=this.getDesignerState();return Boolean(e.resourceProperties.dataSources)},getDataSourceType:function(){var e=o.getFirstDataSourceName(this.resourceProperties.get("dataSources")),t=this.viewStateModel.getDataSource(e);return t&&t.type}}),r.exports=s});