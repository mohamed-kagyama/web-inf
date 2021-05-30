define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Vue = require('vue');

var uriUtil = require("../../../util/uriUtil");

var renameDialogFactory = require("../../../component/dialog/rename/factory/renameDialogFactory");

var renameTableReferenceDialogStoreFactory = require("../../../component/designer/joinsDesigner/dialog/store/renameTableReferenceDialogStoreFactory");

var ActionButton = require("../../../common/component/actionButton/ActionButton");

var InputErrorMessageWithVisibility = require("../../../common/component/inputErrorMessage/InputErrorMessageWithVisibility");

var compositeAndValidationRuleFactory = require("../../../common/factory/compositeAndValidationRuleFactory");

var applicationStateEventsEnum = require("../../../dispatcher/enum/applicationStateEventsEnum");

var joinsDesignerFetchTreeEventsBlacklistEnum = require("../../../component/designer/joinsDesigner/sidebar/enum/joinsDesignerFetchTreeEventsBlacklistEnum");

var searchVueWrapperConfigFactory = require("../../../common/component/search/factory/searchVueWrapperConfigFactory");

var searchVueConfigFactory = require("../../../common/component/search/factory/searchVueConfigFactory");

var SidebarTreeController = require("../../../component/layout/sidebarView/controller/SidebarTreeController");

var SidebarTreeExpandCollapsePlugin = require("../../../component/layout/sidebarView/tree/plugin/SidebarTreeExpandCollapsePlugin");

var JoinsDesignerSidebarTreeSelectionPlugin = require("../../../component/designer/joinsDesigner/controller/plugin/JoinsDesignerSidebarTreeSelectionPlugin");

var JoinsDesignerSidebarTreeDraggablePlugin = require("../../../component/designer/joinsDesigner/controller/plugin/JoinsDesignerSidebarTreeDraggablePlugin");

var JoinsDesignerSidebarIsItemDraggableSpecification = require("../../../component/designer/joinsDesigner/controller/specification/JoinsDesignerSidebarIsItemDraggableSpecification");

var JoinsDesignerSidebarActionsController = require("../../../component/designer/joinsDesigner/controller/JoinsDesignerSidebarActionsController");

var RenameTableReferenceController = require("../../../component/designer/joinsDesigner/controller/RenameTableReferenceController");

var JoinsDesignerSidebarSelectionController = require("../../../component/designer/joinsDesigner/controller/JoinsDesignerSidebarSelectionController");

var SidebarTreeSingleSelectionProvider = require("../../../component/layout/sidebarView/util/SidebarTreeSingleSelectionProvider");

var SidebarLayoutVueComponent = require("../../../component/layout/sidebarView/component/sidebarLayout/SidebarLayoutVueComponent");

var sidebarLayoutVueTemplate = require("text!../../../component/layout/sidebarView/component/sidebarLayout/template/sidebarLayoutVueTemplate.htm");

var TreeListDataProvider = require("../../../component/layout/sidebarView/tree/TreeListDataProvider");

var SearchComponentController = require("../../../common/component/search/controller/SearchComponentController");

var menuOptionsProviderFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuOptionsProviderFactory");

var alwaysIncludeTableMenuEventHandlerFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuEventHandlerFactory/alwaysIncludeTableMenuEventHandlerFactory");

var generateJoinsMenuEventHandlerFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuEventHandlerFactory/generateJoinsMenuEventHandlerFactory");

var renameTableReferenceMenuEventHandlerFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuEventHandlerFactory/renameTableReferenceMenuEventHandlerFactory");

var showContextMenuEventHandlerFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuEventHandlerFactory/showContextMenuEventHandlerFactory");

var alwaysIncludeTableMenuOptionFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuOptionFactory/alwaysIncludeTableMenuOptionFactory");

var joinsDesignerSidebarLayoutTemplate = require("text!../../../component/designer/joinsDesigner/sidebar/view/template/joinsDesignerSidebarLayoutTemplate.htm");

var joinsDesignerSidebarWithResizerLayoutTemplate = require("text!../../../component/designer/joinsDesigner/sidebar/view/template/joinsDesignerSidebarWithResizerLayoutTemplate.htm");

var joinsDesignerSidebarTreeItemResourceProcessor = require("../../../component/designer/joinsDesigner/converter/sidebar/processor/joinsDesignerSidebarTreeItemResourceProcessor");

