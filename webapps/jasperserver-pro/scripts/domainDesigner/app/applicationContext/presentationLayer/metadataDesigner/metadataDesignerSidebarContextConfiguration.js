define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var _ = require('underscore');

var CompositePredicate = require("../../../../util/predicate/CompositePredicate");

var automationDataNameAttributesEnum = require("../../../common/enum/automationDataNameAttributesEnum");

var addAutomationDataNameAttributeMixinFactory = require("../../../common/factory/addAutomationDataNameAttributeMixinFactory");

var menuOptionsProviderFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuOptionsProviderFactory");

var showContextMenuEventHandlerFactory = require("../../../component/layout/sidebarView/factory/contextMenu/menuEventHandlerFactory/showContextMenuEventHandlerFactory");

var uriUtil = require("../../../util/uriUtil");

var CompositeConcatenatingConverter = require("../../../component/layout/sidebarView/converter/CompositeConcatenatingConverter");

var dataSourceConverterMap = require("../../../component/layout/sidebarView/converter/converterMap/dataSourceConverterMap");

var CompositeResourceConverter = require("../../../component/layout/sidebarView/converter/CompositeResourceConverter");

var GenericMapBasedConverter = require("../../../component/layout/sidebarView/converter/GenericMapBasedConverter");

var DataSourceTreeConverter = require("../../../component/layout/sidebarView/converter/DataSourceTreeConverter");

var ConstantGroupTreeConverter = require("../../../component/layout/sidebarView/converter/ConstantGroupTreeConverter");

var MatchBySearchKeyword = require("../../../component/layout/sidebarView/predicate/MatchBySearchKeyword");

var getResourceNameOrSearchNameAsPropertyProvider = require("../../../component/designer/metadataDesigner/provider/getResourceNameOrSearchNameAsPropertyProvider");

var TreeListDataProvider = require("../../../component/layout/sidebarView/tree/TreeListDataProvider");

var SidebarSearchKeywordProvider = require("../../../component/layout/sidebarView/tree/SidebarSearchKeywordProvider");

var SidebarLayoutVueComponent = require("../../../component/layout/sidebarView/component/sidebarLayout/SidebarLayoutVueComponent");

var sidebarLayoutVueTemplate = require("text!../../../component/layout/sidebarView/component/sidebarLayout/template/sidebarLayoutVueTemplate.htm");

var NestedTreeModel = require("../../../../util/nestedTreeModel/NestedTreeModel");

var AutoIdGenerationStrategyBasedOnEntityId = require("../../../util/AutoIdGenerationStrategyBasedOnEntityId");

var metadataDesignerSidebarTreeItemResourceProcessor = require("../../../component/designer/metadataDesigner/treeDataProvider/processor/metadataDesignerSidebarTreeItemResourceProcessor");

var dataSourceTreeItemIdProcessor = require("../../../component/layout/sidebarView/converter/processor/dataSourceTreeItemIdProcessor");

var TreeItemSelectionProcessor = require("../../../component/layout/sidebarView/converter/processor/TreeItemSelectionProcessor");

var TreeItemExpandedProcessor = require("../../../component/layout/sidebarView/converter/processor/TreeItemExpandedProcessor");

var treeItemCalcFieldParentIdProcessor = require("../../../component/layout/sidebarView/converter/processor/treeItemCalcFieldParentIdProcessor");

var treeItemValueProcessor = require("../../../component/layout/sidebarView/converter/processor/treeItemValueProcessor");

var MetadataDesignerSidebarTooltipOptionsFactory = require("../../../component/designer/metadataDesigner/sidebar/factory/MetadataDesignerSidebarTooltipOptionsFactory");

var SchemaToDesignerTreeConverter = require("../../../component/layout/sidebarView/converter/SchemaToDesignerTreeConverter");

var metadataDesignerSidebarTreeOptionsFactory = require("../../../component/designer/metadataDesigner/sidebar/factory/metadataDesignerSidebarTreeOptionsFactory");

var metadataDesignerSidebarTreeContextMenuVisibilitySpecification = require("../../../component/designer/metadataDesigner/sidebar/specification/metadataDesignerSidebarTreeContextMenuVisibilitySpecification");

var treeItemIsEmptyDataSourceProcessor = require("../../../component/layout/sidebarView/converter/processor/treeItemIsEmptyDataSourceProcessor");

var treeItemIsEmptyDataSourceGroupProcessor = require("../../../component/designer/metadataDesigner/treeDataProvider/processor/treeItemIsEmptyDataSourceGroupProcessor");

