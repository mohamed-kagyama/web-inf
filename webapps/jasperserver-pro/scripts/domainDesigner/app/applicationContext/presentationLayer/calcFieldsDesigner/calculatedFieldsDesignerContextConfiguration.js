define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var Dialog = require("runtime_dependencies/js-sdk/src/components/dialog/Dialog");

var Validation = require("../../../common/component/validation/Validation");

var InputErrorMessageWithVisibility = require("../../../common/component/inputErrorMessage/InputErrorMessageWithVisibility");

var CalculatedFieldsDesignerValidator = require("../../../component/designer/calculatedFieldsDesigner/validator/CalculatedFieldsDesignerValidator");

var CalculatedFieldsDesignerStore = require("../../../component/designer/calculatedFieldsDesigner/store/CalculatedFieldsDesignerStore");

var eventBusFactory = require("../../../../util/eventBusFactory");

var CalculatedFieldsDesignerViewStateModelService = require("../../../model/service/CalculatedFieldsDesignerViewStateModelService");

var calcFieldsDesignerViewFactory = require("../../../component/designer/calculatedFieldsDesigner/component/main/factory/calcFieldsDesignerViewFactory");

var CalculatedFieldsDesignerController = require("../../../component/designer/calculatedFieldsDesigner/controller/CalculatedFieldsDesignerController");

var CalculatedFieldsAvailableItemsTreeController = require("../../../component/designer/calculatedFieldsDesigner/controller/CalculatedFieldsAvailableItemsTreeController");

var calculatedFieldsDesignerOperatorsViewConfig = require("../../../component/designer/calculatedFieldsDesigner/component/operators/calculatedFieldsDesignerOperatorsViewConfig");

var calculatedFieldsDesignerInitialExpandedNodesProvider = require("../../../component/designer/calculatedFieldsDesigner/provider/calculatedFieldsDesignerInitialExpandedNodesProvider");

var ActionButton = require("../../../common/component/actionButton/ActionButton");

var CalculatedFieldsDesignerTextAreaExpressionEditorViewConfig = require("../../../component/designer/calculatedFieldsDesigner/component/expressionEditor/TextAreaExpressionEditor");

var searchVueConfigFactory = require("../../../common/component/search/factory/searchVueConfigFactory");

var addAutomationDataNameAttributeMixinFactory = require("../../../common/factory/addAutomationDataNameAttributeMixinFactory");

var automationDataNameAttributesEnum = require("../../../common/enum/automationDataNameAttributesEnum");

var ConfirmationDialogView = require("../../../component/dialog/confirmation/view/ConfirmationDialogView");

var i18n = require("bundle!CommonBundle");

var viewAsVueComponentFactory = require("../../../common/vue/factory/viewAsVueComponentFactory");

var emptyProfileAttributeValuesToPlaceholderLabelConverter = require("../../../common/converter/emptyProfileAttributeValuesToPlaceholderLabelConverter");

var DoNotSkipChildrenConversion = require("../../../component/layout/sidebarView/predicate/DoNotSkipChildrenConversion");

var TreeItemExpandedProcessor = require("../../../component/layout/sidebarView/converter/processor/TreeItemExpandedProcessor");

var SidebarTreeExpandCollapsePlugin = require("../../../component/layout/sidebarView/tree/plugin/SidebarTreeExpandCollapsePlugin");

var CalculatedFieldsDesignerAvailableItemsTreeExpandedNodesProvider = require("../../../component/designer/calculatedFieldsDesigner/provider/CalculatedFieldsDesignerAvailableItemsTreeExpandedNodesProvider");

var CalcFieldsDesignerTreeSelectionController = require("../../../component/designer/calculatedFieldsDesigner/controller/CalcFieldsDesignerTreeSelectionController");

var CalcFieldsDesignerSearchKeywordProvider = require("../../../component/designer/calculatedFieldsDesigner/controller/CalcFieldsDesignerSearchKeywordProvider");

