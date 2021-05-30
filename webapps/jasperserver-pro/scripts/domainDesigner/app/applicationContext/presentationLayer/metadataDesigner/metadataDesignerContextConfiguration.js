define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var metadataDesignerCssClassesEnum = require("../../../component/designer/metadataDesigner/enum/metadataDesignerCssClassesEnum");

var showDefaultSchemaPredicate = require("../../../common/predicate/showDefaultSchemaPredicate");

var applicationStateEventsEnum = require("../../../dispatcher/enum/applicationStateEventsEnum");

var metadataDesignerFetchTreeEventsBlacklistEnum = require("../../../component/designer/metadataDesigner/sidebar/enum/metadataDesignerFetchTreeEventsBlacklistEnum");

var i18n2 = require("bundle!CommonBundle");

var ResourceIdentifierGenerator = require("../../../common/util/ResourceIdentifierGenerator");

var SequenceGenerator = require("../../../../model/util/SequenceGenerator");

var SidebarTreeController = require("../../../component/layout/sidebarView/controller/SidebarTreeController");

var SearchComponentController = require("../../../common/component/search/controller/SearchComponentController");

var metadataDesignerSidebarCanSelectItem = require("../../../component/designer/metadataDesigner/controller/util/metadataDesignerSidebarCanSelectItem");

var BaseDesignerViewController = require("../../../common/controller/BaseDesignerViewController");

var CompositeProcessor = require("../../../../util/CompositeProcessor");

var metadataDesignerVueConfigFactory = require("../../../component/designer/metadataDesigner/component/factory/metadataDesignerVueConfigFactory");

var MetadataDesignerController = require("../../../component/designer/metadataDesigner/controller/MetadataDesignerController");

var metadataDesignerTreeFactory = require("../../../component/designer/metadataDesigner/factory/metadataDesignerTreeFactory");

var metadataDesignerInternalTreeOptionsFactory = require("../../../component/designer/metadataDesigner/factory/metadataDesignerInternalTreeOptionsFactory");

var MetadataDesignerMetadataResourcesTooltipOptionsFactory = require("../../../component/designer/metadataDesigner/factory/MetadataDesignerMetadataResourcesTooltipOptionsFactory");

var MetadataDesignerTree = require("../../../component/designer/metadataDesigner/view/MetadataDesignerTree");

var MetadataDesignerCurrentDataSourceTypeBySidebarResourceProvider = require("../../../component/designer/metadataDesigner/provider/MetadataDesignerCurrentDataSourceTypeBySidebarResourceProvider");

var MetadataDesignerSidebarTreeSelectionPlugin = require("../../../component/designer/metadataDesigner/controller/plugin/MetadataDesignerSidebarTreeSelectionPlugin");

var SidebarTreeSingleSelectionProvider = require("../../../component/layout/sidebarView/util/SidebarTreeSingleSelectionProvider");

var MetadataDesignerSidebarSelectionController = require("../../../component/designer/metadataDesigner/controller/MetadataDesignerSidebarSelectionController");

var SidebarTreeExpandCollapsePlugin = require("../../../component/layout/sidebarView/tree/plugin/SidebarTreeExpandCollapsePlugin");

var SchemaAttributeInputController = require("../../../component/designer/metadataDesigner/component/schemaAttribute/controller/SchemaAttributeInputController");

var SchemaAttributeInputValidator = require("../../../component/designer/metadataDesigner/component/schemaAttribute/validator/SchemaAttributeInputValidator");

var schemaAttributeInputVueConfigFactory = require("../../../component/designer/metadataDesigner/component/schemaAttribute/factory/schemaAttributeInputVueConfigFactory");

var resourcesListVueConfigFactory = require("../../../component/designer/metadataDesigner/component/resourcesList/factory/resourcesListVueConfigFactory");

var resourcesListInstructionsVueConfigFactory = require("../../../component/designer/metadataDesigner/component/resourcesList/factory/resourcesListInstructionsVueConfigFactory");

var droppableResourcesListMixinFactory = require("../../../component/designer/metadataDesigner/component/resourcesList/mixin/droppableResourcesListMixinFactory");

var draggableResourcesListMixinFactory = require("../../../component/designer/metadataDesigner/component/resourcesList/mixin/draggableResourcesListMixinFactory");

var rerenderResourcesListOnItemClickMixinFactory = require("../../../component/designer/metadataDesigner/component/resourcesList/mixin/rerenderResourcesListOnItemClickMixinFactory");

var CompositePredicate = require("../../../../util/predicate/CompositePredicate");

