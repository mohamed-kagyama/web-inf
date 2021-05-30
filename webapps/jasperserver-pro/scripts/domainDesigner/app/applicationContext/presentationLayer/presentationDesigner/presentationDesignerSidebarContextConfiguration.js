define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Vue = require('vue');

var uriUtil = require("../../../util/uriUtil");

var searchVueWrapperConfigFactory = require("../../../common/component/search/factory/searchVueWrapperConfigFactory");

var searchVueConfigFactory = require("../../../common/component/search/factory/searchVueConfigFactory");

var TreeListDataProvider = require("../../../component/layout/sidebarView/tree/TreeListDataProvider");

var MatchBySearchKeyword = require("../../../component/layout/sidebarView/predicate/MatchBySearchKeyword");

var getDefaultResourceSearchPropertyProvider = require("../../../component/layout/sidebarView/provider/getDefaultResourceSearchPropertyProvider");

var DoNotSkipChildrenConversion = require("../../../component/layout/sidebarView/predicate/DoNotSkipChildrenConversion");

var NestedTreeModel = require("../../../../util/nestedTreeModel/NestedTreeModel");

var AutoIdGenerationStrategyBasedOnEntityId = require("../../../util/AutoIdGenerationStrategyBasedOnEntityId");

var CompositeProcessor = require("../../../../util/CompositeProcessor");

var CompositeConcatenatingConverter = require("../../../component/layout/sidebarView/converter/CompositeConcatenatingConverter");

var ConstantGroupTreeConverter = require("../../../component/layout/sidebarView/converter/ConstantGroupTreeConverter");

var SchemaToDesignerTreeConverter = require("../../../component/layout/sidebarView/converter/SchemaToDesignerTreeConverter");

var presentationDesignerAddParentIdSidebarConverter = require("../../../component/designer/presentationDesigner/sidebar/converter/presentationDesignerAddParentIdSidebarConverter");

var presentationDesignerAddIndexSidebarConverter = require("../../../component/designer/presentationDesigner/sidebar/converter/presentationDesignerAddIndexSidebarConverter");

var presentationDesignerAddSourceConverter = require("../../../component/designer/presentationDesigner/sidebar/converter/presentationDesignerAddSourceConverter");

var JoinTreesTreeConverter = require("../../../component/layout/sidebarView/converter/JoinTreesTreeConverter");

var DataSourceTreeConverter = require("../../../component/layout/sidebarView/converter/DataSourceTreeConverter");

var CompositeResourceConverter = require("../../../component/layout/sidebarView/converter/CompositeResourceConverter");

var doNotAcceptTableReferencesUsedInJoins = require("../../../component/designer/joinsDesigner/predicate/doNotAcceptTableReferencesUsedInJoins");

var resourcesTreeItemIdProcessor = require("../../../component/layout/sidebarView/converter/processor/resourcesTreeItemIdProcessor");

var presentationDesignerSidebarTreeItemResourceProcessor = require("../../../component/designer/presentationDesigner/sidebar/processor/presentationDesignerSidebarTreeItemResourceProcessor");

var treeItemValueProcessor = require("../../../component/layout/sidebarView/converter/processor/treeItemValueProcessor");

var TreeItemSelectionProcessor = require("../../../component/layout/sidebarView/converter/processor/TreeItemSelectionProcessor");

var treeItemCalcFieldParentIdProcessor = require("../../../component/layout/sidebarView/converter/processor/treeItemCalcFieldParentIdProcessor");

var TreeItemExpandedProcessor = require("../../../component/layout/sidebarView/converter/processor/TreeItemExpandedProcessor");

var menuOptionsProviderFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuOptionsProviderFactory");

var showContextMenuEventHandlerFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuEventHandlerFactory/showContextMenuEventHandlerFactory");

var CompositePredicate = require("../../../../util/predicate/CompositePredicate");

var SidebarLayoutVueComponent = require("../../../component/layout/sidebarView/component/sidebarLayout/SidebarLayoutVueComponent");

var sidebarLayoutVueTemplate = require("text!../../../component/layout/sidebarView/component/sidebarLayout/template/sidebarLayoutVueTemplate.htm");

var emptyProfileAttributeValuesToPlaceholderLabelConverter = require("../../../common/converter/emptyProfileAttributeValuesToPlaceholderLabelConverter");

var presentationDesignerJoinsTreeAddDataIslandSourceIdConverter = require("../../../component/designer/presentationDesigner/sidebar/converter/presentationDesignerJoinsTreeAddDataIslandSourceIdConverter");

var presentationDesignerDataSourceResourcesTreeAddDataIslandSourceIdConverter = require("../../../component/designer/presentationDesigner/sidebar/converter/presentationDesignerDataSourceResourcesTreeAddDataIslandSourceIdConverter");

var presentationDesignerConstantGroupsTreeAddDataIslandSourceIdConverter = require("../../../component/designer/presentationDesigner/sidebar/converter/presentationDesignerConstantGroupsTreeAddDataIslandSourceIdConverter");

var presentationDesignerIsJoinTreeItemConverter = require("../../../component/designer/presentationDesigner/sidebar/converter/presentationDesignerIsJoinTreeItemConverter");

