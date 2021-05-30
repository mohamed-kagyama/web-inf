define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var CanvasViewStore = require("../../component/layout/canvasView/store/CanvasViewStore");

var CanvasViewController = require("../../component/layout/canvasView/controller/CanvasViewController");

var canvasVueConfigFactory = require("../../component/layout/canvasView/component/factory/canvasVueConfigFactory");

var canvasViewDesignersEnum = require("../../model/enum/canvasViewDesignersEnum");

var CalcFieldContextFactory = require("../../component/designer/calculatedFieldsDesigner/factory/CalcFieldContextFactory");

var createDerivedTablesDesigner = require("./derivedTablesDesigner/derivedTablesDesignerContextConfiguration");

var createCalculatedFieldsDesigner = require("./calcFieldsDesigner/calculatedFieldsDesignerContextConfiguration");

var createOptionsDesigner = require("./optionsDesigner/optionsDesignerContextConfiguration");

var createSecurityDesigner = require("./securityDesigner/securityDesignerContextConfiguration");

var onChangeStateSearchStrategy = require("../../common/component/search/strategy/onChangeStateSearchStrategy");

var onChangeStateSidebarSearchStrategy = require("../../component/layout/sidebarView/strategy/onChangeStateSidebarSearchStrategy");

var metadataDesignerContextConfiguration = require("./metadataDesigner/metadataDesignerContextConfiguration");

var metadataDesignerEventBusContextConfiguration = require("./metadataDesigner/metadataDesignerEventBusContextConfiguration");

var metadataDesignerServiceContextConfiguration = require("./metadataDesigner/metadataDesignerServiceContextConfiguration");

var metadataDesignerSidebarContextConfiguration = require("./metadataDesigner/metadataDesignerSidebarContextConfiguration");

var metadataDesignerViewModelContextConfiguration = require("./metadataDesigner/metadataDesignerViewModelContextConfiguration");

var joinsDesignerContextConfiguration = require("./joinsDesigner/joinsDesignerContextConfiguration");

var joinsDesignerServiceContextConfiguration = require("./joinsDesigner/joinsDesignerServiceContextConfiguration");

var joinsDesignerEventBusContextConfiguration = require("./joinsDesigner/joinsDesignerEventBusContextConfiguration");

var joinsDesignerViewModelContextConfiguration = require("./joinsDesigner/joinsDesignerViewModelContextConfiguration");

var joinsDesignerSidebarContextConfiguration = require("./joinsDesigner/joinsDesignerSidebarContextConfiguration");

var filtersDesignerContextConfiguration = require("./filtersDesigner/filtersDesignerContextConfiguration");

var filtersDesignerEventBusContextConfiguration = require("./filtersDesigner/filtersDesignerEventBusContextConfiguration");

var filtersDesignerServiceContextConfiguration = require("./filtersDesigner/filtersDesignerServiceContextConfiguration");

var filtersDesignerSidebarContextConfiguration = require("./filtersDesigner/filtersDesignerSidebarContextConfiguration");

var filtersDesignerViewModelContextConfiguration = require("./filtersDesigner/filtersDesignerViewModelContextConfiguration");

var presentationDesignerContextConfiguration = require("./presentationDesigner/presentationDesignerContextConfiguration");

var presentationDesignerEventBusContextConfiguration = require("./presentationDesigner/presentationDesignerEventBusContextConfiguration");

var presentationDesignerServiceContextConfiguration = require("./presentationDesigner/presentationDesignerServiceContextConfiguration");

var presentationDesignerSidebarContextConfiguration = require("./presentationDesigner/presentationDesignerSidebarContextConfiguration");

var presentationDesignerViewModelContextConfiguration = require("./presentationDesigner/presentationDesignerViewModelContextConfiguration");

var sidebarViewContextConfiguration = require("./sidebar/sidebarViewContextConfiguration");

var sidebarViewContextMenuOptionsContextConfiguration = require("./sidebar/sidebarViewContextMenuOptionsContextConfiguration");

var showDefaultSchemaPredicate = require("../../common/predicate/showDefaultSchemaPredicate");

var showDefaultSchemaInSidebarPredicateAdapter = require("../../component/layout/sidebarView/predicate/showDefaultSchemaInSidebarPredicateAdapter");