var MetadataDesignerTreeDataProvider = require("../../../component/designer/metadataDesigner/treeDataProvider/MetadataDesignerTreeDataProvider");

var ResultTreeDataProvider = require("../../../component/designer/metadataDesigner/treeDataProvider/resultTree/ResultTreeDataProvider");

var ResultTreeSelectionProvider = require("../../../component/designer/metadataDesigner/treeDataProvider/resultTree/ResultTreeSelectionProvider");

var ResourceToResultTreeItemConverter = require("../../../component/designer/metadataDesigner/treeDataProvider/converter/ResourceToResultTreeItemConverter");

var SourceTreeDataProvider = require("../../../component/designer/metadataDesigner/treeDataProvider/sourceTree/SourceTreeDataProvider");

var SourceTreeSelectionProvider = require("../../../component/designer/metadataDesigner/treeDataProvider/sourceTree/SourceTreeSelectionProvider");

var ResourceToSourceTreeItemConverter = require("../../../component/designer/metadataDesigner/treeDataProvider/converter/ResourceToSourceTreeItemConverter");

var MatchSearchCriteria = require("../../../component/designer/metadataDesigner/treeDataProvider/predicate/MatchSearchCriteria");

var IsResourceAbsentInModelPredicate = require("../../../component/designer/metadataDesigner/treeDataProvider/predicate/IsResourceAbsentInModelPredicate");

var addAutomationDataNameAttributeMixinFactory = require("../../../common/factory/addAutomationDataNameAttributeMixinFactory");

var automationDataNameAttributesEnum = require("../../../common/enum/automationDataNameAttributesEnum");

var resourceTypeProcessor = require("../../../component/designer/metadataDesigner/treeDataProvider/processor/resourceTypeProcessor");

var byLabelSorter = require("../../../component/layout/sidebarView/util/sorter/byLabel");

var TreeViewNodeFactory = require("../../../common/provider/factory/TreeViewNodeFactory");

var DataSourceMetadataToDTOConverter = require("../../../component/designer/metadataDesigner/converter/DataSourceMetadataToDTOConverter");

var SwapButtonsController = require("../../../component/designer/metadataDesigner/controller/SwapButtonsController");

var swapButtonsVueConfigFactory = require("../../../component/designer/metadataDesigner/component/swapButtons/factory/swapButtonsVueConfigFactory");

var MetadataResourceInfoController = require("../../../component/designer/metadataDesigner/controller/MetadataResourceInfoController");

var TreeSearchKeywordProvider = require("../../../component/designer/metadataDesigner/controller/provider/TreeSearchKeywordProvider");

var TreeActionsController = require("../../../component/designer/metadataDesigner/controller/TreeActionsController");

var MetadataFetchStrategy = require("../../../component/designer/metadataDesigner/strategy/MetadataFetchStrategy");

var TreeActionsErrorsController = require("../../../component/designer/metadataDesigner/controller/TreeActionsErrorsController");

var metadataDesignerErrorByXhrFactory = require("../../../component/designer/metadataDesigner/factory/metadataDesignerErrorByXhrFactory");

var treeActionsErrorMessageFactory = require("../../../component/designer/metadataDesigner/factory/treeActionsErrorMessageFactory");

var WarningDialogWithCategoriesStore = require("../../../component/dialog/warningDialogWithCategories/store/WarningDialogWithCategoriesStore");

var warningDialogWithCategoriesFactory = require("../../../component/dialog/warningDialogWithCategories/factory/warningDialogWithCategoriesFactory");

var SourceTreeDataProviderOptionsProvider = require("../../../component/designer/metadataDesigner/controller/provider/sourceTree/SourceTreeDataProviderOptionsProvider");

var SourceTreeViewModelOptionsProvider = require("../../../component/designer/metadataDesigner/controller/provider/sourceTree/SourceTreeViewModelOptionsProvider");

var sourceTreeSearchKeywordProvider = require("../../../component/designer/metadataDesigner/controller/provider/sourceTree/sourceTreeSearchKeywordProvider");

var SourceTreeStateSelectionProvider = require("../../../component/designer/metadataDesigner/controller/provider/sourceTree/SourceTreeStateSelectionProvider");

var ResultTreeDataProviderOptionsProvider = require("../../../component/designer/metadataDesigner/controller/provider/resultTree/ResultTreeDataProviderOptionsProvider");

var ResultTreeViewModelOptionsProvider = require("../../../component/designer/metadataDesigner/controller/provider/resultTree/ResultTreeViewModelOptionsProvider");