var presentationDesignerSidebarTreeOptionsFactory = require("../../../component/designer/presentationDesigner/sidebar/factory/presentationDesignerSidebarTreeOptionsFactory");

var PresentationDesignerSidebarTreeContextMenuVisibilitySpecification = require("../../../component/designer/presentationDesigner/sidebar/specification/PresentationDesignerSidebarTreeContextMenuVisibilitySpecification");

var SidebarSearchKeywordProvider = require("../../../component/layout/sidebarView/tree/SidebarSearchKeywordProvider");

var doNotAcceptEmptyElementsIfResourceDoNotMatch = require("../../../component/layout/sidebarView/predicate/doNotAcceptEmptyElementsIfResourceDoNotMatch");

var automationDataNameAttributesEnum = require("../../../common/enum/automationDataNameAttributesEnum");

var addAutomationDataNameAttributeMixinFactory = require("../../../common/factory/addAutomationDataNameAttributeMixinFactory");

var eventBusFactory = require("../../../../util/eventBusFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createPresentationDesignerSidebarTreeDataProvider(context, options) {
  context.register('presentationDesignerSidebarSearchKeywordProvider', new SidebarSearchKeywordProvider({
    service: context.get('presentationDesignerViewStateModelService')
  }));
  context.register('presentationDesignerMatchBySearchKeyword', new MatchBySearchKeyword({
    getSearchProperty: getDefaultResourceSearchPropertyProvider,
    searchKeywordProvider: context.get('presentationDesignerSidebarSearchKeywordProvider')
  }));
  var treeItemSelectionProcessor = new TreeItemSelectionProcessor({
    isItemSelected: context.get('presentationDesignerViewStateModelService').isPresentationSidebarItemSelected
  });
  var initialTreeItemConverter = new CompositeResourceConverter([context.get('baseTreeResourceConverter'), presentationDesignerAddSourceConverter, resourcesTreeItemIdProcessor, treeItemCalcFieldParentIdProcessor]).convert;
  var treeItemExpandedProcessor = new TreeItemExpandedProcessor({
    searchKeywordProvider: context.get('presentationDesignerSidebarSearchKeywordProvider'),
    isExpanded: context.get('viewStateModelQueryService').isNodeExpanded,
    isCollapsed: context.get('viewStateModelQueryService').isNodeCollapsed
  });
  var doNotSkipChildrenConversion = new DoNotSkipChildrenConversion({
    isExpanded: context.get('viewStateModelQueryService').isNodeExpanded,
    searchKeywordProvider: context.get('presentationDesignerSidebarSearchKeywordProvider')
  });
  var finalTreeItemConverter = new CompositeResourceConverter([treeItemValueProcessor, treeItemExpandedProcessor.process, presentationDesignerSidebarTreeItemResourceProcessor, context.get('js-sdk/src/commonSidebarTreeNodeConverter'), context.get('treeItemLabelProcessor').getNameAsLabel, treeItemSelectionProcessor.process]).convert;
  var constantGroupToNestedTreeModelConverter = new ConstantGroupTreeConverter({
    resourceMatch: true,
    resourceOrChildrenMatch: context.get('presentationDesignerMatchBySearchKeyword').match,
    resourceJsonMatch: doNotAcceptEmptyElementsIfResourceDoNotMatch,
    convertResourceNoChildren: new CompositeResourceConverter([initialTreeItemConverter, presentationDesignerConstantGroupsTreeAddDataIslandSourceIdConverter, finalTreeItemConverter]),
    convertChildrenMatch: doNotSkipChildrenConversion.match,
    convertResource: context.get('constantGroupMapBasedConverter'),
    comparator: context.get('comparatorByLabel'),
    postProcess: presentationDesignerAddIndexSidebarConverter
  });
  var resourcesToNestedTreeModelConverter = new DataSourceTreeConverter({
    resourceMatch: doNotAcceptTableReferencesUsedInJoins,
    resourceOrChildrenMatch: new CompositePredicate([context.get('presentationDesignerMatchBySearchKeyword').match, context.get('showDefaultSchemaInSidebarPredicate')]).match,
    resourceJsonMatch: doNotAcceptEmptyElementsIfResourceDoNotMatch,
    convertResourceNoChildren: new CompositeResourceConverter([initialTreeItemConverter, presentationDesignerDataSourceResourcesTreeAddDataIslandSourceIdConverter, finalTreeItemConverter]),
    convertChildrenMatch: doNotSkipChildrenConversion.match,
    convertResource: context.get('resourceMapBasedConverter'),
    comparator: context.get('dataSourceComparator'),
    schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec: context.get('schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec'),
    postProcess: new CompositeProcessor([presentationDesignerAddIndexSidebarConverter, emptyProfileAttributeValuesToPlaceholderLabelConverter]).process
  });
  context.register('presentationItemsToTreeStructureConverter', new JoinTreesTreeConverter({
    resourceMatch: true,
    resourceOrChildrenMatch: context.get('presentationDesignerMatchBySearchKeyword').match,
    resourceJsonMatch: doNotAcceptEmptyElementsIfResourceDoNotMatch,
    convertResourceNoChildren: new CompositeResourceConverter([initialTreeItemConverter, presentationDesignerJoinsTreeAddDataIslandSourceIdConverter, presentationDesignerAddParentIdSidebarConverter, presentationDesignerIsJoinTreeItemConverter, finalTreeItemConverter]),
    convertChildrenMatch: doNotSkipChildrenConversion.match,
    convertResource: context.get('joinTreesMapBasedConverter'),
    comparator: context.get('dataSourceComparator'),
    postProcess: presentationDesignerAddIndexSidebarConverter
  }));
  context.register('schemaToPresentationDesignerTreeConverter', new SchemaToDesignerTreeConverter({
    clientDomainSchemaCalcFieldsService: context.get('clientDomainSchemaCalcFieldsService'),
    converter: new CompositeConcatenatingConverter({
      converters: [constantGroupToNestedTreeModelConverter, resourcesToNestedTreeModelConverter, context.get('presentationItemsToTreeStructureConverter')],
      postProcess: presentationDesignerAddIndexSidebarConverter
    })
  }));
  context.register('presentationDesignerSidebarNestedTreeModel', new NestedTreeModel([], {
    idGenerationStrategy: new AutoIdGenerationStrategyBasedOnEntityId(),
    pathSeparator: uriUtil.getRootUri(),
    nodeIdAttribute: 'resourceId'
  }));
  context.register('presentationDesignerSidebarTreeDataProvider', new TreeListDataProvider({
    schemaToNestedTreeModelConverter: context.get('schemaToPresentationDesignerTreeConverter'),
    nestedTreeModel: context.get('presentationDesignerSidebarNestedTreeModel')
  }));
}