var doNotAcceptEmptyElementsIfResourceDoNotMatch = require("../../../component/layout/sidebarView/predicate/doNotAcceptEmptyElementsIfResourceDoNotMatch");

var DoNotSkipChildrenConversion = require("../../../component/layout/sidebarView/predicate/DoNotSkipChildrenConversion");

var emptyProfileAttributeValuesToPlaceholderLabelConverter = require("../../../common/converter/emptyProfileAttributeValuesToPlaceholderLabelConverter");

var searchVueWrapperConfigFactory = require("../../../common/component/search/factory/searchVueWrapperConfigFactory");

var searchVueConfigFactory = require("../../../common/component/search/factory/searchVueConfigFactory");

var eventBusFactory = require("../../../../util/eventBusFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createMetadataDesignerDataProviders(context, options) {
  context.register('metadataDesignerSidebarSearchKeywordProvider', new SidebarSearchKeywordProvider({
    service: context.get('metadataDesignerViewStateModelService')
  }));
  context.register('metadataDesignerMatchBySearchKeyword', new MatchBySearchKeyword({
    getSearchProperty: getResourceNameOrSearchNameAsPropertyProvider,
    searchKeywordProvider: context.get('metadataDesignerSidebarSearchKeywordProvider')
  }));
  var treeItemSelectionProcessor = new TreeItemSelectionProcessor({
    isItemSelected: context.get('metadataDesignerViewStateModelService').isSidebarItemSelected
  });
  var treeItemExpandedProcessor = new TreeItemExpandedProcessor({
    searchKeywordProvider: context.get('metadataDesignerSidebarSearchKeywordProvider'),
    isExpanded: context.get('viewStateModelQueryService').isNodeExpanded,
    isCollapsed: context.get('viewStateModelQueryService').isNodeCollapsed
  });
  var doNotSkipChildrenConversion = new DoNotSkipChildrenConversion({
    isExpanded: context.get('viewStateModelQueryService').isNodeExpanded,
    searchKeywordProvider: context.get('metadataDesignerSidebarSearchKeywordProvider')
  });
  var initialTreeItemConverter = new CompositeResourceConverter([context.get('baseTreeResourceConverter'), dataSourceTreeItemIdProcessor, treeItemCalcFieldParentIdProcessor]).convert;
  var finalTreeItemConverter = new CompositeResourceConverter([treeItemValueProcessor, treeItemExpandedProcessor.process, metadataDesignerSidebarTreeItemResourceProcessor, treeItemIsEmptyDataSourceProcessor, treeItemIsEmptyDataSourceGroupProcessor, context.get('js-sdk/src/commonSidebarTreeNodeConverter'), context.get('treeItemLabelProcessor').getSourceNameAsLabel, treeItemSelectionProcessor.process]).convert;
  var constantGroupTreeConverter = new ConstantGroupTreeConverter({
    resourceMatch: true,
    resourceOrChildrenMatch: context.get('metadataDesignerMatchBySearchKeyword').match,
    resourceJsonMatch: doNotAcceptEmptyElementsIfResourceDoNotMatch,
    convertResourceNoChildren: new CompositeResourceConverter([initialTreeItemConverter, finalTreeItemConverter]),
    convertChildrenMatch: doNotSkipChildrenConversion.match,
    convertResource: context.get('constantGroupMapBasedConverter'),
    comparator: context.get('comparatorByLabel')
  });
  var dataSourceTreeConverter = new DataSourceTreeConverter({
    resourceMatch: true,
    resourceOrChildrenMatch: new CompositePredicate([context.get('metadataDesignerMatchBySearchKeyword').match, context.get('showDefaultSchemaInSidebarPredicate')]).match,
    resourceJsonMatch: doNotAcceptEmptyElementsIfResourceDoNotMatch,
    convertResourceNoChildren: new CompositeResourceConverter([initialTreeItemConverter, context.get('treeItemIsDerivedTableProcessor').process, finalTreeItemConverter]),
    convertChildrenMatch: doNotSkipChildrenConversion.match,
    convertResource: new GenericMapBasedConverter({
      converterMap: dataSourceConverterMap
    }),
    comparator: context.get('comparatorByLabel'),
    schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec: context.get('schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec'),
    postProcess: emptyProfileAttributeValuesToPlaceholderLabelConverter
  });
  context.register('schemaToMetadataDesignerTreeConverter', new SchemaToDesignerTreeConverter({
    clientDomainSchemaCalcFieldsService: context.get('clientDomainSchemaCalcFieldsService'),
    converter: new CompositeConcatenatingConverter({
      converters: [constantGroupTreeConverter, dataSourceTreeConverter]
    })
  }));
  context.register('metadataDesignerSidebarNestedTreeModel', new NestedTreeModel([], {
    idGenerationStrategy: new AutoIdGenerationStrategyBasedOnEntityId(),
    pathSeparator: uriUtil.getRootUri(),
    nodeIdAttribute: 'resourceId'
  }));
  context.register('metadataDesignerSidebarTreeDataProvider', new TreeListDataProvider({
    schemaToNestedTreeModelConverter: context.get('schemaToMetadataDesignerTreeConverter'),
    nestedTreeModel: context.get('metadataDesignerSidebarNestedTreeModel')
  }));
}