var resourcesTreeItemIdProcessor = require("../../../component/layout/sidebarView/converter/processor/resourcesTreeItemIdProcessor");

var TreeItemSelectionProcessor = require("../../../component/layout/sidebarView/converter/processor/TreeItemSelectionProcessor");

var treeItemCalcFieldParentIdProcessor = require("../../../component/layout/sidebarView/converter/processor/treeItemCalcFieldParentIdProcessor");

var treeItemValueProcessor = require("../../../component/layout/sidebarView/converter/processor/treeItemValueProcessor");

var TreeItemExpandedProcessor = require("../../../component/layout/sidebarView/converter/processor/TreeItemExpandedProcessor");

var treeItemIsEmptyDataSourceProcessor = require("../../../component/layout/sidebarView/converter/processor/treeItemIsEmptyDataSourceProcessor");

var AutoIdGenerationStrategyBasedOnEntityId = require("../../../util/AutoIdGenerationStrategyBasedOnEntityId");

var NestedTreeModel = require("../../../../util/nestedTreeModel/NestedTreeModel");

var CompositeConcatenatingConverter = require("../../../component/layout/sidebarView/converter/CompositeConcatenatingConverter");

var ConstantGroupTreeConverter = require("../../../component/layout/sidebarView/converter/ConstantGroupTreeConverter");

var SchemaToDesignerTreeConverter = require("../../../component/layout/sidebarView/converter/SchemaToDesignerTreeConverter");

var DataSourceTreeConverter = require("../../../component/layout/sidebarView/converter/DataSourceTreeConverter");

var JoinTreesTreeConverter = require("../../../component/layout/sidebarView/converter/JoinTreesTreeConverter");

var CompositeResourceConverter = require("../../../component/layout/sidebarView/converter/CompositeResourceConverter");

var MatchBySearchKeyword = require("../../../component/layout/sidebarView/predicate/MatchBySearchKeyword");

var getDefaultResourceSearchPropertyProvider = require("../../../component/layout/sidebarView/provider/getDefaultResourceSearchPropertyProvider");

var doNotAcceptTableReferencesUsedInJoins = require("../../../component/designer/joinsDesigner/predicate/doNotAcceptTableReferencesUsedInJoins");

var doNotAcceptEmptyElementsIfResourceDoNotMatch = require("../../../component/layout/sidebarView/predicate/doNotAcceptEmptyElementsIfResourceDoNotMatch");

var DoNotSkipChildrenConversion = require("../../../component/layout/sidebarView/predicate/DoNotSkipChildrenConversion");

var joinsDesignerSidebarTreeOptionsFactory = require("../../../component/designer/joinsDesigner/sidebar/factory/joinsDesignerSidebarTreeOptionsFactory");

var SidebarSearchKeywordProvider = require("../../../component/layout/sidebarView/tree/SidebarSearchKeywordProvider");

var joinsDesignerSidebarCanSelectItem = require("../../../component/designer/joinsDesigner/util/joinsDesignerSidebarCanSelectItem");

var JoinsDesignerSidebarTreeContextMenuVisibilitySpecification = require("../../../component/designer/joinsDesigner/sidebar/specification/JoinsDesignerSidebarTreeContextMenuVisibilitySpecification");

var CompositePredicate = require("../../../../util/predicate/CompositePredicate");

var CanDeleteResourceConverter = require("../../../component/designer/joinsDesigner/converter/sidebar/CanDeleteResourceConverter");

var addParentTableReferenceIdConverter = require("../../../component/designer/joinsDesigner/converter/sidebar/addParentTableReferenceIdConverter");

var addParentJoinTreeIdConverter = require("../../../component/designer/joinsDesigner/converter/sidebar/addParentJoinTreeIdConverter");

var JoinsDesignerSidebarResizableTreePanelView = require("../../../component/designer/joinsDesigner/sidebar/view/JoinsDesignerSidebarResizableTreePanelView");

var SearchStore = require("../../../common/component/search/store/SearchStore");

var JoinsDesignerSidebarSingleSelectStrategy = require("../../../component/designer/joinsDesigner/strategy/JoinsDesignerSidebarSingleSelectStrategy");

var baseRenameDialogIsEmptyValidationRule = require("../../../component/designer/joinsDesigner/model/validation/baseRenameDialogIsEmptyValidationRule");