var calcFieldsAddVariableNameProcessor = require("../../../component/designer/calculatedFieldsDesigner/component/availableItemsTree/converter/calcFieldsAddVariableNameProcessor");

var calcFieldsAvailableItemsTreeItemResourceProcessor = require("../../../component/designer/calculatedFieldsDesigner/component/availableItemsTree/converter/calcFieldsAvailableItemsTreeItemResourceProcessor");

var calcFieldsAvailableItemsTreeOptionsFactory = require("../../../component/designer/calculatedFieldsDesigner/component/availableItemsTree/factory/calcFieldsAvailableItemsTreeOptionsFactory");

var TreeListDataProvider = require("../../../component/layout/sidebarView/tree/TreeListDataProvider");

var uriUtil = require("../../../util/uriUtil");

var AutoIdGenerationStrategyBasedOnEntityId = require("../../../util/AutoIdGenerationStrategyBasedOnEntityId");

var NestedTreeModel = require("../../../../util/nestedTreeModel/NestedTreeModel");

var SchemaToCalcFieldsDesignerAvailableItemsTreeConverter = require("../../../component/designer/calculatedFieldsDesigner/component/availableItemsTree/converter/SchemaToCalcFieldsDesignerAvailableItemsTreeConverter");

var CompositeConcatenatingConverter = require("../../../component/layout/sidebarView/converter/CompositeConcatenatingConverter");

var JoinTreesTreeConverter = require("../../../component/layout/sidebarView/converter/JoinTreesTreeConverter");

var doNotAcceptTableReferencesUsedInJoins = require("../../../component/designer/joinsDesigner/predicate/doNotAcceptTableReferencesUsedInJoins");

var CompositePredicate = require("../../../../util/predicate/CompositePredicate");

var DataSourceTreeConverter = require("../../../component/layout/sidebarView/converter/DataSourceTreeConverter");

var treeItemValueProcessor = require("../../../component/layout/sidebarView/converter/processor/treeItemValueProcessor");

var resourcesTreeItemIdProcessor = require("../../../component/layout/sidebarView/converter/processor/resourcesTreeItemIdProcessor");

var CompositeResourceConverter = require("../../../component/layout/sidebarView/converter/CompositeResourceConverter");

var doNotAcceptEmptyElementsIfResourceDoNotMatch = require("../../../component/layout/sidebarView/predicate/doNotAcceptEmptyElementsIfResourceDoNotMatch");

var ConstantGroupTreeConverter = require("../../../component/layout/sidebarView/converter/ConstantGroupTreeConverter");

var matchByCalcFieldContext = require("../../../component/designer/calculatedFieldsDesigner/component/availableItemsTree/predicate/matchByCalcFieldContext");

var MatchBySearchKeyword = require("../../../component/layout/sidebarView/predicate/MatchBySearchKeyword");

var getDefaultResourceSearchPropertyProvider = require("../../../component/layout/sidebarView/provider/getDefaultResourceSearchPropertyProvider");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createCalculatedFieldsDesignerModels(context, options) {
  context.register('calculatedFieldsDesignerEventBus', eventBusFactory.create());
  context.register('calculatedFieldsDesignerViewStateModelService', new CalculatedFieldsDesignerViewStateModelService({
    viewStateModel: context.get('viewStateModelReadOnlyFacade')
  }));
  context.register('calculatedFieldsDesignerStore', new CalculatedFieldsDesignerStore());
}