function createMetadataDesignerSidebarContextMenuOptions(context, options) {
  var showContextMenuEventHandler = showContextMenuEventHandlerFactory.create({
    eventBus: context.get('metadataDesignerEventBus')
  });
  context.register('metadataDesignerSidebarContextMenuEventHandlers', _.extend({}, showContextMenuEventHandler, context.get('copyDerivedTableMenuEventHandler'), context.get('createDerivedTableMenuEventHandler'), context.get('editDerivedTableMenuEventHandler'), context.get('removeDerivedTableMenuEventHandler'), context.get('createCalcFieldMenuEventHandler'), context.get('editCalcFieldMenuEventHandler'), context.get('removeCalcFieldMenuEventHandler')));
  var provider = menuOptionsProviderFactory.create([context.get('copyDerivedTableMenuOption'), context.get('createDerivedTableMenuOption'), context.get('editDerivedTableMenuOption'), context.get('removeDerivedTableMenuOption'), context.get('createConstantCalcFieldMenuOption'), context.get('editCalcFieldMenuOption'), context.get('removeCalcFieldMenuOption')]);
  context.register('metadataDesignerSidebarContextMenuOptionsProvider', provider);
}

function createMetadataDesignerSidebar(context, options) {
  context.register('metadataDesignerSidebarSearchEventBus', eventBusFactory.create());
  var Search = Vue.extend(addAutomationDataNameAttributeMixinFactory.create({
    config: searchVueConfigFactory.create({
      eventBus: context.get('metadataDesignerSidebarSearchEventBus')
    }),
    dataNames: automationDataNameAttributesEnum.metadataDesigner.sidebarSearch
  }));
  context.register('metadataDesignerSidebarSearch', Vue.extend(searchVueWrapperConfigFactory.create({
    search: Search,
    data: context.get('metadataDesignerSidebarSearchStore').attributes
  })));
  context.register('metadataDesignerSidebarTooltipOptionsFactory', new MetadataDesignerSidebarTooltipOptionsFactory({
    tooltipOffset: options.tooltip.offset
  }));
  var sidebarTreeDataProviderPromiseWrapper = context.get('sidebarTreeDataProviderPromiseWrapper');
  var sidebarTreeOptions = metadataDesignerSidebarTreeOptionsFactory.getTreeOptions({
    listItemHeight: options.list.listItemHeight,
    dataProvider: sidebarTreeDataProviderPromiseWrapper(context.get('metadataDesignerSidebarTreeDataProvider').getData),
    metadataDesignerSidebarTreeContextMenuVisibilitySpecification: metadataDesignerSidebarTreeContextMenuVisibilitySpecification,
    metadataDesignerSidebarContextMenuOptionsProvider: context.get('metadataDesignerSidebarContextMenuOptionsProvider'),
    metadataDesignerSidebarTooltipOptionsFactory: context.get('metadataDesignerSidebarTooltipOptionsFactory'),
    metadataDesignerSidebarContextMenuEventHandlers: context.get('metadataDesignerSidebarContextMenuEventHandlers')
  });
  context.register('metadataDesignerSidebarTree', context.get('sidebarTreeFactory').create(sidebarTreeOptions));
  context.register('metadataDesignerSidebar', new SidebarLayoutVueComponent({
    data: context.get('metadataDesignerSidebarStore').attributes,
    tree: context.get('metadataDesignerSidebarTree'),
    template: sidebarLayoutVueTemplate
  }));
}

module.exports = function (context, options) {
  createMetadataDesignerDataProviders(context, options);
  createMetadataDesignerSidebarContextMenuOptions(context, options);
  createMetadataDesignerSidebar(context, options);
};

});