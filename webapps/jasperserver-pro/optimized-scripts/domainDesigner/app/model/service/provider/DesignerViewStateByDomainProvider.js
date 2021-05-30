/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../model/schema/util/entityUtil","../../enum/canvasViewDesignersEnum","../../../../model/schema/enum/schemaEntitiesEnum","../../../../model/schema/enum/schemaCollectionsEnum","../../../component/layout/sidebarView/enum/artificialTreeResourceTypesEnum"],function(e,i,t){var r=e("underscore"),n=e("../../../../model/schema/util/entityUtil"),o=e("../../enum/canvasViewDesignersEnum"),s=e("../../../../model/schema/enum/schemaEntitiesEnum"),a=e("../../../../model/schema/enum/schemaCollectionsEnum"),l=e("../../../component/layout/sidebarView/enum/artificialTreeResourceTypesEnum"),c=[{artificial:!0,type:l.DERIVED_TABLE_GROUP,lookupType:s.DERIVED_TABLE,lookupCollection:a.TABLES},{artificial:!0,type:l.CONSTANT_GROUP,lookupType:s.CONSTANT_GROUP,lookupCollection:a.CONSTANT_GROUPS},{type:s.DATA_SOURCE,collection:a.DATA_SOURCES,childrenCollection:"children"},{type:s.DATA_SOURCE_GROUP,collection:a.DATA_SOURCE_GROUPS,childrenCollection:"children"},{type:s.JOIN_TREE,collection:a.JOIN_TREES,childrenCollection:a.JOIN_ALIASES}],d=function(e){this.initialize(e)};r.extend(d.prototype,{initialize:function(e){this.viewStateDefaultsProvider=e.viewStateDefaultsProvider,this.designerViewStateMetadataDesignerFirstDataSourceSelectionProvider=e.designerViewStateMetadataDesignerFirstDataSourceSelectionProvider,this.designerViewStateFiltersPositionsProvider=e.designerViewStateFiltersPositionsProvider,this.designerViewStateJoinTreesStateProvider=e.designerViewStateJoinTreesStateProvider,this.designerViewStateJoinsStateProvider=e.designerViewStateJoinsStateProvider},getViewState:function(e,i){var t=this,r=e.dataSources.first().name,n=i.dataSourceType,s=i.currentDesigner,a=this.viewStateDefaultsProvider.defaults();a.dataSource[r]={type:n},a.currentDesigner=s||a.currentDesigner,a.designer.sidebar.expandedNodes=c.reduce(function(i,r){return r.artificial?t._isArtificialGroupNotEmpty(r,e)&&(i[r.type]={type:r.type}):i=e[r.collection].reduce(function(e,i){return i[r.childrenCollection].size()&&(e[i.id]={type:r.type}),e},i),i},{});var l=this.designerViewStateJoinTreesStateProvider.getJoinTreesViewState(e.joinTrees),d=this.designerViewStateJoinsStateProvider.getJoinsViewStateByJoinTrees(e.joinTrees),u=this.designerViewStateFiltersPositionsProvider.getFiltersPositionsByFilters(e.filters),S=this.designerViewStateMetadataDesignerFirstDataSourceSelectionProvider.getSidebarSelectedResource(e.dataSources);return a.designer[o.JOINS_DESIGNER].joinTrees=l,a.designer[o.JOINS_DESIGNER].joins=d,a.designer[o.FILTERS_DESIGNER].filtersPositions=u,a.designer[o.METADATA_DESIGNER].selectedResource=S,a},_isArtificialGroupNotEmpty:function(e,i){return i[e.lookupCollection].some(function(i){return n.getEntityName(i)===e.lookupType})}}),t.exports=d});