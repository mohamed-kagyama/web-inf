define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Vue = require('vue');

var searchVueWrapperConfigFactory = require("../../../common/component/search/factory/searchVueWrapperConfigFactory");

var searchVueConfigFactory = require("../../../common/component/search/factory/searchVueConfigFactory");

var SidebarLayoutVueComponent = require("../../../component/layout/sidebarView/component/sidebarLayout/SidebarLayoutVueComponent");

var sidebarLayoutVueTemplate = require("text!../../../component/layout/sidebarView/component/sidebarLayout/template/sidebarLayoutVueTemplate.htm");

var TreeListDataProvider = require("../../../component/layout/sidebarView/tree/TreeListDataProvider");

var SidebarSearchKeywordProvider = require("../../../component/layout/sidebarView/tree/SidebarSearchKeywordProvider");

var MatchBySearchKeyword = require("../../../component/layout/sidebarView/predicate/MatchBySearchKeyword");

var getDefaultResourceSearchPropertyProvider = require("../../../component/layout/sidebarView/provider/getDefaultResourceSearchPropertyProvider");

var NestedTreeModel = require("../../../../util/nestedTreeModel/NestedTreeModel");

var AutoIdGenerationStrategyBasedOnEntityId = require("../../../util/AutoIdGenerationStrategyBasedOnEntityId");

var uriUtil = require("../../../util/uriUtil");

var applicationStateEventsEnum = require("../../../dispatcher/enum/applicationStateEventsEnum");

var SidebarTreeExpandCollapsePlugin = require("../../../component/layout/sidebarView/tree/plugin/SidebarTreeExpandCollapsePlugin");

var menuOptionsProviderFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuOptionsProviderFactory");

var showContextMenuEventHandlerFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuEventHandlerFactory/showContextMenuEventHandlerFactory");

var filtersDesignerSidebarTreeContextMenuVisibilitySpecification = require("../../../component/designer/filtersDesigner/sidebar/specification/filtersDesignerSidebarTreeContextMenuVisibilitySpecification");

var CompositePredicate = require("../../../../util/predicate/CompositePredicate");

var CompositeConcatenatingConverter = require("../../../component/layout/sidebarView/converter/CompositeConcatenatingConverter");

var CompositeResourceConverter = require("../../../component/layout/sidebarView/converter/CompositeResourceConverter");

var emptyProfileAttributeValuesToPlaceholderLabelConverter = require("../../../common/converter/emptyProfileAttributeValuesToPlaceholderLabelConverter");

var addParentJoinTreeIdConverter = require("../../../component/designer/joinsDesigner/converter/sidebar/addParentJoinTreeIdConverter");

var TreeItemSelectionProcessor = require("../../../component/layout/sidebarView/converter/processor/TreeItemSelectionProcessor");

var TreeItemExpandedProcessor = require("../../../component/layout/sidebarView/converter/processor/TreeItemExpandedProcessor");

var treeItemValueProcessor = require("../../../component/layout/sidebarView/converter/processor/treeItemValueProcessor");

var resourcesTreeItemIdProcessor = require("../../../component/layout/sidebarView/converter/processor/resourcesTreeItemIdProcessor");

var treeItemCalcFieldParentIdProcessor = require("../../../component/layout/sidebarView/converter/processor/treeItemCalcFieldParentIdProcessor");

var filtersDesignerSidebarTreeItemResourceProcessor = require("../../../component/designer/filtersDesigner/converter/sidebar/processor/filtersDesignerSidebarTreeItemResourceProcessor");

var treeItemIsEmptyDataSourceProcessor = require("../../../component/layout/sidebarView/converter/processor/treeItemIsEmptyDataSourceProcessor");

var ConstantGroupTreeConverter = require("../../../component/layout/sidebarView/converter/ConstantGroupTreeConverter");

var DataSourceTreeConverter = require("../../../component/layout/sidebarView/converter/DataSourceTreeConverter");