var sidebarTreeFactory = require("../../component/layout/sidebarView/tree/factory/sidebarTreeFactory");

var sidebarTreeDataProviderPromiseWrapper = require("../../component/layout/sidebarView/tree/sidebarTreeDataProviderPromiseWrapper");

var SidebarTooltipOptionsFactory = require("../../component/layout/sidebarView/tree/tooltip/SidebarTooltipOptionsFactory");

var CompareByProperty = require("../../common/comparator/CompareByProperty");

var CompositeComparator = require("../../common/comparator/CompositeComparator");

var calcFieldsLastComparator = require("../../component/layout/sidebarView/comparator/calcFieldsLastComparator");

var GenericMapBasedConverter = require("../../component/layout/sidebarView/converter/GenericMapBasedConverter");

var resourceConverterMap = require("../../component/layout/sidebarView/converter/converterMap/resourceConverterMap");

var constantGroupConverterMap = require("../../component/layout/sidebarView/converter/converterMap/constantGroupConverterMap");

var joinTreeConverterMap = require("../../component/layout/sidebarView/converter/converterMap/joinTreeConverterMap");

var baseResourceWithoutChildrenConverterMap = require("../../component/layout/sidebarView/converter/converterMap/baseResourceWithoutChildrenConverterMap");

var TreeItemIsDerivedTableProcessor = require("../../component/layout/sidebarView/converter/processor/TreeItemIsDerivedTableProcessor");

var CompositeResourceConverter = require("../../component/layout/sidebarView/converter/CompositeResourceConverter");

var treeItemCSSConverter = require("../../component/layout/sidebarView/converter/treeItemCSSConverter");

var treeItemIsNodeProcessor = require("../../component/layout/sidebarView/converter/processor/treeItemIsNodeProcessor");

var TreeItemLabelProcessor = require("../../component/layout/sidebarView/converter/processor/TreeItemLabelProcessor");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createDesignerToClassNameMap() {
  var designerToClassNameMap = {};
  designerToClassNameMap[canvasViewDesignersEnum.METADATA_DESIGNER] = 'jr-mDomain-modeManage';
  designerToClassNameMap[canvasViewDesignersEnum.JOINS_DESIGNER] = 'jr-mDomain-modeJoins';
  designerToClassNameMap[canvasViewDesignersEnum.PRESENTATION_DESIGNER] = 'jr-mDomain-modePresentation';
  designerToClassNameMap[canvasViewDesignersEnum.OPTIONS_DESIGNER] = 'jr-mDomain-modeOptions';
  designerToClassNameMap[canvasViewDesignersEnum.SECURITY_DESIGNER] = 'jr-mDomain-modeSecurity';
  designerToClassNameMap[canvasViewDesignersEnum.FILTERS_DESIGNER] = 'jr-mDomain-modePrefilters';
  return designerToClassNameMap;
}

function createCommonModules(context, options) {
  context.register('sidebarTreeFactory', sidebarTreeFactory);
  context.register('sidebarTreeDataProviderPromiseWrapper', sidebarTreeDataProviderPromiseWrapper);
  context.register('sidebarTooltipOptionsFactory', new SidebarTooltipOptionsFactory({
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    clientResourcePropertiesService: context.get('clientResourcePropertiesService')
  }));
  context.register('onChangeStateSearchStrategy', onChangeStateSearchStrategy);
  context.register('onChangeStateSidebarSearchStrategy', onChangeStateSidebarSearchStrategy);
  var treeItemLabelProcessor = new TreeItemLabelProcessor({
    clientDataSourceGroupService: context.get('clientDataSourceGroupService')
  });
  context.register('treeItemLabelProcessor', treeItemLabelProcessor);
  context.register('js-sdk/src/commonSidebarTreeNodeConverter', new CompositeResourceConverter([treeItemCSSConverter, treeItemIsNodeProcessor]).convert);
  context.register('comparatorByLabel', new CompareByProperty({
    property: 'label'
  }).compare);
  context.register('comparatorByName', new CompareByProperty({
    property: 'name'
  }).compare);
  context.register('constantGroupMapBasedConverter', new GenericMapBasedConverter({
    converterMap: constantGroupConverterMap
  }));
  context.register('resourceMapBasedConverter', new GenericMapBasedConverter({
    converterMap: resourceConverterMap
  }));
  context.register('joinTreesMapBasedConverter', new GenericMapBasedConverter({
    converterMap: joinTreeConverterMap
  }));
  context.register('dataSourceComparator', new CompositeComparator({
    comparators: [calcFieldsLastComparator, context.get('comparatorByLabel')]
  }).compare);
  context.register('baseTreeResourceConverter', new GenericMapBasedConverter({
    converterMap: baseResourceWithoutChildrenConverterMap
  }).convert);
  context.register('treeItemIsDerivedTableProcessor', new TreeItemIsDerivedTableProcessor({
    domainSchemaService: context.get('domainSchemaServiceReadOnlyFacade')
  }));
  context.register('showDefaultSchemaInSidebarPredicate', showDefaultSchemaInSidebarPredicateAdapter(showDefaultSchemaPredicate));
  context.register('calcFieldContextFactory', new CalcFieldContextFactory({
    clientDomainSchemaCalcFieldsService: context.get('clientDomainSchemaCalcFieldsService')
  }));
}