function createAvailableFieldsTreeDataProvider(context, options) {
  context.register('calcFieldsDesignerSearchKeywordProvider', new CalcFieldsDesignerSearchKeywordProvider({
    store: context.get('calculatedFieldsDesignerStore')
  }));
  context.register('calculatedFieldsDesignerAvailableItemsTreeExpandedNodesProvider', new CalculatedFieldsDesignerAvailableItemsTreeExpandedNodesProvider({
    store: context.get('calculatedFieldsDesignerStore')
  }));
  var calcFieldsAvailableItemsTreeMatchBySearchKeyword = new MatchBySearchKeyword({
    getSearchProperty: getDefaultResourceSearchPropertyProvider,
    searchKeywordProvider: context.get('calcFieldsDesignerSearchKeywordProvider')
  });
  var resourceJsonMatch = new CompositePredicate([matchByCalcFieldContext, doNotAcceptEmptyElementsIfResourceDoNotMatch]).match;
  context.register('calculatedFieldsDesignerDoNotSkipChildrenConversion', new DoNotSkipChildrenConversion({
    isExpanded: context.get('calculatedFieldsDesignerAvailableItemsTreeExpandedNodesProvider').isNodeExpanded,
    searchKeywordProvider: context.get('calcFieldsDesignerSearchKeywordProvider')
  }).match);
  var treeItemExpandedProcessor = new TreeItemExpandedProcessor({
    isExpanded: context.get('calculatedFieldsDesignerAvailableItemsTreeExpandedNodesProvider').isNodeExpanded,
    isCollapsed: context.get('calculatedFieldsDesignerAvailableItemsTreeExpandedNodesProvider').isNodeCollapsed,
    searchKeywordProvider: context.get('calcFieldsDesignerSearchKeywordProvider')
  });
  var initialTreeItemConverter = new CompositeResourceConverter([context.get('baseTreeResourceConverter'), resourcesTreeItemIdProcessor, calcFieldsAddVariableNameProcessor]).convert;
  var finalTreeItemConverter = new CompositeResourceConverter([treeItemExpandedProcessor.process, calcFieldsAvailableItemsTreeItemResourceProcessor, context.get('js-sdk/src/commonSidebarTreeNodeConverter'), context.get('treeItemLabelProcessor').getNameAsLabel, treeItemValueProcessor]).convert;
  var constantGroupTreeConverter = new ConstantGroupTreeConverter({
    resourceMatch: true,
    resourceOrChildrenMatch: calcFieldsAvailableItemsTreeMatchBySearchKeyword.match,
    resourceJsonMatch: resourceJsonMatch,
    convertChildrenMatch: context.get('calculatedFieldsDesignerDoNotSkipChildrenConversion'),
    convertResourceNoChildren: new CompositeResourceConverter([initialTreeItemConverter, finalTreeItemConverter]),
    convertResource: context.get('constantGroupMapBasedConverter'),
    comparator: context.get('comparatorByLabel')
  });
  var resourcesTreeConverter = new DataSourceTreeConverter({
    resourceMatch: new CompositePredicate([doNotAcceptTableReferencesUsedInJoins]).match,
    resourceOrChildrenMatch: calcFieldsAvailableItemsTreeMatchBySearchKeyword.match,
    resourceJsonMatch: resourceJsonMatch,
    convertChildrenMatch: context.get('calculatedFieldsDesignerDoNotSkipChildrenConversion'),
    convertResourceNoChildren: new CompositeResourceConverter([initialTreeItemConverter, finalTreeItemConverter]),
    convertResource: context.get('resourceMapBasedConverter'),
    comparator: context.get('dataSourceComparator'),
    schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec: context.get('schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec'),
    postProcess: emptyProfileAttributeValuesToPlaceholderLabelConverter
  });
  var dataIslandsTreeConverter = new JoinTreesTreeConverter({
    resourceMatch: true,
    resourceOrChildrenMatch: calcFieldsAvailableItemsTreeMatchBySearchKeyword.match,
    resourceJsonMatch: resourceJsonMatch,
    convertChildrenMatch: context.get('calculatedFieldsDesignerDoNotSkipChildrenConversion'),
    convertResourceNoChildren: new CompositeResourceConverter([initialTreeItemConverter, finalTreeItemConverter]),
    convertResource: context.get('joinTreesMapBasedConverter'),
    comparator: context.get('dataSourceComparator')
  });
  context.register('calcFieldsAvailableItemsTreeConverter', new SchemaToCalcFieldsDesignerAvailableItemsTreeConverter({
    clientDomainSchemaCalcFieldsService: context.get('clientDomainSchemaCalcFieldsService'),
    calculatedFieldsDesignerViewStateModelService: context.get('calculatedFieldsDesignerViewStateModelService'),
    converter: new CompositeConcatenatingConverter({
      converters: [constantGroupTreeConverter, resourcesTreeConverter, dataIslandsTreeConverter]
    })
  }));
  context.register('calcFieldsAvailableItemsNestedTreeModel', new NestedTreeModel([], {
    idGenerationStrategy: new AutoIdGenerationStrategyBasedOnEntityId(),
    pathSeparator: uriUtil.getRootUri(),
    nodeIdAttribute: 'resourceId'
  }));
  context.register('calcFieldsAvailableItemsTreeDataProvider', new TreeListDataProvider({
    schemaToNestedTreeModelConverter: context.get('calcFieldsAvailableItemsTreeConverter'),
    nestedTreeModel: context.get('calcFieldsAvailableItemsNestedTreeModel')
  }));
}