var resultTreeSearchKeywordProvider = require("../../../component/designer/metadataDesigner/controller/provider/resultTree/resultTreeSearchKeywordProvider");

var resultTreeSelectionProvider = require("../../../component/designer/metadataDesigner/controller/provider/resultTree/resultTreeSelectionProvider");

var DataSourceMetadataTreeController = require("../../../component/designer/metadataDesigner/controller/DataSourceMetadataTreeController");

var metadataDesignerDispatcherActionNameProvider = require("../../../component/designer/metadataDesigner/provider/metadataDesignerDispatcherActionNameProvider");

var AddFetchedResourcesToSchemaStrategy = require("../../../component/designer/metadataDesigner/strategy/AddFetchedResourcesToSchemaStrategy");

var MetadataDesignerResourcesParentIdProvider = require("../../../component/designer/metadataDesigner/provider/MetadataDesignerResourcesParentIdProvider");

var currentResourceInfoFactory = require("../../../component/designer/metadataDesigner/factory/currentResourceInfoFactory");

var emptyProfileAttributeValuesToPlaceholderLabelConverter = require("../../../common/converter/emptyProfileAttributeValuesToPlaceholderLabelConverter");

var metadataDesignerSourceTreeSelectionByResourcesProvider = require("../../../component/designer/metadataDesigner/provider/metadataDesignerSourceTreeSelectionByResourcesProvider");

var MetadataDesignerRemoveSelectedResourcesStrategy = require("../../../component/designer/metadataDesigner/strategy/MetadataDesignerRemoveSelectedResourcesStrategy");

var MetadataDesignerRemoveDefaultSchemaChildrenAndSelectedResourcesStrategy = require("../../../component/designer/metadataDesigner/strategy/MetadataDesignerRemoveDefaultSchemaChildrenAndSelectedResourcesStrategy");

var availableSchemasTreeItemsTemplate = require("text!../../../component/designer/metadataDesigner/template/availableSchemasTreeItemsTemplate.htm");

var selectedSchemasTreeItemsTemplate = require("text!../../../component/designer/metadataDesigner/template/selectedSchemasTreeItemsTemplate.htm");

var SearchStore = require("../../../common/component/search/store/SearchStore");

var searchVueWrapperConfigFactory = require("../../../common/component/search/factory/searchVueWrapperConfigFactory");

var searchVueConfigFactory = require("../../../common/component/search/factory/searchVueConfigFactory");

var eventBusFactory = require("../../../../util/eventBusFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createSchemaAttributeInputView(context, options) {
  var metadataDesignerSchemaAttributeVueConfig = schemaAttributeInputVueConfigFactory.create({
    metadataDesignerEventBus: context.get('metadataDesignerEventBus')
  });
  var metadataDesignerSchemaAttributeVueConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: metadataDesignerSchemaAttributeVueConfig,
    dataNames: automationDataNameAttributesEnum.metadataDesigner.schemaAttribute
  });
  context.register('schemaAttributeInputVueConfig', metadataDesignerSchemaAttributeVueConfigWithDataNameAttribute);
}