function createDesignersEventBuses(context, options) {
  metadataDesignerEventBusContextConfiguration(context, options);
  joinsDesignerEventBusContextConfiguration(context, options);
  filtersDesignerEventBusContextConfiguration(context, options);
  presentationDesignerEventBusContextConfiguration(context, options);
}

function createDesignersServices(context, options) {
  metadataDesignerServiceContextConfiguration(context, options);
  joinsDesignerServiceContextConfiguration(context, options);
  filtersDesignerServiceContextConfiguration(context, options);
  presentationDesignerServiceContextConfiguration(context, options);
}

function createDesignersViewModels(context, options) {
  metadataDesignerViewModelContextConfiguration(context, options);
  joinsDesignerViewModelContextConfiguration(context, options);
  filtersDesignerViewModelContextConfiguration(context, options);
  presentationDesignerViewModelContextConfiguration(context, options);
}

function createDesignersSidebars(context, options) {
  sidebarViewContextMenuOptionsContextConfiguration(context, options);
  metadataDesignerSidebarContextConfiguration(context, options);
  joinsDesignerSidebarContextConfiguration(context, options);
  filtersDesignerSidebarContextConfiguration(context, options);
  presentationDesignerSidebarContextConfiguration(context, options);
  sidebarViewContextConfiguration(context, options);
}

function createDesignerCanvases(context, options) {
  metadataDesignerContextConfiguration(context, options);
  joinsDesignerContextConfiguration(context, options);
  filtersDesignerContextConfiguration(context, options);
  presentationDesignerContextConfiguration(context, options);
}

function createDialogDesigners(context, options) {
  createCalculatedFieldsDesigner(context, options);
  createDerivedTablesDesigner(context, options);
}

function createSidebarLessDesigners(context, options) {
  createOptionsDesigner(context, options);
  createSecurityDesigner(context, options);
}

function createDesignersWithSidebars(context, options) {
  createDesignersEventBuses(context, options);
  createDesignersServices(context, options);
  createDesignersViewModels(context, options);
  createDesignersSidebars(context, options);
  createDesignerCanvases(context, options);
}

function createCanvas(context, options) {
  context.register('canvasViewStore', new CanvasViewStore());
  context.register('canvasViewController', new CanvasViewController({
    store: context.get('canvasViewStore'),
    designerToClassNameMap: createDesignerToClassNameMap(),
    storeChangeEventBus: context.get('storeChangeEventBus')
  }));
  context.register('canvasVueConfig', canvasVueConfigFactory.create({
    data: context.get('canvasViewStore').attributes,
    metadataDesigner: Vue.extend(context.get('metadataDesignerVueConfig')),
    joinsDesigner: Vue.extend(context.get('joinsDesignerVueConfig')),
    filtersDesigner: Vue.extend(context.get('filtersDesignerVueConfig')),
    presentationDesigner: Vue.extend(context.get('presentationDesignerVueConfig')),
    optionsDesigner: Vue.extend(context.get('optionsDesignerVueConfig')),
    securityDesigner: Vue.extend(context.get('securityDesignerVueConfig'))
  }));
}

module.exports = function (context, options) {
  createCommonModules(context, options);
  createDesignersWithSidebars(context, options);
  createDialogDesigners(context, options);
  createSidebarLessDesigners(context, options);
  createCanvas(context, options);
};

});