var JoinTreesTreeConverter = require("../../../component/layout/sidebarView/converter/JoinTreesTreeConverter");

var SchemaToDesignerTreeConverter = require("../../../component/layout/sidebarView/converter/SchemaToDesignerTreeConverter");

var doNotAcceptTableReferencesUsedInJoins = require("../../../component/designer/joinsDesigner/predicate/doNotAcceptTableReferencesUsedInJoins");

var doNotAcceptEmptyElementsIfResourceDoNotMatch = require("../../../component/layout/sidebarView/predicate/doNotAcceptEmptyElementsIfResourceDoNotMatch");

var DoNotSkipChildrenConversion = require("../../../component/layout/sidebarView/predicate/DoNotSkipChildrenConversion");

var FiltersDesignerSidebarTreeSelectionPlugin = require("../../../component/designer/filtersDesigner/sidebar/plugin/FiltersDesignerSidebarTreeSelectionPlugin");

var FiltersDesignerSidebarTreeDraggablePlugin = require("../../../component/designer/filtersDesigner/sidebar/plugin/FiltersDesignerSidebarTreeDraggablePlugin");

var filtersDesignerSidebarTreeOptionsFactory = require("../../../component/designer/filtersDesigner/sidebar/factory/filtersDesignerSidebarTreeOptionsFactory");

var automationDataNameAttributesEnum = require("../../../common/enum/automationDataNameAttributesEnum");

var addAutomationDataNameAttributeMixinFactory = require("../../../common/factory/addAutomationDataNameAttributeMixinFactory");