var isTableReferenceAlreadyExistsValidationRuleFactory = require("../../../component/designer/joinsDesigner/model/validation/isTableReferenceAlreadyExistsValidationRuleFactory");

var isTableReferenceNameContainsForbiddenCharactersValidationRuleFactory = require("../../../component/designer/joinsDesigner/model/validation/isTableReferenceNameContainsForbiddenCharactersValidationRuleFactory");

var emptyProfileAttributeValuesToPlaceholderLabelConverter = require("../../../common/converter/emptyProfileAttributeValuesToPlaceholderLabelConverter");

var automationDataNameAttributesEnum = require("../../../common/enum/automationDataNameAttributesEnum");

var addAutomationDataNameAttributeMixinFactory = require("../../../common/factory/addAutomationDataNameAttributeMixinFactory");

var eventBusFactory = require("../../../../util/eventBusFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createJoinsDesignerCommonTreeDataProviderComponents(context, options) {
  context.register('joinsDesignerSidebarSearchKeywordProvider', new SidebarSearchKeywordProvider({
    service: context.get('joinsDesignerViewStateModelService')
  }));
  context.register('joinsDesignerMatchBySearchKeyword', new MatchBySearchKeyword({
    getSearchProperty: getDefaultResourceSearchPropertyProvider,
    searchKeywordProvider: context.get('joinsDesignerSidebarSearchKeywordProvider')
  }));
  var canDeleteResourceConverter = new CanDeleteResourceConverter({
    domainSchemaSpecification: context.get('domainSchemaSpecification')
  });
  context.register('joinsDesignerSidebarInitialTreeItemConverter', new CompositeResourceConverter([context.get('baseTreeResourceConverter'), resourcesTreeItemIdProcessor, treeItemCalcFieldParentIdProcessor]).convert);
  context.register('joinsDesignerSidebarCommonDataSourceAndDataIslandTreeItemConverter', new CompositeResourceConverter([addParentTableReferenceIdConverter, canDeleteResourceConverter.process, context.get('treeItemIsDerivedTableProcessor').process]).convert);
  context.register('joinsDesignerDoNotSkipChildrenConversion', new DoNotSkipChildrenConversion({
    isExpanded: context.get('viewStateModelQueryService').isNodeExpanded,
    searchKeywordProvider: context.get('joinsDesignerSidebarSearchKeywordProvider')
  }).match);
  var treeItemSelectionProcessor = new TreeItemSelectionProcessor({
    isItemSelected: context.get('joinsDesignerViewStateModelService').isSidebarItemSelected
  });
  var treeItemExpandedProcessor = new TreeItemExpandedProcessor({
    searchKeywordProvider: context.get('joinsDesignerSidebarSearchKeywordProvider'),
    isExpanded: context.get('viewStateModelQueryService').isNodeExpanded,
    isCollapsed: context.get('viewStateModelQueryService').isNodeCollapsed
  });
  context.register('joinsDesignerFinalTreeItemConverter', new CompositeResourceConverter([treeItemValueProcessor, treeItemExpandedProcessor.process, joinsDesignerSidebarTreeItemResourceProcessor, treeItemIsEmptyDataSourceProcessor, context.get('js-sdk/src/commonSidebarTreeNodeConverter'), context.get('treeItemLabelProcessor').getNameAsLabel, treeItemSelectionProcessor.process]).convert);
}

