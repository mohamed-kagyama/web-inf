/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","vue","../../../component/designer/metadataDesigner/enum/metadataDesignerCssClassesEnum","../../../common/predicate/showDefaultSchemaPredicate","../../../dispatcher/enum/applicationStateEventsEnum","../../../component/designer/metadataDesigner/sidebar/enum/metadataDesignerFetchTreeEventsBlacklistEnum","bundle!CommonBundle","../../../common/util/ResourceIdentifierGenerator","../../../../model/util/SequenceGenerator","../../../component/layout/sidebarView/controller/SidebarTreeController","../../../common/component/search/controller/SearchComponentController","../../../component/designer/metadataDesigner/controller/util/metadataDesignerSidebarCanSelectItem","../../../common/controller/BaseDesignerViewController","../../../../util/CompositeProcessor","../../../component/designer/metadataDesigner/component/factory/metadataDesignerVueConfigFactory","../../../component/designer/metadataDesigner/controller/MetadataDesignerController","../../../component/designer/metadataDesigner/factory/metadataDesignerTreeFactory","../../../component/designer/metadataDesigner/factory/metadataDesignerInternalTreeOptionsFactory","../../../component/designer/metadataDesigner/factory/MetadataDesignerMetadataResourcesTooltipOptionsFactory","../../../component/designer/metadataDesigner/view/MetadataDesignerTree","../../../component/designer/metadataDesigner/provider/MetadataDesignerCurrentDataSourceTypeBySidebarResourceProvider","../../../component/designer/metadataDesigner/controller/plugin/MetadataDesignerSidebarTreeSelectionPlugin","../../../component/layout/sidebarView/util/SidebarTreeSingleSelectionProvider","../../../component/designer/metadataDesigner/controller/MetadataDesignerSidebarSelectionController","../../../component/layout/sidebarView/tree/plugin/SidebarTreeExpandCollapsePlugin","../../../component/designer/metadataDesigner/component/schemaAttribute/controller/SchemaAttributeInputController","../../../component/designer/metadataDesigner/component/schemaAttribute/validator/SchemaAttributeInputValidator","../../../component/designer/metadataDesigner/component/schemaAttribute/factory/schemaAttributeInputVueConfigFactory","../../../component/designer/metadataDesigner/component/resourcesList/factory/resourcesListVueConfigFactory","../../../component/designer/metadataDesigner/component/resourcesList/factory/resourcesListInstructionsVueConfigFactory","../../../component/designer/metadataDesigner/component/resourcesList/mixin/droppableResourcesListMixinFactory","../../../component/designer/metadataDesigner/component/resourcesList/mixin/draggableResourcesListMixinFactory","../../../component/designer/metadataDesigner/component/resourcesList/mixin/rerenderResourcesListOnItemClickMixinFactory","../../../../util/predicate/CompositePredicate","../../../component/designer/metadataDesigner/treeDataProvider/MetadataDesignerTreeDataProvider","../../../component/designer/metadataDesigner/treeDataProvider/resultTree/ResultTreeDataProvider","../../../component/designer/metadataDesigner/treeDataProvider/resultTree/ResultTreeSelectionProvider","../../../component/designer/metadataDesigner/treeDataProvider/converter/ResourceToResultTreeItemConverter","../../../component/designer/metadataDesigner/treeDataProvider/sourceTree/SourceTreeDataProvider","../../../component/designer/metadataDesigner/treeDataProvider/sourceTree/SourceTreeSelectionProvider","../../../component/designer/metadataDesigner/treeDataProvider/converter/ResourceToSourceTreeItemConverter","../../../component/designer/metadataDesigner/treeDataProvider/predicate/MatchSearchCriteria","../../../component/designer/metadataDesigner/treeDataProvider/predicate/IsResourceAbsentInModelPredicate","../../../common/factory/addAutomationDataNameAttributeMixinFactory","../../../common/enum/automationDataNameAttributesEnum","../../../component/designer/metadataDesigner/treeDataProvider/processor/resourceTypeProcessor","../../../component/layout/sidebarView/util/sorter/byLabel","../../../common/provider/factory/TreeViewNodeFactory","../../../component/designer/metadataDesigner/converter/DataSourceMetadataToDTOConverter","../../../component/designer/metadataDesigner/controller/SwapButtonsController","../../../component/designer/metadataDesigner/component/swapButtons/factory/swapButtonsVueConfigFactory","../../../component/designer/metadataDesigner/controller/MetadataResourceInfoController","../../../component/designer/metadataDesigner/controller/provider/TreeSearchKeywordProvider","../../../component/designer/metadataDesigner/controller/TreeActionsController","../../../component/designer/metadataDesigner/strategy/MetadataFetchStrategy","../../../component/designer/metadataDesigner/controller/TreeActionsErrorsController","../../../component/designer/metadataDesigner/factory/metadataDesignerErrorByXhrFactory","../../../component/designer/metadataDesigner/factory/treeActionsErrorMessageFactory","../../../component/dialog/warningDialogWithCategories/store/WarningDialogWithCategoriesStore","../../../component/dialog/warningDialogWithCategories/factory/warningDialogWithCategoriesFactory","../../../component/designer/metadataDesigner/controller/provider/sourceTree/SourceTreeDataProviderOptionsProvider","../../../component/designer/metadataDesigner/controller/provider/sourceTree/SourceTreeViewModelOptionsProvider","../../../component/designer/metadataDesigner/controller/provider/sourceTree/sourceTreeSearchKeywordProvider","../../../component/designer/metadataDesigner/controller/provider/sourceTree/SourceTreeStateSelectionProvider","../../../component/designer/metadataDesigner/controller/provider/resultTree/ResultTreeDataProviderOptionsProvider","../../../component/designer/metadataDesigner/controller/provider/resultTree/ResultTreeViewModelOptionsProvider","../../../component/designer/metadataDesigner/controller/provider/resultTree/resultTreeSearchKeywordProvider","../../../component/designer/metadataDesigner/controller/provider/resultTree/resultTreeSelectionProvider","../../../component/designer/metadataDesigner/controller/DataSourceMetadataTreeController","../../../component/designer/metadataDesigner/provider/metadataDesignerDispatcherActionNameProvider","../../../component/designer/metadataDesigner/strategy/AddFetchedResourcesToSchemaStrategy","../../../component/designer/metadataDesigner/provider/MetadataDesignerResourcesParentIdProvider","../../../component/designer/metadataDesigner/factory/currentResourceInfoFactory","../../../common/converter/emptyProfileAttributeValuesToPlaceholderLabelConverter","../../../component/designer/metadataDesigner/provider/metadataDesignerSourceTreeSelectionByResourcesProvider","../../../component/designer/metadataDesigner/strategy/MetadataDesignerRemoveSelectedResourcesStrategy","../../../component/designer/metadataDesigner/strategy/MetadataDesignerRemoveDefaultSchemaChildrenAndSelectedResourcesStrategy","text!../../../component/designer/metadataDesigner/template/availableSchemasTreeItemsTemplate.htm","text!../../../component/designer/metadataDesigner/template/selectedSchemasTreeItemsTemplate.htm","../../../common/component/search/store/SearchStore","../../../common/component/search/factory/searchVueWrapperConfigFactory","../../../common/component/search/factory/searchVueConfigFactory","../../../../util/eventBusFactory"],function(e,t,r){function a(e,t){var r=L.create({metadataDesignerEventBus:e.get("metadataDesignerEventBus")}),a=Q.create({config:r,dataNames:z.metadataDesigner.schemaAttribute});e.register("schemaAttributeInputVueConfig",a)}function o(e,t){e.register("schemasNameGenerator",new D({sequenceGenerator:new p}));var r=new te({schemasNameGenerator:e.get("schemasNameGenerator"),tableReferenceNameGenerator:new D({sequenceGenerator:new p}),fieldsNameGenerator:new D({sequenceGenerator:new p}),clientDomainSchemaService:e.get("clientDomainSchemaService")});e.register("metadataFetchStrategy",new se({metadataService:e.get("metadataServiceWrappedWithLoader")})),e.register("metadataResourceInfoController",new oe({clientDomainSchemaService:e.get("clientDomainSchemaService"),clientDomainSchemaMetadataService:e.get("clientDomainSchemaMetadataService"),metadataDesignerViewStateModelService:e.get("metadataDesignerViewStateModelService"),metadataDesignerVueStore:e.get("metadataDesignerVueStore"),currentResourceInfoFactory:Ce,storeChangeEventBus:e.get("storeChangeEventBus"),clientDataSourceGroupService:e.get("clientDataSourceGroupService"),metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider:e.get("metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider")})),e.register("metadataDesignerSidebarSearchController",new v({eventBus:e.get("metadataDesignerSidebarSearchEventBus"),storeChangeEventBus:e.get("storeChangeEventBus"),store:e.get("metadataDesignerSidebarSearchStore"),searchKeywordProvider:e.get("metadataDesignerSidebarSearchKeywordProvider"),applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),dispatcherEventName:m.METADATA_DESIGNER_SET_SIDEBAR_SEARCH_KEYWORD,onChangeStateSearchStrategy:e.get("onChangeStateSidebarSearchStrategy")})),e.register("metadataDesignerSidebarTreeSelectionProvider",new f({clientViewStateModelService:e.get("metadataDesignerViewStateModelService")})),e.register("metadataDesignerSidebarTreeController",new S({selectionProvider:e.get("metadataDesignerSidebarTreeSelectionProvider"),storeChangeEventBus:e.get("storeChangeEventBus"),tree:e.get("metadataDesignerSidebarTree"),treeDataProvider:e.get("metadataDesignerSidebarTreeDataProvider"),model:e.get("metadataDesignerSidebarStore"),fetchTreeEventsBlacklist:l})),e.register("schemaAttributeInputValidator",new F({domainSchemaSpecification:e.get("domainSchemaSpecification"),metadataService:e.get("metadataServiceWrappedWithLoader"),profileAttributesService:e.get("profileAttributesServiceWithEncrytedAttributeErrorHandling"),clientResourcePropertiesService:e.get("clientResourcePropertiesService"),metadataDesignerErrorByXhrFactory:de})),e.register("schemaAttributeInputController",new I({storeChangeEventBus:e.get("storeChangeEventBus"),metadataDesignerEventBus:e.get("metadataDesignerEventBus"),applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),metadataDesignerVueStore:e.get("metadataDesignerVueStore"),schemaAttributeInputValidator:e.get("schemaAttributeInputValidator"),clientDomainSchemaService:e.get("clientDomainSchemaService"),schemasNameGenerator:e.get("schemasNameGenerator"),metadataDesignerViewStateModelService:e.get("metadataDesignerViewStateModelService")})),e.register("sourceTreeViewModelOptionsProvider",new De({metadataDesignerViewStateModelService:e.get("metadataDesignerViewStateModelService"),clientDomainSchemaMetadataService:e.get("clientDomainSchemaMetadataService"),clientResourcePropertiesService:e.get("clientResourcePropertiesService")})),e.register("sourceTreeStateSelectionProvider",new Se({model:e.get("sourceTreeViewModel")})),e.register("sourceTreeDataProviderOptionsProvider",new ue({model:e.get("sourceTreeViewModel"),treeSelectionProvider:e.get("sourceTreeStateSelectionProvider"),metadataDesignerViewStateModelService:e.get("metadataDesignerViewStateModelService")})),e.register("sourceTreeController",new ye({model:e.get("sourceTreeViewModel"),treeView:e.get("sourceMetadataDesignerTree"),treeDataProvider:e.get("sourceTreeDataProvider"),storeChangeEventBus:e.get("storeChangeEventBus"),applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),selectionEvent:m.METADATA_DESIGNER_SET_SOURCE_TREE_SELECTION,viewModelOptionsProvider:e.get("sourceTreeViewModelOptionsProvider"),treeDataProviderOptionsProvider:e.get("sourceTreeDataProviderOptionsProvider"),treeSearchKeywordProvider:pe,treeSelectionProvider:e.get("sourceTreeStateSelectionProvider")})),e.register("resultTreeViewModelOptionsProvider",new he({})),e.register("resultTreeDataProviderOptionsProvider",new ve({model:e.get("resultTreeViewModel"),treeSelectionProvider:Ee})),e.register("resultTreeController",new ye({model:e.get("resultTreeViewModel"),treeView:e.get("resultMetadataDesignerTree"),treeDataProvider:e.get("resultTreeDataProvider"),storeChangeEventBus:e.get("storeChangeEventBus"),applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),selectionEvent:m.METADATA_DESIGNER_SET_RESULT_TREE_SELECTION,viewModelOptionsProvider:e.get("resultTreeViewModelOptionsProvider"),treeDataProviderOptionsProvider:e.get("resultTreeDataProviderOptionsProvider"),treeSearchKeywordProvider:Te,treeSelectionProvider:Ee})),e.register("metadataDesignerResourcesParentIdProvider",new Re({clientDomainSchemaService:e.get("clientDomainSchemaService"),metadataDesignerViewStateModelService:e.get("metadataDesignerViewStateModelService"),schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec:e.get("schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec")})),e.register("addFetchedResourcesToSchemaStrategy",new we({metadataToDTOConverter:r,applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),metadataDesignerDispatcherActionNameProvider:Pe})),e.register("metadataDesignerRemoveSelectedResourcesStrategy",new Me({applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),sourceTreeSelectionProvider:Be,metadataDesignerDispatcherActionNameProvider:Pe,resourcesParentIdProvider:e.get("metadataDesignerResourcesParentIdProvider")})),e.register("metadataDesignerRemoveDefaultSchemaChildrenAndSelectedResourcesStrategy",new fe({applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),sourceTreeSelectionProvider:Be,resourcesParentIdProvider:e.get("metadataDesignerResourcesParentIdProvider")})),e.register("addResourcesWarningDialogStore",new me({confirmLabel:u["button.ok"],confirmEvent:"warningDialog:addResources",rejectLabel:u["button.cancel"],rejectEvent:"warningDialog:cancelResourcesAdd"})),e.register("addResourcesWarningDialog",le.create({store:e.get("addResourcesWarningDialogStore"),eventBus:e.get("metadataDesignerEventBus"),dataAttribute:z.metadataDesigner.missingOrChildlessObjectsConfirmationDialog})),e.register("treeActionsErrorsController",new ce({metadataDesignerEventBus:e.get("metadataDesignerEventBus"),applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),addFetchedResourcesToSchemaStrategy:e.get("addFetchedResourcesToSchemaStrategy"),treeActionsErrorMessageFactory:ge,confirmationDialog:e.get("addResourcesWarningDialog"),confirmationDialogStore:e.get("addResourcesWarningDialogStore"),metadataDesignerErrorByXhrFactory:de})),e.register("metadataDesignerController",new P({metadataDesignerEventBus:e.get("metadataDesignerEventBus"),metadataDesignerVueStore:e.get("metadataDesignerVueStore"),storeChangeEventBus:e.get("storeChangeEventBus"),metadataDesignerViewStateModelService:e.get("metadataDesignerViewStateModelService")})),e.register("swapButtonsController",new re({swapButtonsStore:e.get("swapButtonsStore"),storeChangeEventBus:e.get("storeChangeEventBus")})),e.register("treeActionsController",new ie({sourceTree:e.get("sourceMetadataDesignerTree"),resultTree:e.get("resultMetadataDesignerTree"),sourceTreeDataProvider:e.get("sourceTreeDataProvider"),resultTreeDataProvider:e.get("resultTreeDataProvider"),storeChangeEventBus:e.get("storeChangeEventBus"),clientResourcePropertiesService:e.get("clientResourcePropertiesService"),metadataDesignerEventBus:e.get("metadataDesignerEventBus"),metadataDesignerResourcesParentIdProvider:e.get("metadataDesignerResourcesParentIdProvider"),clientDomainSchemaMetadataService:e.get("clientDomainSchemaMetadataService"),metadataDesignerViewStateModelService:e.get("metadataDesignerViewStateModelService"),metadataFetchStrategy:e.get("metadataFetchStrategy"),addFetchedResourcesToSchemaStrategy:e.get("addFetchedResourcesToSchemaStrategy"),metadataDesignerRemoveSelectedResourcesStrategy:e.get("metadataDesignerRemoveSelectedResourcesStrategy"),metadataDesignerRemoveDefaultSchemaChildrenAndSelectedResourcesStrategy:e.get("metadataDesignerRemoveDefaultSchemaChildrenAndSelectedResourcesStrategy")})),e.register("availableResourcesSearchController",new v({searchKeywordProvider:new ne({treeName:"sourceTree"}),dispatcherEventName:m.METADATA_DESIGNER_SET_SOURCE_TREE_SEARCH_KEYWORD,eventBus:e.get("availableResourcesSearchEventBus"),store:e.get("availableResourcesSearchStore"),storeChangeEventBus:e.get("storeChangeEventBus"),applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),onChangeStateSearchStrategy:e.get("onChangeStateSearchStrategy")})),e.register("selectedResourcesSearchController",new v({searchKeywordProvider:new ne({treeName:"resultTree"}),dispatcherEventName:m.METADATA_DESIGNER_SET_RESULT_TREE_SEARCH_KEYWORD,eventBus:e.get("selectedResourcesSearchEventBus"),store:e.get("selectedResourcesSearchStore"),storeChangeEventBus:e.get("storeChangeEventBus"),applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),onChangeStateSearchStrategy:e.get("onChangeStateSearchStrategy")})),e.register("metadataDesignerViewController",new T({storeChangeEventBus:e.get("storeChangeEventBus"),model:e.get("metadataDesignerVueStore")})),e.register("metadataDesignerSidebarTreeExpandCollapsePlugin",new V({eventBus:e.get("applicationDispatcherEventBus"),expandedNodesProvider:e.get("viewStateModelQueryService"),searchKeywordProvider:e.get("metadataDesignerSidebarSearchKeywordProvider"),el:e.get("metadataDesignerSidebar").$el,expandNodeEvent:m.EXPAND_SIDEBAR_NODE,collapseNodeEvent:m.COLLAPSE_SIDEBAR_NODE})),e.register("metadataDesignerSidebarTreeSelectionPlugin",new M({metadataDesignerEventBus:e.get("metadataDesignerEventBus"),sidebarTreeModel:e.get("metadataDesignerSidebarNestedTreeModel"),el:e.get("metadataDesignerSidebar").$el})),e.register("metadataDesignerSidebarSelectionController",new A({metadataDesignerEventBus:e.get("metadataDesignerEventBus"),applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),canSelectItem:h}))}function n(e,t){var r=new U({clientDataSourceGroupService:e.get("clientDataSourceGroupService"),treeViewNodeFactory:new ee({cssClass:d.TREE_RESULT_ITEM,node:!1})}),a=new j({treeViewNodeFactory:new ee({cssClass:d.TREE_SOURCE_ITEM,node:!1})}),o=new Y,n=new E([J]).process;e.register("resultTreeDataProvider",new K({dataProvider:new H({sort:Z,process:n,match:new G([o.match,g]).match,convertToTreeItem:r.convert,schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec:e.get("schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec"),emptyProfileAttributeValuesToPlaceholderLabelConverter:be}),selectedResourcesProvider:new q({process:n,schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec:e.get("schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec")}),searchKeywordHolder:o}));var i=new Y,s=new $({schemaResourcesNamesAreEqualSpecification:e.get("schemaResourcesNamesAreEqualSpecification"),schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec:e.get("schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec")});e.register("sourceTreeDataProvider",new K({dataProvider:new k({metadataService:e.get("metadataServiceWrappedWithNotification"),convertToTreeItem:a.convert,match:new G([i.match,s.match]).match,sorter:Z}),selectedResourcesProvider:new X({metadataService:e.get("metadataServiceWrappedWithNotification")}),searchKeywordHolder:i}))}function i(e,t){e.register("metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider",new B({clientDomainSchemaService:e.get("clientDomainSchemaService"),metadataDesignerViewStateModelService:e.get("metadataDesignerViewStateModelService")}));var r=new C({metadataDesignerViewStateModelService:e.get("metadataDesignerViewStateModelService"),metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider:e.get("metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider")}),a=R.getTreeOptions({listItemHeight:t.list.listItemHeight,getData:e.get("sourceTreeDataProvider").getData,template:Ae,metadataDesignerMetadataResourcesTooltipOptionsFactory:r});e.register("sourceMetadataDesignerTree",new b({debounceTime:t.loader.dialog.loadingDelay+t.loader.embedded.loadingMinDuration,tree:w.create(a)}));var o=N.create({tree:e.get("sourceMetadataDesignerTree"),mixins:[_.create({accept:"."+d.TREE_RESULT_ITEM}),x.create({tree:e.get("sourceMetadataDesignerTree")}),W.create({tree:e.get("sourceMetadataDesignerTree")})]}),n=Q.create({config:o,dataNames:z.metadataDesigner.resourcesListSourceMetadata}),i=c.extend(n),s=R.getTreeOptions({listItemHeight:t.list.listItemHeight,getData:e.get("resultTreeDataProvider").getData,template:Ve,metadataDesignerMetadataResourcesTooltipOptionsFactory:r});e.register("resultMetadataDesignerTree",new b({debounceTime:t.loader.dialog.loadingDelay+t.loader.embedded.loadingMinDuration,tree:w.create(s)}));var g=_.create({accept:"."+d.TREE_SOURCE_ITEM}),m=N.create({tree:e.get("resultMetadataDesignerTree"),mixins:[g,x.create({tree:e.get("resultMetadataDesignerTree")})]}),l=Q.create({config:m,dataNames:z.metadataDesigner.resourcesListResultMetadata}),u=c.extend(l),D=O.create({mixins:[g]}),p=Q.create({config:D,dataNames:z.metadataDesigner.resourcesListInstructions}),S=c.extend(p);e.register("availableResourcesSearchStore",new Ie({isVisible:!0})),e.register("availableResourcesSearchEventBus",Ne.create());var v=c.extend(Q.create({config:Le.create({eventBus:e.get("availableResourcesSearchEventBus")}),dataNames:z.metadataDesigner.sourceTreeSearch}));e.register("availableResourcesSearch",c.extend(Fe.create({search:v,data:e.get("availableResourcesSearchStore").attributes}))),e.register("selectedResourcesSearchStore",new Ie({isVisible:!0})),e.register("selectedResourcesSearchEventBus",Ne.create());var h=c.extend(Q.create({config:Le.create({eventBus:e.get("selectedResourcesSearchEventBus")}),dataNames:z.metadataDesigner.resultTreeSearch}));e.register("selectedResourcesSearch",c.extend(Fe.create({search:h,data:e.get("selectedResourcesSearchStore").attributes})));var T=ae.create({data:e.get("swapButtonsStore").attributes,throttleTime:t.loader.dialog.loadingDelay,storeChangeEventBus:e.get("storeChangeEventBus"),metadataDesignerEventBus:e.get("metadataDesignerEventBus")}),E=Q.create({config:T,dataNames:z.metadataDesigner.swapButtons});e.register("swapButtons",c.extend(E)),e.register("schemaAttributeInput",c.extend(e.get("schemaAttributeInputVueConfig"))),e.register("metadataDesignerVueConfig",y.create({metadataDesignerEventBus:e.get("metadataDesignerEventBus"),data:e.get("metadataDesignerVueStore").attributes,sourceList:i,resultList:u,resultListInstructions:S,schemaAttribute:e.get("schemaAttributeInput"),availableResourcesSearch:e.get("availableResourcesSearch"),selectedResourcesSearch:e.get("selectedResourcesSearch"),swapButtons:e.get("swapButtons")}))}function s(e,t){a(e,t),n(e,t),i(e,t),o(e,t)}var c=e("vue"),d=e("../../../component/designer/metadataDesigner/enum/metadataDesignerCssClassesEnum"),g=e("../../../common/predicate/showDefaultSchemaPredicate"),m=e("../../../dispatcher/enum/applicationStateEventsEnum"),l=e("../../../component/designer/metadataDesigner/sidebar/enum/metadataDesignerFetchTreeEventsBlacklistEnum"),u=e("bundle!CommonBundle"),D=e("../../../common/util/ResourceIdentifierGenerator"),p=e("../../../../model/util/SequenceGenerator"),S=e("../../../component/layout/sidebarView/controller/SidebarTreeController"),v=e("../../../common/component/search/controller/SearchComponentController"),h=e("../../../component/designer/metadataDesigner/controller/util/metadataDesignerSidebarCanSelectItem"),T=e("../../../common/controller/BaseDesignerViewController"),E=e("../../../../util/CompositeProcessor"),y=e("../../../component/designer/metadataDesigner/component/factory/metadataDesignerVueConfigFactory"),P=e("../../../component/designer/metadataDesigner/controller/MetadataDesignerController"),w=e("../../../component/designer/metadataDesigner/factory/metadataDesignerTreeFactory"),R=e("../../../component/designer/metadataDesigner/factory/metadataDesignerInternalTreeOptionsFactory"),C=e("../../../component/designer/metadataDesigner/factory/MetadataDesignerMetadataResourcesTooltipOptionsFactory"),b=e("../../../component/designer/metadataDesigner/view/MetadataDesignerTree"),B=e("../../../component/designer/metadataDesigner/provider/MetadataDesignerCurrentDataSourceTypeBySidebarResourceProvider"),M=e("../../../component/designer/metadataDesigner/controller/plugin/MetadataDesignerSidebarTreeSelectionPlugin"),f=e("../../../component/layout/sidebarView/util/SidebarTreeSingleSelectionProvider"),A=e("../../../component/designer/metadataDesigner/controller/MetadataDesignerSidebarSelectionController"),V=e("../../../component/layout/sidebarView/tree/plugin/SidebarTreeExpandCollapsePlugin"),I=e("../../../component/designer/metadataDesigner/component/schemaAttribute/controller/SchemaAttributeInputController"),F=e("../../../component/designer/metadataDesigner/component/schemaAttribute/validator/SchemaAttributeInputValidator"),L=e("../../../component/designer/metadataDesigner/component/schemaAttribute/factory/schemaAttributeInputVueConfigFactory"),N=e("../../../component/designer/metadataDesigner/component/resourcesList/factory/resourcesListVueConfigFactory"),O=e("../../../component/designer/metadataDesigner/component/resourcesList/factory/resourcesListInstructionsVueConfigFactory"),_=e("../../../component/designer/metadataDesigner/component/resourcesList/mixin/droppableResourcesListMixinFactory"),x=e("../../../component/designer/metadataDesigner/component/resourcesList/mixin/draggableResourcesListMixinFactory"),W=e("../../../component/designer/metadataDesigner/component/resourcesList/mixin/rerenderResourcesListOnItemClickMixinFactory"),G=e("../../../../util/predicate/CompositePredicate"),K=e("../../../component/designer/metadataDesigner/treeDataProvider/MetadataDesignerTreeDataProvider"),H=e("../../../component/designer/metadataDesigner/treeDataProvider/resultTree/ResultTreeDataProvider"),q=e("../../../component/designer/metadataDesigner/treeDataProvider/resultTree/ResultTreeSelectionProvider"),U=e("../../../component/designer/metadataDesigner/treeDataProvider/converter/ResourceToResultTreeItemConverter"),k=e("../../../component/designer/metadataDesigner/treeDataProvider/sourceTree/SourceTreeDataProvider"),X=e("../../../component/designer/metadataDesigner/treeDataProvider/sourceTree/SourceTreeSelectionProvider"),j=e("../../../component/designer/metadataDesigner/treeDataProvider/converter/ResourceToSourceTreeItemConverter"),Y=e("../../../component/designer/metadataDesigner/treeDataProvider/predicate/MatchSearchCriteria"),$=e("../../../component/designer/metadataDesigner/treeDataProvider/predicate/IsResourceAbsentInModelPredicate"),Q=e("../../../common/factory/addAutomationDataNameAttributeMixinFactory"),z=e("../../../common/enum/automationDataNameAttributesEnum"),J=e("../../../component/designer/metadataDesigner/treeDataProvider/processor/resourceTypeProcessor"),Z=e("../../../component/layout/sidebarView/util/sorter/byLabel"),ee=e("../../../common/provider/factory/TreeViewNodeFactory"),te=e("../../../component/designer/metadataDesigner/converter/DataSourceMetadataToDTOConverter"),re=e("../../../component/designer/metadataDesigner/controller/SwapButtonsController"),ae=e("../../../component/designer/metadataDesigner/component/swapButtons/factory/swapButtonsVueConfigFactory"),oe=e("../../../component/designer/metadataDesigner/controller/MetadataResourceInfoController"),ne=e("../../../component/designer/metadataDesigner/controller/provider/TreeSearchKeywordProvider"),ie=e("../../../component/designer/metadataDesigner/controller/TreeActionsController"),se=e("../../../component/designer/metadataDesigner/strategy/MetadataFetchStrategy"),ce=e("../../../component/designer/metadataDesigner/controller/TreeActionsErrorsController"),de=e("../../../component/designer/metadataDesigner/factory/metadataDesignerErrorByXhrFactory"),ge=e("../../../component/designer/metadataDesigner/factory/treeActionsErrorMessageFactory"),me=e("../../../component/dialog/warningDialogWithCategories/store/WarningDialogWithCategoriesStore"),le=e("../../../component/dialog/warningDialogWithCategories/factory/warningDialogWithCategoriesFactory"),ue=e("../../../component/designer/metadataDesigner/controller/provider/sourceTree/SourceTreeDataProviderOptionsProvider"),De=e("../../../component/designer/metadataDesigner/controller/provider/sourceTree/SourceTreeViewModelOptionsProvider"),pe=e("../../../component/designer/metadataDesigner/controller/provider/sourceTree/sourceTreeSearchKeywordProvider"),Se=e("../../../component/designer/metadataDesigner/controller/provider/sourceTree/SourceTreeStateSelectionProvider"),ve=e("../../../component/designer/metadataDesigner/controller/provider/resultTree/ResultTreeDataProviderOptionsProvider"),he=e("../../../component/designer/metadataDesigner/controller/provider/resultTree/ResultTreeViewModelOptionsProvider"),Te=e("../../../component/designer/metadataDesigner/controller/provider/resultTree/resultTreeSearchKeywordProvider"),Ee=e("../../../component/designer/metadataDesigner/controller/provider/resultTree/resultTreeSelectionProvider"),ye=e("../../../component/designer/metadataDesigner/controller/DataSourceMetadataTreeController"),Pe=e("../../../component/designer/metadataDesigner/provider/metadataDesignerDispatcherActionNameProvider"),we=e("../../../component/designer/metadataDesigner/strategy/AddFetchedResourcesToSchemaStrategy"),Re=e("../../../component/designer/metadataDesigner/provider/MetadataDesignerResourcesParentIdProvider"),Ce=e("../../../component/designer/metadataDesigner/factory/currentResourceInfoFactory"),be=e("../../../common/converter/emptyProfileAttributeValuesToPlaceholderLabelConverter"),Be=e("../../../component/designer/metadataDesigner/provider/metadataDesignerSourceTreeSelectionByResourcesProvider"),Me=e("../../../component/designer/metadataDesigner/strategy/MetadataDesignerRemoveSelectedResourcesStrategy"),fe=e("../../../component/designer/metadataDesigner/strategy/MetadataDesignerRemoveDefaultSchemaChildrenAndSelectedResourcesStrategy"),Ae=e("text!../../../component/designer/metadataDesigner/template/availableSchemasTreeItemsTemplate.htm"),Ve=e("text!../../../component/designer/metadataDesigner/template/selectedSchemasTreeItemsTemplate.htm"),Ie=e("../../../common/component/search/store/SearchStore"),Fe=e("../../../common/component/search/factory/searchVueWrapperConfigFactory"),Le=e("../../../common/component/search/factory/searchVueConfigFactory"),Ne=e("../../../../util/eventBusFactory");r.exports=s});