var eventBusFactory = require("../../../../util/eventBusFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createFiltersDesignerSidebarTreeDataProvider(context, options) {
  context.register('filtersDesignerSidebarSearchKeywordProvider', new SidebarSearchKeywordProvider({
    service: context.get('filtersDesignerViewStateModelService')
  }));
  context.register('filtersDesignerSidebarMatcherBySearchKeyword', new MatchBySearchKeyword({
    getSearchProperty: getDefaultResourceSearchPropertyProvider,
    searchKeywordProvider: context.get('filtersDesignerSidebarSearchKeywordProvider')
  }));
  var initialTreeItemConverter = new CompositeResourceConverter([context.get('baseTreeResourceConverter'), resourcesTreeItemIdProcessor, treeItemCalcFieldParentIdProcessor]).convert;
  var treeItemExpandedProcessor = new TreeItemExpandedProcessor({
    searchKeywordProvider: context.get('filtersDesignerSidebarSearchKeywordProvider'),
    isExpanded: context.get('viewStateModelQueryService').isNodeExpanded,
    isCollapsed: context.get('viewStateModelQueryService').isNodeCollapsed
  });
  var treeItemSelectionProcessor = new TreeItemSelectionProcessor({
    isItemSelected: context.get('filtersDesignerViewStateModelService').isSidebarItemSelected
  });
  var doNotSkipChildrenConversion = new DoNotSkipChildrenConversion({
    isExpanded: context.get('viewStateModelQueryService').isNodeExpanded,
    searchKeywordProvider: context.get('filtersDesignerSidebarSearchKeywordProvider')
  });
  var finalTreeItemConverter = new CompositeResourceConverter([treeItemValueProcessor, treeItemExpandedProcessor.process, filtersDesignerSidebarTreeItemResourceProcessor, treeItemIsEmptyDataSourceProcessor, context.get('js-sdk/src/commonSidebarTreeNodeConverter'), context.get('treeItemLabelProcessor').getNameAsLabel, treeItemSelectionProcessor.process]).convert;
  var constantGroupToNestedTreeModelConverter = new ConstantGroupTreeConverter({
    resourceMatch: true,
    resourceOrChildrenMatch: context.get('filtersDesignerSidebarMatcherBySearchKeyword').match,
    resourceJsonMatch: doNotAcceptEmptyElementsIfResourceDoNotMatch,
    convertResourceNoChildren: new CompositeResourceConverter([initialTreeItemConverter, finalTreeItemConverter]),
    convertChildrenMatch: doNotSkipChildrenConversion.match,
    convertResource: context.get('constantGroupMapBasedConverter'),
    comparator: context.get('comparatorByLabel')
  });
  var resourcesToNestedTreeModelConverter = new DataSourceTreeConverter({
    resourceMatch: new CompositePredicate([doNotAcceptTableReferencesUsedInJoins]).match,
    resourceOrChildrenMatch: new CompositePredicate([context.get('filtersDesignerSidebarMatcherBySearchKeyword').match, context.get('showDefaultSchemaInSidebarPredicate')]).match,
    resourceJsonMatch: doNotAcceptEmptyElementsIfResourceDoNotMatch,
    convertResourceNoChildren: new CompositeResourceConverter([initialTreeItemConverter, context.get('treeItemIsDerivedTableProcessor').process, finalTreeItemConverter]),
    convertChildrenMatch: doNotSkipChildrenConversion.match,
    convertResource: context.get('resourceMapBasedConverter'),
    comparator: context.get('dataSourceComparator'),
    schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec: context.get('schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec'),
    postProcess: emptyProfileAttributeValuesToPlaceholderLabelConverter
  });
  context.register('filtersDesignerJoinsToTreeStructureConverter', new JoinTreesTreeConverter({
    resourceMatch: true,
    resourceOrChildrenMatch: context.get('filtersDesignerSidebarMatcherBySearchKeyword').match,
    resourceJsonMatch: doNotAcceptEmptyElementsIfResourceDoNotMatch,
    convertResourceNoChildren: new CompositeResourceConverter([initialTreeItemConverter, addParentJoinTreeIdConverter, context.get('treeItemIsDerivedTableProcessor').process, finalTreeItemConverter]),
    convertChildrenMatch: doNotSkipChildrenConversion.match,
    convertResource: context.get('joinTreesMapBasedConverter'),
    comparator: context.get('dataSourceComparator')
  }));
  context.register('schemaToFiltersDesignerTreeConverter', new SchemaToDesignerTreeConverter({
    clientDomainSchemaCalcFieldsService: context.get('clientDomainSchemaCalcFieldsService'),
    converter: new CompositeConcatenatingConverter({
      converters: [constantGroupToNestedTreeModelConverter, resourcesToNestedTreeModelConverter, context.get('filtersDesignerJoinsToTreeStructureConverter')]
    })
  }));
  context.register('filtersDesignerSidebarNestedTreeModel', new NestedTreeModel([], {
    idGenerationStrategy: new AutoIdGenerationStrategyBasedOnEntityId(),
    pathSeparator: uriUtil.getRootUri(),
    nodeIdAttribute: 'resourceId'
  }));
  context.register('filtersDesignerSidebarTreeDataProvider', new TreeListDataProvider({
    schemaToNestedTreeModelConverter: context.get('schemaToFiltersDesignerTreeConverter'),
    nestedTreeModel: context.get('filtersDesignerSidebarNestedTreeModel')
  }));
}

function createFiltersDesignerSidebarContextMenuOptions(context, options) {
  var showContextMenuEventHandler = showContextMenuEventHandlerFactory.create({
    eventBus: context.get('filtersDesignerEventBus')
  });
  context.register('filtersDesignerSidebarContextMenuEventHandlers', _.extend({}, context.get('removeDerivedTableMenuEventHandler'), context.get('editDerivedTableMenuEventHandler'), context.get('createCalcFieldMenuEventHandler'), context.get('editCalcFieldMenuEventHandler'), context.get('removeCalcFieldMenuEventHandler'), showContextMenuEventHandler));
  var provider = menuOptionsProviderFactory.create([context.get('editDerivedTableMenuOption'), context.get('removeDerivedTableMenuOption'), context.get('createCalcFieldMenuOption'), context.get('createConstantCalcFieldMenuOption'), context.get('editCalcFieldMenuOption'), context.get('removeCalcFieldMenuOption')]);
  context.register('filtersDesignerSidebarContextMenuOptionsProvider', provider);
}