function createJoinsDesignerResourcesSidebarTreeDataProvider(context, options) {
  var constantGroupToNestedTreeModelConverter = new ConstantGroupTreeConverter({
    resourceMatch: true,
    resourceOrChildrenMatch: context.get('joinsDesignerMatchBySearchKeyword').match,
    resourceJsonMatch: doNotAcceptEmptyElementsIfResourceDoNotMatch,
    convertResourceNoChildren: new CompositeResourceConverter([context.get('joinsDesignerSidebarInitialTreeItemConverter'), context.get('joinsDesignerFinalTreeItemConverter')]),
    convertChildrenMatch: context.get('joinsDesignerDoNotSkipChildrenConversion'),
    convertResource: context.get('constantGroupMapBasedConverter'),
    comparator: context.get('comparatorByLabel')
  });
  var resourcesToNestedTreeModelConverter = new DataSourceTreeConverter({
    resourceMatch: new CompositePredicate([doNotAcceptTableReferencesUsedInJoins]).match,
    resourceOrChildrenMatch: new CompositePredicate([context.get('joinsDesignerMatchBySearchKeyword').match, context.get('showDefaultSchemaInSidebarPredicate')]).match,
    resourceJsonMatch: doNotAcceptEmptyElementsIfResourceDoNotMatch,
    convertResourceNoChildren: new CompositeResourceConverter([context.get('joinsDesignerSidebarInitialTreeItemConverter'), context.get('joinsDesignerSidebarCommonDataSourceAndDataIslandTreeItemConverter'), context.get('joinsDesignerFinalTreeItemConverter')]),
    convertChildrenMatch: context.get('joinsDesignerDoNotSkipChildrenConversion'),
    convertResource: context.get('resourceMapBasedConverter'),
    comparator: context.get('dataSourceComparator'),
    schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec: context.get('schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec'),
    postProcess: emptyProfileAttributeValuesToPlaceholderLabelConverter
  });
  context.register('schemaToJoinsDesignerResourcesTreeConverter', new SchemaToDesignerTreeConverter({
    clientDomainSchemaCalcFieldsService: context.get('clientDomainSchemaCalcFieldsService'),
    converter: new CompositeConcatenatingConverter({
      converters: [constantGroupToNestedTreeModelConverter, resourcesToNestedTreeModelConverter]
    })
  }));
  context.register('joinsDesignerSidebarResourcesTreeNestedTreeModel', new NestedTreeModel([], {
    idGenerationStrategy: new AutoIdGenerationStrategyBasedOnEntityId(),
    pathSeparator: uriUtil.getRootUri(),
    nodeIdAttribute: 'resourceId'
  }));
  context.register('joinsDesignerSidebarResourcesTreeDataProvider', new TreeListDataProvider({
    schemaToNestedTreeModelConverter: context.get('schemaToJoinsDesignerResourcesTreeConverter'),
    nestedTreeModel: context.get('joinsDesignerSidebarResourcesTreeNestedTreeModel')
  }));
}

function createJoinsDesignerJoinTreesSidebarTreeDataProvider(context, options) {
  var joinsToTreeStructureConverter = new JoinTreesTreeConverter({
    resourceMatch: true,
    resourceOrChildrenMatch: context.get('joinsDesignerMatchBySearchKeyword').match,
    resourceJsonMatch: doNotAcceptEmptyElementsIfResourceDoNotMatch,
    convertResourceNoChildren: new CompositeResourceConverter([context.get('joinsDesignerSidebarInitialTreeItemConverter'), context.get('joinsDesignerSidebarCommonDataSourceAndDataIslandTreeItemConverter'), addParentJoinTreeIdConverter, context.get('joinsDesignerFinalTreeItemConverter')]),
    convertChildrenMatch: context.get('joinsDesignerDoNotSkipChildrenConversion'),
    convertResource: context.get('joinTreesMapBasedConverter'),
    comparator: context.get('dataSourceComparator')
  });
  context.register('schemaToJoinsDesignerJoinTreesTreeConverter', new SchemaToDesignerTreeConverter({
    clientDomainSchemaCalcFieldsService: context.get('clientDomainSchemaCalcFieldsService'),
    converter: new CompositeConcatenatingConverter({
      converters: [joinsToTreeStructureConverter]
    })
  }));
  context.register('joinsDesignerSidebarJoinTreesNestedTreeModel', new NestedTreeModel([], {
    idGenerationStrategy: new AutoIdGenerationStrategyBasedOnEntityId(),
    pathSeparator: uriUtil.getRootUri(),
    nodeIdAttribute: 'resourceId'
  }));
  context.register('joinsDesignerSidebarJoinTreesTreeDataProvider', new TreeListDataProvider({
    schemaToNestedTreeModelConverter: context.get('schemaToJoinsDesignerJoinTreesTreeConverter'),
    nestedTreeModel: context.get('joinsDesignerSidebarJoinTreesNestedTreeModel')
  }));
}