function createCalculatedFieldsDesignerAvailableItemsTree(context, options) {
  var sidebarTreeDataProviderPromiseWrapper = context.get('sidebarTreeDataProviderPromiseWrapper');
  var treeOptions = calcFieldsAvailableItemsTreeOptionsFactory.getTreeOptions({
    listItemHeight: options.list.listItemHeight,
    dataProvider: sidebarTreeDataProviderPromiseWrapper(context.get('calcFieldsAvailableItemsTreeDataProvider').getData)
  });
  context.register('calcFieldsAvailableItemsTree', context.get('sidebarTreeFactory').create(treeOptions));
}

function createCalculatedFieldsDesignerViews(context, options) {
  context.register('saveConfirmationDialog', new ConfirmationDialogView({
    yesLabel: i18n['button.ok'],
    noLabel: i18n['button.no'],
    dataNameAttrs: automationDataNameAttributesEnum.calculatedFieldsDesigner.confirmationDialog
  }));
  var AvailableItemsTree = viewAsVueComponentFactory.create({
    view: context.get('calcFieldsAvailableItemsTree')
  });
  var calculatedFieldsDesignerSearchViewConfig = searchVueConfigFactory.create({
    eventBus: context.get('calculatedFieldsDesignerEventBus')
  });
  var calculatedFieldsDesignerSearchViewConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: calculatedFieldsDesignerSearchViewConfig,
    dataNames: automationDataNameAttributesEnum.calculatedFieldsDesigner.search
  });
  var calculatedFieldsDesignerTextAreaExpressionEditorViewConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: CalculatedFieldsDesignerTextAreaExpressionEditorViewConfig,
    dataNames: automationDataNameAttributesEnum.calculatedFieldsDesigner.expressionEditor
  });
  var calculatedFieldsDesignerOperatorsViewConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: calculatedFieldsDesignerOperatorsViewConfig,
    dataNames: automationDataNameAttributesEnum.calculatedFieldsDesigner.operators
  });
  var calculatedFieldsDesignerViewConfig = calcFieldsDesignerViewFactory.create({
    actionButton: ActionButton,
    Validation: Validation,
    InputErrorMessage: InputErrorMessageWithVisibility,
    AvailableItemsTree: AvailableItemsTree,
    operatorsViewConfig: Vue.extend(calculatedFieldsDesignerOperatorsViewConfigWithDataNameAttribute),
    searchViewConfig: Vue.extend(calculatedFieldsDesignerSearchViewConfigWithDataNameAttribute),
    textAreaExpressionEditorViewConfig: Vue.extend(calculatedFieldsDesignerTextAreaExpressionEditorViewConfigWithDataNameAttribute)
  });
  var CalculatedFieldsDesignerView = Vue.extend(addAutomationDataNameAttributeMixinFactory.create({
    config: calculatedFieldsDesignerViewConfig,
    dataNames: automationDataNameAttributesEnum.calculatedFieldsDesigner.dialog
  }));
  context.register('calculatedFieldsDesignerView', new CalculatedFieldsDesignerView({
    calculatedFieldsDesignerEventBus: context.get('calculatedFieldsDesignerEventBus'),
    data: context.get('calculatedFieldsDesignerStore').attributes
  }));
  context.register('calculatedFieldsDesignerDialog', new Dialog({
    zIndex: options.calculatedFieldsDesigner.zIndex,
    el: context.get('calculatedFieldsDesignerView').$mount().$el
  }));
}