function createMetadataDesignerControllers(context, options) {
  context.register('schemasNameGenerator', new ResourceIdentifierGenerator({
    sequenceGenerator: new SequenceGenerator()
  }));
  var dataSourceMetadataToDTOConverter = new DataSourceMetadataToDTOConverter({
    schemasNameGenerator: context.get('schemasNameGenerator'),
    tableReferenceNameGenerator: new ResourceIdentifierGenerator({
      sequenceGenerator: new SequenceGenerator()
    }),
    fieldsNameGenerator: new ResourceIdentifierGenerator({
      sequenceGenerator: new SequenceGenerator()
    }),
    clientDomainSchemaService: context.get('clientDomainSchemaService')
  });
  context.register('metadataFetchStrategy', new MetadataFetchStrategy({
    metadataService: context.get('metadataServiceWrappedWithLoader')
  }));
  context.register('metadataResourceInfoController', new MetadataResourceInfoController({
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    clientDomainSchemaMetadataService: context.get('clientDomainSchemaMetadataService'),
    metadataDesignerViewStateModelService: context.get('metadataDesignerViewStateModelService'),
    metadataDesignerVueStore: context.get('metadataDesignerVueStore'),
    currentResourceInfoFactory: currentResourceInfoFactory,
    storeChangeEventBus: context.get('storeChangeEventBus'),
    clientDataSourceGroupService: context.get('clientDataSourceGroupService'),
    metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider: context.get('metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider')
  }));
  context.register('metadataDesignerSidebarSearchController', new SearchComponentController({
    eventBus: context.get('metadataDesignerSidebarSearchEventBus'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    store: context.get('metadataDesignerSidebarSearchStore'),
    searchKeywordProvider: context.get('metadataDesignerSidebarSearchKeywordProvider'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    dispatcherEventName: applicationStateEventsEnum.METADATA_DESIGNER_SET_SIDEBAR_SEARCH_KEYWORD,
    onChangeStateSearchStrategy: context.get('onChangeStateSidebarSearchStrategy')
  }));
  context.register('metadataDesignerSidebarTreeSelectionProvider', new SidebarTreeSingleSelectionProvider({
    clientViewStateModelService: context.get('metadataDesignerViewStateModelService')
  }));
  context.register('metadataDesignerSidebarTreeController', new SidebarTreeController({
    selectionProvider: context.get('metadataDesignerSidebarTreeSelectionProvider'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    tree: context.get('metadataDesignerSidebarTree'),
    treeDataProvider: context.get('metadataDesignerSidebarTreeDataProvider'),
    model: context.get('metadataDesignerSidebarStore'),
    fetchTreeEventsBlacklist: metadataDesignerFetchTreeEventsBlacklistEnum
  }));
  context.register('schemaAttributeInputValidator', new SchemaAttributeInputValidator({
    domainSchemaSpecification: context.get('domainSchemaSpecification'),
    metadataService: context.get('metadataServiceWrappedWithLoader'),
    profileAttributesService: context.get('profileAttributesServiceWithEncrytedAttributeErrorHandling'),
    clientResourcePropertiesService: context.get('clientResourcePropertiesService'),
    metadataDesignerErrorByXhrFactory: metadataDesignerErrorByXhrFactory
  }));
  context.register('schemaAttributeInputController', new SchemaAttributeInputController({
    storeChangeEventBus: context.get('storeChangeEventBus'),
    metadataDesignerEventBus: context.get('metadataDesignerEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    metadataDesignerVueStore: context.get('metadataDesignerVueStore'),
    schemaAttributeInputValidator: context.get('schemaAttributeInputValidator'),
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    schemasNameGenerator: context.get('schemasNameGenerator'),
    metadataDesignerViewStateModelService: context.get('metadataDesignerViewStateModelService')
  }));
  context.register('sourceTreeViewModelOptionsProvider', new SourceTreeViewModelOptionsProvider({
    metadataDesignerViewStateModelService: context.get('metadataDesignerViewStateModelService'),
    clientDomainSchemaMetadataService: context.get('clientDomainSchemaMetadataService'),
    clientResourcePropertiesService: context.get('clientResourcePropertiesService')
  }));
  context.register('sourceTreeStateSelectionProvider', new SourceTreeStateSelectionProvider({
    model: context.get('sourceTreeViewModel')
  }));
  context.register('sourceTreeDataProviderOptionsProvider', new SourceTreeDataProviderOptionsProvider({
    model: context.get('sourceTreeViewModel'),
    treeSelectionProvider: context.get('sourceTreeStateSelectionProvider'),
    metadataDesignerViewStateModelService: context.get('metadataDesignerViewStateModelService')
  }));
  context.register('sourceTreeController', new DataSourceMetadataTreeController({
    model: context.get('sourceTreeViewModel'),
    treeView: context.get('sourceMetadataDesignerTree'),
    treeDataProvider: context.get('sourceTreeDataProvider'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    selectionEvent: applicationStateEventsEnum.METADATA_DESIGNER_SET_SOURCE_TREE_SELECTION,
    viewModelOptionsProvider: context.get('sourceTreeViewModelOptionsProvider'),
    treeDataProviderOptionsProvider: context.get('sourceTreeDataProviderOptionsProvider'),
    treeSearchKeywordProvider: sourceTreeSearchKeywordProvider,
    treeSelectionProvider: context.get('sourceTreeStateSelectionProvider')
  }));
  context.register('resultTreeViewModelOptionsProvider', new ResultTreeViewModelOptionsProvider({}));
  context.register('resultTreeDataProviderOptionsProvider', new ResultTreeDataProviderOptionsProvider({
    model: context.get('resultTreeViewModel'),
    treeSelectionProvider: resultTreeSelectionProvider
  }));
  context.register('resultTreeController', new DataSourceMetadataTreeController({
    model: context.get('resultTreeViewModel'),
    treeView: context.get('resultMetadataDesignerTree'),
    treeDataProvider: context.get('resultTreeDataProvider'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    selectionEvent: applicationStateEventsEnum.METADATA_DESIGNER_SET_RESULT_TREE_SELECTION,
    viewModelOptionsProvider: context.get('resultTreeViewModelOptionsProvider'),
    treeDataProviderOptionsProvider: context.get('resultTreeDataProviderOptionsProvider'),
    treeSearchKeywordProvider: resultTreeSearchKeywordProvider,
    treeSelectionProvider: resultTreeSelectionProvider
  }));
  context.register('metadataDesignerResourcesParentIdProvider', new MetadataDesignerResourcesParentIdProvider({
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    metadataDesignerViewStateModelService: context.get('metadataDesignerViewStateModelService'),
    schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec: context.get('schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec')
  }));
  context.register('addFetchedResourcesToSchemaStrategy', new AddFetchedResourcesToSchemaStrategy({
    metadataToDTOConverter: dataSourceMetadataToDTOConverter,
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    metadataDesignerDispatcherActionNameProvider: metadataDesignerDispatcherActionNameProvider
  }));
  context.register('metadataDesignerRemoveSelectedResourcesStrategy', new MetadataDesignerRemoveSelectedResourcesStrategy({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    sourceTreeSelectionProvider: metadataDesignerSourceTreeSelectionByResourcesProvider,
    metadataDesignerDispatcherActionNameProvider: metadataDesignerDispatcherActionNameProvider,
    resourcesParentIdProvider: context.get('metadataDesignerResourcesParentIdProvider')
  }));
  context.register('metadataDesignerRemoveDefaultSchemaChildrenAndSelectedResourcesStrategy', new MetadataDesignerRemoveDefaultSchemaChildrenAndSelectedResourcesStrategy({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    sourceTreeSelectionProvider: metadataDesignerSourceTreeSelectionByResourcesProvider,
    resourcesParentIdProvider: context.get('metadataDesignerResourcesParentIdProvider')
  }));
  context.register('addResourcesWarningDialogStore', new WarningDialogWithCategoriesStore({
    confirmLabel: i18n2['button.ok'],
    confirmEvent: 'warningDialog:addResources',
    rejectLabel: i18n2['button.cancel'],
    rejectEvent: 'warningDialog:cancelResourcesAdd'
  }));
  context.register('addResourcesWarningDialog', warningDialogWithCategoriesFactory.create({
    store: context.get('addResourcesWarningDialogStore'),
    eventBus: context.get('metadataDesignerEventBus'),
    dataAttribute: automationDataNameAttributesEnum.metadataDesigner.missingOrChildlessObjectsConfirmationDialog
  }));
  context.register('treeActionsErrorsController', new TreeActionsErrorsController({
    metadataDesignerEventBus: context.get('metadataDesignerEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    addFetchedResourcesToSchemaStrategy: context.get('addFetchedResourcesToSchemaStrategy'),
    treeActionsErrorMessageFactory: treeActionsErrorMessageFactory,
    confirmationDialog: context.get('addResourcesWarningDialog'),
    confirmationDialogStore: context.get('addResourcesWarningDialogStore'),
    metadataDesignerErrorByXhrFactory: metadataDesignerErrorByXhrFactory
  }));
  context.register('metadataDesignerController', new MetadataDesignerController({
    metadataDesignerEventBus: context.get('metadataDesignerEventBus'),
    metadataDesignerVueStore: context.get('metadataDesignerVueStore'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    metadataDesignerViewStateModelService: context.get('metadataDesignerViewStateModelService')
  }));
  context.register('swapButtonsController', new SwapButtonsController({
    swapButtonsStore: context.get('swapButtonsStore'),
    storeChangeEventBus: context.get('storeChangeEventBus')
  }));
  context.register('treeActionsController', new TreeActionsController({
    sourceTree: context.get('sourceMetadataDesignerTree'),
    resultTree: context.get('resultMetadataDesignerTree'),
    sourceTreeDataProvider: context.get('sourceTreeDataProvider'),
    resultTreeDataProvider: context.get('resultTreeDataProvider'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    clientResourcePropertiesService: context.get('clientResourcePropertiesService'),
    metadataDesignerEventBus: context.get('metadataDesignerEventBus'),
    metadataDesignerResourcesParentIdProvider: context.get('metadataDesignerResourcesParentIdProvider'),
    clientDomainSchemaMetadataService: context.get('clientDomainSchemaMetadataService'),
    metadataDesignerViewStateModelService: context.get('metadataDesignerViewStateModelService'),
    metadataFetchStrategy: context.get('metadataFetchStrategy'),
    addFetchedResourcesToSchemaStrategy: context.get('addFetchedResourcesToSchemaStrategy'),
    metadataDesignerRemoveSelectedResourcesStrategy: context.get('metadataDesignerRemoveSelectedResourcesStrategy'),
    metadataDesignerRemoveDefaultSchemaChildrenAndSelectedResourcesStrategy: context.get('metadataDesignerRemoveDefaultSchemaChildrenAndSelectedResourcesStrategy')
  }));
  context.register('availableResourcesSearchController', new SearchComponentController({
    searchKeywordProvider: new TreeSearchKeywordProvider({
      treeName: 'sourceTree'
    }),
    dispatcherEventName: applicationStateEventsEnum.METADATA_DESIGNER_SET_SOURCE_TREE_SEARCH_KEYWORD,
    eventBus: context.get('availableResourcesSearchEventBus'),
    store: context.get('availableResourcesSearchStore'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    onChangeStateSearchStrategy: context.get('onChangeStateSearchStrategy')
  }));
  context.register('selectedResourcesSearchController', new SearchComponentController({
    searchKeywordProvider: new TreeSearchKeywordProvider({
      treeName: 'resultTree'
    }),
    dispatcherEventName: applicationStateEventsEnum.METADATA_DESIGNER_SET_RESULT_TREE_SEARCH_KEYWORD,
    eventBus: context.get('selectedResourcesSearchEventBus'),
    store: context.get('selectedResourcesSearchStore'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    onChangeStateSearchStrategy: context.get('onChangeStateSearchStrategy')
  }));
  context.register('metadataDesignerViewController', new BaseDesignerViewController({
    storeChangeEventBus: context.get('storeChangeEventBus'),
    model: context.get('metadataDesignerVueStore')
  }));
  context.register('metadataDesignerSidebarTreeExpandCollapsePlugin', new SidebarTreeExpandCollapsePlugin({
    eventBus: context.get('applicationDispatcherEventBus'),
    expandedNodesProvider: context.get('viewStateModelQueryService'),
    searchKeywordProvider: context.get('metadataDesignerSidebarSearchKeywordProvider'),
    el: context.get('metadataDesignerSidebar').$el,
    expandNodeEvent: applicationStateEventsEnum.EXPAND_SIDEBAR_NODE,
    collapseNodeEvent: applicationStateEventsEnum.COLLAPSE_SIDEBAR_NODE
  }));
  context.register('metadataDesignerSidebarTreeSelectionPlugin', new MetadataDesignerSidebarTreeSelectionPlugin({
    metadataDesignerEventBus: context.get('metadataDesignerEventBus'),
    sidebarTreeModel: context.get('metadataDesignerSidebarNestedTreeModel'),
    el: context.get('metadataDesignerSidebar').$el
  }));
  context.register('metadataDesignerSidebarSelectionController', new MetadataDesignerSidebarSelectionController({
    metadataDesignerEventBus: context.get('metadataDesignerEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    canSelectItem: metadataDesignerSidebarCanSelectItem
  }));
}

function createMetadataDesignerDataProviders(context, options) {
  var resourceToResultTreeItemConverter = new ResourceToResultTreeItemConverter({
    clientDataSourceGroupService: context.get('clientDataSourceGroupService'),
    treeViewNodeFactory: new TreeViewNodeFactory({
      cssClass: metadataDesignerCssClassesEnum.TREE_RESULT_ITEM,
      node: false
    })
  });
  var resourceToSourceTreeItemConverter = new ResourceToSourceTreeItemConverter({
    treeViewNodeFactory: new TreeViewNodeFactory({
      cssClass: metadataDesignerCssClassesEnum.TREE_SOURCE_ITEM,
      node: false
    })
  });
  var resultTreeMatchSearchCriteria = new MatchSearchCriteria(),
      resultTreeItemProcessor = new CompositeProcessor([resourceTypeProcessor]).process;
  context.register('resultTreeDataProvider', new MetadataDesignerTreeDataProvider({
    dataProvider: new ResultTreeDataProvider({
      sort: byLabelSorter,
      process: resultTreeItemProcessor,
      match: new CompositePredicate([resultTreeMatchSearchCriteria.match, showDefaultSchemaPredicate]).match,
      convertToTreeItem: resourceToResultTreeItemConverter.convert,
      schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec: context.get('schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec'),
      emptyProfileAttributeValuesToPlaceholderLabelConverter: emptyProfileAttributeValuesToPlaceholderLabelConverter
    }),
    selectedResourcesProvider: new ResultTreeSelectionProvider({
      process: resultTreeItemProcessor,
      schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec: context.get('schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec')
    }),
    searchKeywordHolder: resultTreeMatchSearchCriteria
  }));
  var sourceTreeMatchSearchCriteria = new MatchSearchCriteria(),
      isResourceAbsentInModelPredicate = new IsResourceAbsentInModelPredicate({
    schemaResourcesNamesAreEqualSpecification: context.get('schemaResourcesNamesAreEqualSpecification'),
    schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec: context.get('schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec')
  });
  context.register('sourceTreeDataProvider', new MetadataDesignerTreeDataProvider({
    dataProvider: new SourceTreeDataProvider({
      metadataService: context.get('metadataServiceWrappedWithNotification'),
      convertToTreeItem: resourceToSourceTreeItemConverter.convert,
      match: new CompositePredicate([sourceTreeMatchSearchCriteria.match, isResourceAbsentInModelPredicate.match]).match,
      sorter: byLabelSorter
    }),
    selectedResourcesProvider: new SourceTreeSelectionProvider({
      metadataService: context.get('metadataServiceWrappedWithNotification')
    }),
    searchKeywordHolder: sourceTreeMatchSearchCriteria
  }));
}

function createMetadataDesignerViews(context, options) {
  context.register('metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider', new MetadataDesignerCurrentDataSourceTypeBySidebarResourceProvider({
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    metadataDesignerViewStateModelService: context.get('metadataDesignerViewStateModelService')
  }));
  var metadataDesignerMetadataResourcesTooltipOptionsFactory = new MetadataDesignerMetadataResourcesTooltipOptionsFactory({
    metadataDesignerViewStateModelService: context.get('metadataDesignerViewStateModelService'),
    metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider: context.get('metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider')
  });
  var sourceMetadataDesignerTreeOptions = metadataDesignerInternalTreeOptionsFactory.getTreeOptions({
    listItemHeight: options.list.listItemHeight,
    getData: context.get('sourceTreeDataProvider').getData,
    template: availableSchemasTreeItemsTemplate,
    metadataDesignerMetadataResourcesTooltipOptionsFactory: metadataDesignerMetadataResourcesTooltipOptionsFactory
  });
  context.register('sourceMetadataDesignerTree', new MetadataDesignerTree({
    debounceTime: options.loader.dialog.loadingDelay + options.loader.embedded.loadingMinDuration,
    tree: metadataDesignerTreeFactory.create(sourceMetadataDesignerTreeOptions)
  }));
  var metadataDesignerSourceMetadataResourcesListConfig = resourcesListVueConfigFactory.create({
    tree: context.get('sourceMetadataDesignerTree'),
    mixins: [droppableResourcesListMixinFactory.create({
      accept: '.' + metadataDesignerCssClassesEnum.TREE_RESULT_ITEM
    }), draggableResourcesListMixinFactory.create({
      tree: context.get('sourceMetadataDesignerTree')
    }), rerenderResourcesListOnItemClickMixinFactory.create({
      tree: context.get('sourceMetadataDesignerTree')
    })]
  });
  var metadataDesignerSourceMetadataResourcesListConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: metadataDesignerSourceMetadataResourcesListConfig,
    dataNames: automationDataNameAttributesEnum.metadataDesigner.resourcesListSourceMetadata
  });
  var SourceMetadataDesignerList = Vue.extend(metadataDesignerSourceMetadataResourcesListConfigWithDataNameAttribute);
  var resultMetadataDesignerTreeOptions = metadataDesignerInternalTreeOptionsFactory.getTreeOptions({
    listItemHeight: options.list.listItemHeight,
    getData: context.get('resultTreeDataProvider').getData,
    template: selectedSchemasTreeItemsTemplate,
    metadataDesignerMetadataResourcesTooltipOptionsFactory: metadataDesignerMetadataResourcesTooltipOptionsFactory
  });
  context.register('resultMetadataDesignerTree', new MetadataDesignerTree({
    debounceTime: options.loader.dialog.loadingDelay + options.loader.embedded.loadingMinDuration,
    tree: metadataDesignerTreeFactory.create(resultMetadataDesignerTreeOptions)
  }));
  var resultResourcesListDroppableMixin = droppableResourcesListMixinFactory.create({
    accept: '.' + metadataDesignerCssClassesEnum.TREE_SOURCE_ITEM
  });
  var metadataDesignerResultMetadataResourcesListConfig = resourcesListVueConfigFactory.create({
    tree: context.get('resultMetadataDesignerTree'),
    mixins: [resultResourcesListDroppableMixin, draggableResourcesListMixinFactory.create({
      tree: context.get('resultMetadataDesignerTree')
    })]
  });
  var metadataDesignerResultMetadataResourcesListConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: metadataDesignerResultMetadataResourcesListConfig,
    dataNames: automationDataNameAttributesEnum.metadataDesigner.resourcesListResultMetadata
  });
  var ResultMetadataDesignerList = Vue.extend(metadataDesignerResultMetadataResourcesListConfigWithDataNameAttribute);
  var metadataDesignerResourcesListInstructionsConfig = resourcesListInstructionsVueConfigFactory.create({
    mixins: [resultResourcesListDroppableMixin]
  });
  var metadataDesignerResourcesListInstructionsConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: metadataDesignerResourcesListInstructionsConfig,
    dataNames: automationDataNameAttributesEnum.metadataDesigner.resourcesListInstructions
  });
  var ResultListInstructions = Vue.extend(metadataDesignerResourcesListInstructionsConfigWithDataNameAttribute);
  context.register('availableResourcesSearchStore', new SearchStore({
    isVisible: true
  }));
  context.register('availableResourcesSearchEventBus', eventBusFactory.create());
  var AvailableResourcesSearch = Vue.extend(addAutomationDataNameAttributeMixinFactory.create({
    config: searchVueConfigFactory.create({
      eventBus: context.get('availableResourcesSearchEventBus')
    }),
    dataNames: automationDataNameAttributesEnum.metadataDesigner.sourceTreeSearch
  }));
  context.register('availableResourcesSearch', Vue.extend(searchVueWrapperConfigFactory.create({
    search: AvailableResourcesSearch,
    data: context.get('availableResourcesSearchStore').attributes
  })));
  context.register('selectedResourcesSearchStore', new SearchStore({
    isVisible: true
  }));
  context.register('selectedResourcesSearchEventBus', eventBusFactory.create());
  var SelectedResourcesSearch = Vue.extend(addAutomationDataNameAttributeMixinFactory.create({
    config: searchVueConfigFactory.create({
      eventBus: context.get('selectedResourcesSearchEventBus')
    }),
    dataNames: automationDataNameAttributesEnum.metadataDesigner.resultTreeSearch
  }));
  context.register('selectedResourcesSearch', Vue.extend(searchVueWrapperConfigFactory.create({
    search: SelectedResourcesSearch,
    data: context.get('selectedResourcesSearchStore').attributes
  })));
  var swapButtonsVueConfig = swapButtonsVueConfigFactory.create({
    data: context.get('swapButtonsStore').attributes,
    throttleTime: options.loader.dialog.loadingDelay,
    storeChangeEventBus: context.get('storeChangeEventBus'),
    metadataDesignerEventBus: context.get('metadataDesignerEventBus')
  });
  var swapButtonsVueConfigFactoryWithAutomationAttributes = addAutomationDataNameAttributeMixinFactory.create({
    config: swapButtonsVueConfig,
    dataNames: automationDataNameAttributesEnum.metadataDesigner.swapButtons
  });
  context.register('swapButtons', Vue.extend(swapButtonsVueConfigFactoryWithAutomationAttributes));
  context.register('schemaAttributeInput', Vue.extend(context.get('schemaAttributeInputVueConfig')));
  context.register('metadataDesignerVueConfig', metadataDesignerVueConfigFactory.create({
    metadataDesignerEventBus: context.get('metadataDesignerEventBus'),
    data: context.get('metadataDesignerVueStore').attributes,
    sourceList: SourceMetadataDesignerList,
    resultList: ResultMetadataDesignerList,
    resultListInstructions: ResultListInstructions,
    schemaAttribute: context.get('schemaAttributeInput'),
    availableResourcesSearch: context.get('availableResourcesSearch'),
    selectedResourcesSearch: context.get('selectedResourcesSearch'),
    swapButtons: context.get('swapButtons')
  }));
}

function createMetadataDesigner(context, options) {
  createSchemaAttributeInputView(context, options);
  createMetadataDesignerDataProviders(context, options);
  createMetadataDesignerViews(context, options);
  createMetadataDesignerControllers(context, options);
}

module.exports = createMetadataDesigner;

});