function createJoinsDesignerSidebarTreeOptions(dataProvider, context, options, dataName) {
  var sidebarTreeDataProviderPromiseWrapper = context.get('sidebarTreeDataProviderPromiseWrapper');
  return joinsDesignerSidebarTreeOptionsFactory.getTreeOptions({
    sidebarTooltipOptionsFactory: context.get('sidebarTooltipOptionsFactory'),
    listItemHeight: options.list.listItemHeight,
    dataProvider: sidebarTreeDataProviderPromiseWrapper(dataProvider.getData),
    joinsDesignerSidebarContextMenuOptionsProvider: context.get('joinsDesignerSidebarContextMenuOptionsProvider'),
    sidebarTreeTooltipOptionsFactory: context.get('sidebarTooltipOptionsFactory'),
    joinsDesignerSidebarTreeContextMenuVisibilitySpecification: new JoinsDesignerSidebarTreeContextMenuVisibilitySpecification({}),
    joinsDesignerSidebarContextMenuEventHandlers: context.get('joinsDesignerSidebarContextMenuEventHandlers'),
    dataName: dataName
  });
}

function createJoinsDesignerSidebarContextMenuOptions(context, options) {
  var generateJoinsMenuEventHandler = generateJoinsMenuEventHandlerFactory.create({
    eventBus: context.get('joinsDesignerEventBus')
  });
  var alwaysIncludeTableMenuEventHandler = alwaysIncludeTableMenuEventHandlerFactory.create({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    clientDomainSchemaService: context.get('clientDomainSchemaJoinsDesignerService')
  });
  var renameTableReferenceMenuEventHandler = renameTableReferenceMenuEventHandlerFactory.create({
    eventBus: context.get('joinsDesignerEventBus')
  });
  var showContextMenuEventHandler = showContextMenuEventHandlerFactory.create({
    eventBus: context.get('joinsDesignerEventBus')
  });
  context.register('joinsDesignerSidebarContextMenuEventHandlers', _.extend({}, context.get('copyTableReferenceMenuEventHandler'), context.get('copyDerivedTableMenuEventHandler'), generateJoinsMenuEventHandler, context.get('removeTableReferenceMenuEventHandler'), context.get('removeDerivedTableMenuEventHandler'), alwaysIncludeTableMenuEventHandler, renameTableReferenceMenuEventHandler, context.get('editDerivedTableMenuEventHandler'), context.get('createCalcFieldMenuEventHandler'), context.get('editCalcFieldMenuEventHandler'), context.get('removeCalcFieldMenuEventHandler'), showContextMenuEventHandler));
  var alwaysIncludeTableMenuOption = alwaysIncludeTableMenuOptionFactory.create({
    clientDomainSchemaService: context.get('clientDomainSchemaJoinsDesignerService'),
    advancedJoinsMappingSpecification: context.get('advancedJoinsMappingSpecification')
  });
  var provider = menuOptionsProviderFactory.create([context.get('copyTableReferenceMenuOption'), context.get('copyDerivedTableMenuOption'), context.get('renameTableReferenceMenuOption'), context.get('editDerivedTableMenuOption'), context.get('removeTableReferenceMenuOption'), context.get('removeDerivedTableMenuOption'), alwaysIncludeTableMenuOption, context.get('generateJoinsMenuOption'), context.get('createCalcFieldMenuOption'), context.get('createConstantCalcFieldMenuOption'), context.get('editCalcFieldMenuOption'), context.get('removeCalcFieldMenuOption')]);
  context.register('joinsDesignerSidebarContextMenuOptionsProvider', provider);
}