function createCalculatedFieldsDesignerControllers(context, options) {
  context.register('calculatedFieldsDesignerValidator', new CalculatedFieldsDesignerValidator({
    validationService: context.get('validationServiceWrappedWithDoNotHandle400ErrorsNotification'),
    store: context.get('calculatedFieldsDesignerStore'),
    calculatedFieldsDesignerViewStateModelService: context.get('calculatedFieldsDesignerViewStateModelService'),
    clientDomainSchemaCalcFieldsService: context.get('clientDomainSchemaCalcFieldsService'),
    domainSchemaGranularSpecs: context.get('domainSchemaGranularSpecs')
  }));
  context.register('calculatedFieldsDesignerController', new CalculatedFieldsDesignerController({
    storeChangeEventBus: context.get('storeChangeEventBus'),
    saveConfirmationDialog: context.get('saveConfirmationDialog'),
    dialog: context.get('calculatedFieldsDesignerDialog'),
    calculatedFieldsDesignerValidator: context.get('calculatedFieldsDesignerValidator'),
    store: context.get('calculatedFieldsDesignerStore'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    calculatedFieldsDesignerEventBus: context.get('calculatedFieldsDesignerEventBus'),
    calculatedFieldsDesignerViewStateModelService: context.get('calculatedFieldsDesignerViewStateModelService'),
    clientDomainSchemaCalcFieldsService: context.get('clientDomainSchemaCalcFieldsService'),
    expressionBulkUpdateService: context.get('expressionBulkUpdateService')
  }));
  context.register('calculatedFieldsAvailableItemsTreeController', new CalculatedFieldsAvailableItemsTreeController({
    treeDataProvider: context.get('calcFieldsAvailableItemsTreeDataProvider'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    calculatedFieldsDesignerViewStateModelService: context.get('calculatedFieldsDesignerViewStateModelService'),
    calculatedFieldsDesignerInitialExpandedNodesProvider: calculatedFieldsDesignerInitialExpandedNodesProvider,
    tree: context.get('calcFieldsAvailableItemsTree'),
    calculatedFieldsDesignerEventBus: context.get('calculatedFieldsDesignerEventBus'),
    store: context.get('calculatedFieldsDesignerStore')
  }));
  context.register('calcFieldsDesignerTreeSelectionController', new CalcFieldsDesignerTreeSelectionController({
    calculatedFieldsDesignerEventBus: context.get('calculatedFieldsDesignerEventBus'),
    tree: context.get('calcFieldsAvailableItemsTree'),
    nestedTreeModel: context.get('calcFieldsAvailableItemsNestedTreeModel')
  }));
  context.register('calculatedFieldsDesignerSidebarTreeExpandCollapsePlugin', new SidebarTreeExpandCollapsePlugin({
    eventBus: context.get('calculatedFieldsDesignerEventBus'),
    el: context.get('calcFieldsAvailableItemsTree').$el,
    expandedNodesProvider: context.get('calculatedFieldsDesignerAvailableItemsTreeExpandedNodesProvider'),
    searchKeywordProvider: context.get('calcFieldsDesignerSearchKeywordProvider'),
    expandNodeEvent: 'availableItemsTree:expand',
    collapseNodeEvent: 'availableItemsTree:collapse'
  }));
}

module.exports = function (context, options) {
  createCalculatedFieldsDesignerModels(context, options);
  createAvailableFieldsTreeDataProvider(context, options);
  createCalculatedFieldsDesignerAvailableItemsTree(context, options);
  createCalculatedFieldsDesignerViews(context, options);
  createCalculatedFieldsDesignerControllers(context, options);
};

});