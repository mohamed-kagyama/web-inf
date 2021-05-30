/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../model/schema/util/schemaModelUtil","../../../model/schema/util/entityUtil","../../util/getResourceSourceNameOrNameUtil","../../../model/schema/mixin/allCollectionsMixin"],function(e,t,r){var i=e("underscore"),o=e("../../../model/schema/util/schemaModelUtil"),n=e("../../../model/schema/util/entityUtil"),a=e("../../util/getResourceSourceNameOrNameUtil"),u=e("../../../model/schema/mixin/allCollectionsMixin"),s=function(e){this.initialize(e)};i.extend(s.prototype,{initialize:function(e){this.dataStore=e.dataStore,this.clientDataSourceGroupService=e.clientDataSourceGroupService,this.mixInAllCollections(this.dataStore)},isAnyTablesPresentInDomain:function(){return Boolean(this.tables.size())},isAnyDataSourceGroupsPresentInDomain:function(){return Boolean(this.dataSourceGroups.size())},getDataSourceByChildResource:function(e,t){var r=this.dataStore.getCollections(),n=o.getResourceByIdAndType(e,t,r);if(!i.isUndefined(n)){var a=o.getDataSourceByChildResource(n,r);return a&&a.toJSON()}},getResourcePath:function(e,t){var r,a=o.getResourceByIdAndType(e,t,this.dataStore.getCollections());if(i.isUndefined(a))throw new Error("Resource was not found.");if(n.isDataSourceGroup(a))r=[a.sourceName||a.name];else{if(!n.isDataSource(a))throw new Error("Only resources of type DataSource and DataSourceGroup are supported");r=[]}return r},getFieldByDataSourceIdAndParentNames:function(e,t,r){var o=this,u=this.dataSources.byId(e);r&&(u=u.getChildren().first());var s={entity:u},c=i.reduce(t,function(e,t){var r,i=e.entity;return i?(delete e.entity,r=i.getChildren().find(function(e){var r=e.toJSON();return(n.isDataSourceGroup(e)?o.clientDataSourceGroupService.getName(r):a(r))===t}),r&&(e.entity=r),e):e},s).entity;return c?i.extend(c.toJSON(),{parentId:c.getParentId(),tableId:c.getTableId()}):null}},u),r.exports=s});