function createFiltersDesignerSidebar(context, options) {
  context.register('filtersDesignerSidebarSearchEventBus', eventBusFactory.create());
  var Search = Vue.extend(addAutomationDataNameAttributeMixinFactory.create({
    config: searchVueConfigFactory.create({
      eventBus: context.get('filtersDesignerSidebarSearchEventBus')
    }),
    dataNames: automationDataNameAttributesEnum.filtersDesigner.sidebarSearch
  }));
  context.register('filtersDesignerSidebarSearch', Vue.extend(searchVueWrapperConfigFactory.create({
    search: Search,
    data: context.get('filtersDesignerSidebarSearchStore').attributes
  })));
  var sidebarTreeDataProviderPromiseWrapper = context.get('sidebarTreeDataProviderPromiseWrapper');
  var filtersDesignerSidebarTreeOptions = filtersDesignerSidebarTreeOptionsFactory.getTreeOptions({
    listItemHeight: options.list.listItemHeight,
    dataProvider: sidebarTreeDataProviderPromiseWrapper(context.get('filtersDesignerSidebarTreeDataProvider').getData),
    sidebarTooltipOptionsFactory: context.get('sidebarTooltipOptionsFactory'),
    filtersDesignerSidebarTreeContextMenuVisibilitySpecification: filtersDesignerSidebarTreeContextMenuVisibilitySpecification,
    filtersDesignerSidebarContextMenuEventHandlers: context.get('filtersDesignerSidebarContextMenuEventHandlers'),
    filtersDesignerSidebarContextMenuOptionsProvider: context.get('filtersDesignerSidebarContextMenuOptionsProvider')
  });
  context.register('filtersDesignerSidebarTree', context.get('sidebarTreeFactory').create(filtersDesignerSidebarTreeOptions));
  context.register('filtersDesignerSidebar', new SidebarLayoutVueComponent({
    data: context.get('filtersDesignerSidebarStore').attributes,
    tree: context.get('filtersDesignerSidebarTree'),
    template: sidebarLayoutVueTemplate
  }));
  context.register('filtersDesignerSidebarTreeExpandCollapsePlugin', new SidebarTreeExpandCollapsePlugin({
    expandedNodesProvider: context.get('viewStateModelQueryService'),
    searchKeywordProvider: context.get('filtersDesignerSidebarSearchKeywordProvider'),
    el: context.get('filtersDesignerSidebar').$el,
    eventBus: context.get('applicationDispatcherEventBus'),
    expandNodeEvent: applicationStateEventsEnum.EXPAND_SIDEBAR_NODE,
    collapseNodeEvent: applicationStateEventsEnum.COLLAPSE_SIDEBAR_NODE
  }));
  context.register('filtersDesignerSidebarTreeDraggablePlugin', new FiltersDesignerSidebarTreeDraggablePlugin({
    filtersDesignerEventBus: context.get('filtersDesignerEventBus'),
    sidebarTreeModel: context.get('filtersDesignerSidebarNestedTreeModel'),
    el: context.get('filtersDesignerSidebar').$el
  }));
  context.register('filtersDesignerSidebarTreeSelectionPlugin', new FiltersDesignerSidebarTreeSelectionPlugin({
    filtersDesignerEventBus: context.get('filtersDesignerEventBus'),
    sidebarTreeModel: context.get('filtersDesignerSidebarNestedTreeModel'),
    el: context.get('filtersDesignerSidebar').$el
  }));
}

module.exports = function (context, options) {
  createFiltersDesignerSidebarTreeDataProvider(context, options);
  createFiltersDesignerSidebarContextMenuOptions(context, options);
  createFiltersDesignerSidebar(context, options);
};

});