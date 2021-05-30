/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../util/getResourceSourceNameOrNameUtil","../enum/dataSourceTypeEnum"],function(e,t,r){var i=e("underscore"),o=e("../../util/getResourceSourceNameOrNameUtil"),a=e("../enum/dataSourceTypeEnum"),u=function(e){this.initialize(e)};i.extend(u.prototype,{initialize:function(e){this.dataStore=e.dataStore,this.viewStateModel=e.viewStateModel,this.resourceProperties=e.resourceProperties,this.profileAttributesServiceCache=e.profileAttributesServiceCache},isSatisfied:function(){return this._isSchemaLessDataSource()&&this._isOneDataSourceGroup()&&this._isDataSourceGroupSchemaAttributeResolvedIntoEmptyValue()},_isSchemaLessDataSource:function(){var e=this._getDataSourceName();return this.viewStateModel.getDataSource(e).type===a.DATA_SOURCE_WITHOUT_SCHEMAS},_isOneDataSourceGroup:function(){return 1===this.dataStore.getCollection("dataSourceGroups").size()},_isDataSourceGroupSchemaAttributeResolvedIntoEmptyValue:function(){var e=this.dataStore.getCollection("dataSourceGroups").first(),t=o(e.toJSON()),r=this.profileAttributesServiceCache.get(t);return r&&i.isEmpty(r.value)},_getDataSourceName:function(){var e=this.resourceProperties.get("dataSources");return i.keys(e)[0]}}),r.exports=u});