function createJoinsDesignerSidebar(context, options) {
  context.register('joinsDesignerSidebarSearchStore', new SearchStore(context.get('joinsDesignerViewModelOptions')));
  context.register('joinsDesignerSidebarSearchEventBus', eventBusFactory.create());
  var Search = Vue.extend(addAutomationDataNameAttributeMixinFactory.create({
    config: searchVueConfigFactory.create({
      eventBus: context.get('joinsDesignerSidebarSearchEventBus')
    }),
    dataNames: automationDataNameAttributesEnum.joinsDesigner.sidebarSearch
  }));
  context.register('joinsDesignerSidebarSearch', Vue.extend(searchVueWrapperConfigFactory.create({
    search: Search,
    data: context.get('joinsDesignerSidebarSearchStore').attributes
  })));
  var joinsDesignerSidebarResourcesTreeOptions = createJoinsDesignerSidebarTreeOptions(context.get('joinsDesignerSidebarResourcesTreeDataProvider'), context, options, automationDataNameAttributesEnum.joinsDesigner.sidebar.joinsDesignerSidebarResourcesTree);
  var joinsDesignerEmptySidebarResourcesTreeOptions = createJoinsDesignerSidebarTreeOptions(context.get('joinsDesignerSidebarResourcesTreeDataProvider'), context, options, automationDataNameAttributesEnum.joinsDesigner.sidebar.joinsDesignerEmptySidebarResourcesTree);
  var joinsDesignerSidebarJoinTreesTreeOptions = createJoinsDesignerSidebarTreeOptions(context.get('joinsDesignerSidebarJoinTreesTreeDataProvider'), context, options, automationDataNameAttributesEnum.joinsDesigner.sidebar.joinsDesignerSidebarJoinTree);
  context.register('joinsDesignerResourcesTreeForEmptyJoinTrees', context.get('sidebarTreeFactory').create(joinsDesignerEmptySidebarResourcesTreeOptions));
  context.register('joinsDesignerResourcesTreeForNotEmptyJoinTrees', context.get('sidebarTreeFactory').create(joinsDesignerSidebarResourcesTreeOptions));
  context.register('joinsDesignerJoinTreesTree', context.get('sidebarTreeFactory').create(joinsDesignerSidebarJoinTreesTreeOptions));
  context.register('joinsDesignerResourcesForEmptyJoinTreesSidebar', new SidebarLayoutVueComponent({
    data: context.get('joinsDesignerResourcesTreeSidebarStore').attributes,
    tree: context.get('joinsDesignerResourcesTreeForEmptyJoinTrees'),
    template: sidebarLayoutVueTemplate
  }));
  context.register('joinsDesignerResourcesForNotEmptyJoinTreesSidebar', new SidebarLayoutVueComponent({
    data: context.get('joinsDesignerJoinTreesTreeSidebarStore').attributes,
    tree: context.get('joinsDesignerResourcesTreeForNotEmptyJoinTrees'),
    template: joinsDesignerSidebarWithResizerLayoutTemplate,
    treeContainerElement: '.jr-jTree'
  }));
  context.register('joinsDesignerResourcesForNotEmptyJoinTreesResizer', new JoinsDesignerSidebarResizableTreePanelView({
    el: context.get('joinsDesignerResourcesForNotEmptyJoinTreesSidebar').$el,
    footerHeight: options.footerHeight,
    joinTreesSectionMinHeight: options.joinsDesigner.joinTreesSectionMinHeight,
    minHeight: options.sidebar.joinsDesigner.MIN_HEIGHT,
    maxHeight: options.sidebar.joinsDesigner.MAX_HEIGHT
  }));
  context.register('joinsDesignerJoinTreesTreeSidebar', new SidebarLayoutVueComponent({
    data: context.get('joinsDesignerJoinTreesTreeSidebarStore').attributes,
    tree: context.get('joinsDesignerJoinTreesTree'),
    template: joinsDesignerSidebarLayoutTemplate,
    treeContainerElement: '.jr-jTree'
  }));
  var isTableReferenceAlreadyExistsValidationRule = isTableReferenceAlreadyExistsValidationRuleFactory.create({
    domainSchemaSpecification: context.get('domainSchemaSpecification')
  });
  context.register('renameTableReferenceValidator', compositeAndValidationRuleFactory.create([baseRenameDialogIsEmptyValidationRule, isTableReferenceAlreadyExistsValidationRule, isTableReferenceNameContainsForbiddenCharactersValidationRuleFactory.create({
    domainSchemaGranularSpecs: context.get('domainSchemaGranularSpecs')
  })]));
  context.register('renameTableReferenceDialogStore', renameTableReferenceDialogStoreFactory.create());
  context.register('renameTableReferenceDialog', renameDialogFactory.create({
    store: context.get('renameTableReferenceDialogStore'),
    components: {
      actionButton: ActionButton,
      inputErrorMessage: InputErrorMessageWithVisibility
    },
    dataNameAttrs: automationDataNameAttributesEnum.joinsDesigner.renameTableDialog
  }));
}