function createPresentationDesignerSidebarContextMenuOptions(context, options) {
  var showContextMenuEventHandler = showContextMenuEventHandlerFactory.create({
    eventBus: context.get('presentationDesignerEventBus')
  });
  context.register('presentationDesignerSidebarContextMenuEventHandlers', _.extend({}, showContextMenuEventHandler, context.get('createCalcFieldMenuEventHandler'), context.get('editCalcFieldMenuEventHandler'), context.get('removeCalcFieldMenuEventHandler')));
  var provider = menuOptionsProviderFactory.create([context.get('createConstantCalcFieldMenuOption'), context.get('editCalcFieldMenuOption'), context.get('removeCalcFieldMenuOption')]);
  context.register('presentationDesignerSidebarContextMenuOptionsProvider', provider);
}

function createPresentationDesignerSidebar(context, options) {
  context.register('presentationDesignerSidebarSearchEventBus', eventBusFactory.create());
  var Search = Vue.extend(addAutomationDataNameAttributeMixinFactory.create({
    config: searchVueConfigFactory.create({
      eventBus: context.get('presentationDesignerSidebarSearchEventBus')
    }),
    dataNames: automationDataNameAttributesEnum.presentationDesigner.sidebarSearch
  }));
  context.register('presentationDesignerSidebarSearch', Vue.extend(searchVueWrapperConfigFactory.create({
    search: Search,
    data: context.get('presentationDesignerSidebarSearchStore').attributes
  })));
  context.register('presentationDesignerSidebarTreeContextMenuVisibilitySpecification', new PresentationDesignerSidebarTreeContextMenuVisibilitySpecification({
    nestedTreeModel: context.get('presentationDesignerSidebarNestedTreeModel')
  }));
  var sidebarTreeDataProviderPromiseWrapper = context.get('sidebarTreeDataProviderPromiseWrapper');
  var presentationDesignerSidebarTreeOptions = presentationDesignerSidebarTreeOptionsFactory.getTreeOptions({
    listItemHeight: options.list.listItemHeight,
    dataProvider: sidebarTreeDataProviderPromiseWrapper(context.get('presentationDesignerSidebarTreeDataProvider').getData),
    sidebarTreeContextMenuVisibilitySpecification: context.get('presentationDesignerSidebarTreeContextMenuVisibilitySpecification'),
    presentationDesignerSidebarContextMenuEventHandlers: context.get('presentationDesignerSidebarContextMenuEventHandlers'),
    presentationDesignerSidebarContextMenuOptionsProvider: context.get('presentationDesignerSidebarContextMenuOptionsProvider'),
    sidebarTooltipOptionsFactory: context.get('sidebarTooltipOptionsFactory')
  });
  context.register('presentationDesignerSidebarTree', context.get('sidebarTreeFactory').create(presentationDesignerSidebarTreeOptions));
  context.register('presentationDesignerSidebar', new SidebarLayoutVueComponent({
    data: context.get('presentationDesignerSidebarStore').attributes,
    tree: context.get('presentationDesignerSidebarTree'),
    template: sidebarLayoutVueTemplate
  }));
}

module.exports = function (context, options) {
  createPresentationDesignerSidebarTreeDataProvider(context, options);
  createPresentationDesignerSidebarContextMenuOptions(context, options);
  createPresentationDesignerSidebar(context, options);
};

});