function createJoinsDesignerSidebarControllers(context, options) {
  context.register('joinsDesignerSidebarSearchViewController', new SearchComponentController({
    store: context.get('joinsDesignerSidebarSearchStore'),
    searchKeywordProvider: context.get('joinsDesignerSidebarSearchKeywordProvider'),
    onChangeStateSearchStrategy: context.get('onChangeStateSidebarSearchStrategy'),
    eventBus: context.get('joinsDesignerSidebarSearchEventBus'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    dispatcherEventName: applicationStateEventsEnum.JOINS_DESIGNER_SET_SIDEBAR_SEARCH_KEYWORD
  }));
  context.register('joinsDesignerSidebarSingleSelectStrategy', new JoinsDesignerSidebarSingleSelectStrategy({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    canSelectItem: joinsDesignerSidebarCanSelectItem
  }));
  context.register('joinsDesignerSidebarActionsController', new JoinsDesignerSidebarActionsController({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    joinsDesignerSidebarSingleSelectStrategy: context.get('joinsDesignerSidebarSingleSelectStrategy')
  }));
  context.register('renameTableReferenceController', new RenameTableReferenceController({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    renameTableReferenceDialog: context.get('renameTableReferenceDialog'),
    renameTableReferenceDialogStore: context.get('renameTableReferenceDialogStore'),
    renameTableReferenceValidator: context.get('renameTableReferenceValidator'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    expressionBulkUpdateService: context.get('expressionBulkUpdateService')
  }));
  context.register('joinsDesignerResourcesForEmptyJoinTreesTreeCollapsePlugin', new SidebarTreeExpandCollapsePlugin({
    expandedNodesProvider: context.get('viewStateModelQueryService'),
    searchKeywordProvider: context.get('joinsDesignerSidebarSearchKeywordProvider'),
    el: context.get('joinsDesignerResourcesForEmptyJoinTreesSidebar').$el,
    eventBus: context.get('applicationDispatcherEventBus'),
    expandNodeEvent: applicationStateEventsEnum.EXPAND_SIDEBAR_NODE,
    collapseNodeEvent: applicationStateEventsEnum.COLLAPSE_SIDEBAR_NODE
  }));
  context.register('joinsDesignerResourcesForNotEmptyJoinTreesTreeCollapsePlugin', new SidebarTreeExpandCollapsePlugin({
    expandedNodesProvider: context.get('viewStateModelQueryService'),
    searchKeywordProvider: context.get('joinsDesignerSidebarSearchKeywordProvider'),
    el: context.get('joinsDesignerResourcesForNotEmptyJoinTreesSidebar').$el,
    eventBus: context.get('applicationDispatcherEventBus'),
    expandNodeEvent: applicationStateEventsEnum.EXPAND_SIDEBAR_NODE,
    collapseNodeEvent: applicationStateEventsEnum.COLLAPSE_SIDEBAR_NODE
  }));
  context.register('joinsDesignerJoinTreesTreeCollapsePlugin', new SidebarTreeExpandCollapsePlugin({
    expandedNodesProvider: context.get('viewStateModelQueryService'),
    searchKeywordProvider: context.get('joinsDesignerSidebarSearchKeywordProvider'),
    el: context.get('joinsDesignerJoinTreesTreeSidebar').$el,
    eventBus: context.get('applicationDispatcherEventBus'),
    expandNodeEvent: applicationStateEventsEnum.EXPAND_SIDEBAR_NODE,
    collapseNodeEvent: applicationStateEventsEnum.COLLAPSE_SIDEBAR_NODE
  }));
  context.register('joinsDesignerResourcesForEmptyJoinTreesSelectionPlugin', new JoinsDesignerSidebarTreeSelectionPlugin({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    el: context.get('joinsDesignerResourcesForEmptyJoinTreesSidebar').$el,
    sidebarTreeModel: context.get('joinsDesignerSidebarResourcesTreeNestedTreeModel')
  }));
  context.register('joinsDesignerResourcesForNotEmptyJoinTreesSelectionPlugin', new JoinsDesignerSidebarTreeSelectionPlugin({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    el: context.get('joinsDesignerResourcesForNotEmptyJoinTreesSidebar').$el,
    sidebarTreeModel: context.get('joinsDesignerSidebarResourcesTreeNestedTreeModel')
  }));
  context.register('joinsDesignerJoinTreesTreeSelectionPlugin', new JoinsDesignerSidebarTreeSelectionPlugin({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    el: context.get('joinsDesignerJoinTreesTreeSidebar').$el,
    sidebarTreeModel: context.get('joinsDesignerSidebarJoinTreesNestedTreeModel')
  }));
  context.register('joinsDesignerSidebarIsItemDraggableSpecification', new JoinsDesignerSidebarIsItemDraggableSpecification({
    clientDomainSchemaCalcFieldsService: context.get('clientDomainSchemaCalcFieldsService')
  }));
  context.register('joinsDesignerResourcesForEmptyJoinTreesDraggablePlugin', new JoinsDesignerSidebarTreeDraggablePlugin({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    el: context.get('joinsDesignerResourcesForEmptyJoinTreesSidebar').$el,
    joinsDesignerSidebarIsItemDraggableSpecification: context.get('joinsDesignerSidebarIsItemDraggableSpecification'),
    sidebarTreeModel: context.get('joinsDesignerSidebarResourcesTreeNestedTreeModel')
  }));
  context.register('joinsDesignerResourcesForNotEmptyJoinTreesDraggablePlugin', new JoinsDesignerSidebarTreeDraggablePlugin({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    el: context.get('joinsDesignerResourcesForNotEmptyJoinTreesSidebar').$el,
    joinsDesignerSidebarIsItemDraggableSpecification: context.get('joinsDesignerSidebarIsItemDraggableSpecification'),
    sidebarTreeModel: context.get('joinsDesignerSidebarResourcesTreeNestedTreeModel')
  }));
  context.register('joinsDesignerJoinTreesTreeDraggablePlugin', new JoinsDesignerSidebarTreeDraggablePlugin({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    el: context.get('joinsDesignerJoinTreesTreeSidebar').$el,
    joinsDesignerSidebarIsItemDraggableSpecification: context.get('joinsDesignerSidebarIsItemDraggableSpecification'),
    sidebarTreeModel: context.get('joinsDesignerSidebarJoinTreesNestedTreeModel')
  }));
  context.register('joinsDesignerSidebarSelectionController', new JoinsDesignerSidebarSelectionController({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    joinsDesignerSidebarSingleSelectStrategy: context.get('joinsDesignerSidebarSingleSelectStrategy')
  }));
  context.register('joinsDesignerSidebarTreeSelectionProvider', new SidebarTreeSingleSelectionProvider({
    clientViewStateModelService: context.get('joinsDesignerViewStateModelService')
  }));
  context.register('joinsDesignerResourcesTreeForEmptyJoinTreesController', new SidebarTreeController({
    selectionProvider: context.get('joinsDesignerSidebarTreeSelectionProvider'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    tree: context.get('joinsDesignerResourcesTreeForEmptyJoinTrees'),
    treeDataProvider: context.get('joinsDesignerSidebarResourcesTreeDataProvider'),
    model: context.get('joinsDesignerResourcesTreeSidebarStore'),
    fetchTreeEventsBlacklist: joinsDesignerFetchTreeEventsBlacklistEnum
  }));
  context.register('joinsDesignerResourcesTreeForNotEmptyJoinTreesController', new SidebarTreeController({
    selectionProvider: context.get('joinsDesignerSidebarTreeSelectionProvider'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    tree: context.get('joinsDesignerResourcesTreeForNotEmptyJoinTrees'),
    treeDataProvider: context.get('joinsDesignerSidebarResourcesTreeDataProvider'),
    model: context.get('joinsDesignerJoinTreesTreeSidebarStore'),
    fetchTreeEventsBlacklist: joinsDesignerFetchTreeEventsBlacklistEnum
  }));
  context.register('joinsDesignerJoinTreesTreeController', new SidebarTreeController({
    selectionProvider: context.get('joinsDesignerSidebarTreeSelectionProvider'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    tree: context.get('joinsDesignerJoinTreesTree'),
    treeDataProvider: context.get('joinsDesignerSidebarJoinTreesTreeDataProvider'),
    model: context.get('joinsDesignerJoinTreesTreeSidebarStore'),
    fetchTreeEventsBlacklist: joinsDesignerFetchTreeEventsBlacklistEnum
  }));
}

module.exports = function (context, options) {
  createJoinsDesignerCommonTreeDataProviderComponents(context, options);
  createJoinsDesignerResourcesSidebarTreeDataProvider(context, options);
  createJoinsDesignerJoinTreesSidebarTreeDataProvider(context, options);
  createJoinsDesignerSidebarContextMenuOptions(context, options);
  createJoinsDesignerSidebar(context, options);
  createJoinsDesignerSidebarControllers(context, options);
};

});