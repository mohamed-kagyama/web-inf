define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var Vue = require('vue');

var SimpleCache = require("../../../../util/cache/SimpleCache");

var applicationStateEventsEnum = require("../../../dispatcher/enum/applicationStateEventsEnum");

var presentationDesignerFetchTreeEventsBlacklistEnum = require("../../../component/designer/presentationDesigner/sidebar/enum/presentationDesignerFetchTreeEventsBlacklistEnum");

var genericTypeToMasksEnum = require("../../../model/enum/genericTypeToMasksEnum");

var DropAcceptedByDropZoneResourcesSpecification = require("../../../component/designer/presentationDesigner/droppable/canvas/specification/DropAcceptedByDropZoneResourcesSpecification");

var DropDataIslandsAmongDataIslandsSpecification = require("../../../component/designer/presentationDesigner/droppable/canvas/specification/DropDataIslandsAmongDataIslandsSpecification");

var DropSidebarResourcesToCreateNewDataIslandsSpecification = require("../../../component/designer/presentationDesigner/droppable/canvas/specification/DropSidebarResourcesToCreateNewDataIslandsSpecification");

var DropSidebarResourcesToAddPresentationItemsSpecification = require("../../../component/designer/presentationDesigner/droppable/canvas/specification/DropSidebarResourcesToAddPresentationItemsSpecification");

var DropSetsAndFieldsAmongSetsAndFieldsSpecification = require("../../../component/designer/presentationDesigner/droppable/canvas/specification/DropSetsAndFieldsAmongSetsAndFieldsSpecification");

var DropItemsIntoDropZoneSpecification = require("../../../component/designer/presentationDesigner/droppable/canvas/specification/DropItemsIntoDropZoneSpecification");

var DropConstantCalcFieldsSpecification = require("../../../component/designer/presentationDesigner/droppable/canvas/specification/DropConstantCalcFieldsSpecification");

var PresentationDesignerItemReferencePathProvider = require("../../../component/designer/presentationDesigner/provider/PresentationDesignerItemReferencePathProvider");

var PresentationDesignerLastRowHeightConverter = require("../../../component/designer/presentationDesigner/converter/PresentationDesignerLastRowHeightConverter");

var PresentationDesignerSchemaToViewModelConverter = require("../../../component/designer/presentationDesigner/converter/PresentationDesignerSchemaToViewModelConverter");

var PresentationDesignerViewModelToStoreConverter = require("../../../component/designer/presentationDesigner/converter/PresentationDesignerViewModelToStoreConverter");

var PresentationDesignerViewModelToVisibleDataConverter = require("../../../component/designer/presentationDesigner/converter/PresentationDesignerViewModelToVisibleDataConverter");

var PresentationDesignerVisibleDataToVisibleDataWithDropZonesConverter = require("../../../component/designer/presentationDesigner/converter/PresentationDesignerVisibleDataToVisibleDataWithDropZonesConverter");

var PresentationDesignerVisibleDataToVisibleDataWithSourcePathConverter = require("../../../component/designer/presentationDesigner/converter/PresentationDesignerVisibleDataToVisibleDataWithSourcePathConverter");

var presentationDesignerDropZoneActivatorFactory = require("../../../component/designer/presentationDesigner/droppable/canvas/factory/presentationDesignerDropZoneActivatorFactory");

var canvasMenuOptionsFactory = require("../../../component/designer/presentationDesigner/factory/canvasMenuOptionsFactory");

var FieldAndSetNameValidator = require("../../../component/designer/presentationDesigner/model/validation/validationRules/FieldAndSetNameValidator");

var DataIslandNameValidator = require("../../../component/designer/presentationDesigner/model/validation/validationRules/DataIslandNameValidator");

var emptyValidator = require("../../../component/designer/presentationDesigner/model/validation/validationRules/emptyValidator");

var bundleKeyValidator = require("../../../component/designer/presentationDesigner/model/validation/validationRules/bundleKeyValidator");

var escapeJsonValidator = require("../../../component/designer/presentationDesigner/model/validation/validationRules/escapeJsonValidator");

var idValidator = require("../../../component/designer/presentationDesigner/model/validation/validationRules/idValidator");

var startsFromNumberValidator = require("../../../component/designer/presentationDesigner/model/validation/validationRules/startsFromNumberValidator");

var SidebarTreeController = require("../../../component/layout/sidebarView/controller/SidebarTreeController");

var SearchComponentController = require("../../../common/component/search/controller/SearchComponentController");

var ConstantGroupTreeConverter = require("../../../component/layout/sidebarView/converter/ConstantGroupTreeConverter");

var PresentationDesignerCanvasMenuController = require("../../../component/designer/presentationDesigner/controller/PresentationDesignerCanvasMenuController");

var JoinTreesTreeConverter = require("../../../component/layout/sidebarView/converter/JoinTreesTreeConverter");

var DataSourceTreeConverter = require("../../../component/layout/sidebarView/converter/DataSourceTreeConverter");

var CompositeResourceConverter = require("../../../component/layout/sidebarView/converter/CompositeResourceConverter");

var addAutomationDataNameAttributeMixinFactory = require("../../../common/factory/addAutomationDataNameAttributeMixinFactory");

var automationDataNameAttributesEnum = require("../../../common/enum/automationDataNameAttributesEnum");

var PresentationDesignerDataIslandController = require("../../../component/designer/presentationDesigner/controller/PresentationDesignerDataIslandsController");

var PresentationDesignerSetsController = require("../../../component/designer/presentationDesigner/controller/PresentationDesignerSetsController");

var PresentationDesignerFieldsController = require("../../../component/designer/presentationDesigner/controller/PresentationDesignerFieldsController");

var PresentationDesignerEditPropertiesController = require("../../../component/designer/presentationDesigner/controller/PresentationDesignerEditPropertiesController");

var PresentationDesignerItemsSelectionController = require("../../../component/designer/presentationDesigner/controller/PresentationDesignerItemsSelectionController");

var PresentationItemsRangeSelectionProvider = require("../../../component/designer/presentationDesigner/draggable/canvas/provider/PresentationItemsRangeSelectionProvider");

var PresentationFieldsValidationRulesFactory = require("../../../component/designer/presentationDesigner/model/validation/PresentationFieldsValidationRulesFactory");

var PresentationItemsDragController = require("../../../component/designer/presentationDesigner/draggable/canvas/controller/PresentationItemsDragController");

var PresentationCanvasDropZoneActivatorController = require("../../../component/designer/presentationDesigner/droppable/canvas/controller/PresentationCanvasDropZoneActivatorController");

var PresentationCanvasDropItemsController = require("../../../component/designer/presentationDesigner/droppable/canvas/controller/PresentationCanvasDropItemsController");

var PresentationDesignerLastRowDropZonePropertiesFactory = require("../../../component/designer/presentationDesigner/droppable/canvas/factory/PresentationDesignerLastRowDropZonePropertiesFactory");

var PresentationDesignerDropStrategyFactory = require("../../../component/designer/presentationDesigner/droppable/factory/PresentationDesignerDropStrategyFactory");

var PresentationSidebarToCanvasDropStrategyFactory = require("../../../component/designer/presentationDesigner/droppable/canvas/factory/PresentationSidebarToCanvasDropStrategyFactory");

var PresentationCanvasDropStrategyFactory = require("../../../component/designer/presentationDesigner/droppable/canvas/factory/PresentationCanvasDropStrategyFactory");

var PresentationCanvasDropDataIslandsStrategy = require("../../../component/designer/presentationDesigner/droppable/canvas/strategy/PresentationCanvasDropDataIslandsStrategy");

var PresentationCanvasDropPresentationItemsStrategy = require("../../../component/designer/presentationDesigner/droppable/canvas/strategy/PresentationCanvasDropPresentationItemsStrategy");

var AddDataIslandsBasedOnJoinTreeToCanvasDropStrategy = require("../../../component/designer/presentationDesigner/droppable/canvas/strategy/AddDataIslandsBasedOnJoinTreeToCanvasDropStrategy");

var AddPresentationItemsBasedOnJoinTreeToCanvasDropStrategy = require("../../../component/designer/presentationDesigner/droppable/canvas/strategy/AddPresentationItemsBasedOnJoinTreeToCanvasDropStrategy");

var AddPresentationItemsBasedOnTableReferenceToCanvasDropStrategy = require("../../../component/designer/presentationDesigner/droppable/canvas/strategy/AddPresentationItemsBasedOnTableReferenceToCanvasDropStrategy");

var AddPresentationItemBasedOnConstantGroupCalcFieldToCanvasDropStrategy = require("../../../component/designer/presentationDesigner/droppable/canvas/strategy/AddPresentationItemBasedOnConstantGroupCalcFieldToCanvasDropStrategy");

var AddConstantDataIslandToCanvasDropStrategy = require("../../../component/designer/presentationDesigner/droppable/canvas/strategy/AddConstantDataIslandToCanvasDropStrategy");

var AddDataIslandsBasedOnTableReferenceToCanvasDropStrategy = require("../../../component/designer/presentationDesigner/droppable/canvas/strategy/AddDataIslandsBasedOnTableReferenceToCanvasDropStrategy");

var PresentationItemDTONameGenerator = require("../../../component/designer/presentationDesigner/factory/PresentationItemDTONameGenerator");

var presentationItemDTOProcessor = require("../../../component/designer/presentationDesigner/converter/processor/presentationItemDTOProcessor");

var presentationItemDTONameTemplateFunction = require("../../../component/designer/presentationDesigner/template/presentationItemDTONameTemplateFunction");

var OnDragStartSelectionFactory = require("../../../component/designer/presentationDesigner/draggable/factory/OnDragStartSelectionFactory");

var DraggableLabelFactory = require("../../../component/designer/presentationDesigner/draggable/factory/DraggableLabelFactory");

var DraggableDataFactory = require("../../../component/designer/presentationDesigner/draggable/factory/DraggableDataFactory");

var OnDragStartOptionsFactory = require("../../../component/designer/presentationDesigner/draggable/factory/OnDragStartOptionsFactory");

var PresentationSidebarDraggableItemsFactory = require("../../../component/designer/presentationDesigner/draggable/sidebar/factory/PresentationSidebarDraggableItemsFactory");

var PresentationCanvasDraggableItemsFactory = require("../../../component/designer/presentationDesigner/draggable/canvas/factory/PresentationCanvasDraggableItemsFactory");

var PresentationItemsSelectionAdapter = require("../../../component/designer/presentationDesigner/adapter/PresentationItemsSelectionAdapter");

var PresentationDesignerSidebarTreeSelectionPlugin = require("../../../component/designer/presentationDesigner/sidebar/plugin/PresentationDesignerSidebarTreeSelectionPlugin");

var PresentationDesignerSidebarTreeDraggablePlugin = require("../../../component/designer/presentationDesigner/sidebar/plugin/PresentationDesignerSidebarTreeDraggablePlugin");

var PresentationDesignerSidebarSelectionController = require("../../../component/designer/presentationDesigner/sidebar/controller/PresentationDesignerSidebarSelectionController");

var PresentationDesignerSidebarSingleSelectStrategy = require("../../../component/designer/presentationDesigner/sidebar/strategy/PresentationDesignerSidebarSingleSelectStrategy");

var PresentationDesignerSidebarTreeSelectionProvider = require("../../../component/designer/presentationDesigner/sidebar/provider/PresentationDesignerSidebarTreeSelectionProvider");

var PresentationSidebarItemsRangeSelectionProvider = require("../../../component/designer/presentationDesigner/draggable/sidebar/provider/PresentationSidebarItemsRangeSelectionProvider");

var PresentationDesignerSidebarActionsController = require("../../../component/designer/presentationDesigner/sidebar/controller/PresentationDesignerSidebarActionsController");

var PresentationDesignerDeleteItemsBySelectionController = require("../../../component/designer/presentationDesigner/controller/PresentationDesignerDeleteItemsBySelectionController");

var PresentationDesignerDeleteDataIslandsBySelectionStrategy = require("../../../component/designer/presentationDesigner/controller/strategy/PresentationDesignerDeleteDataIslandsBySelectionStrategy");

var PresentationDesignerDeletePresentationItemsBySelectionStrategy = require("../../../component/designer/presentationDesigner/controller/strategy/PresentationDesignerDeletePresentationItemsBySelectionStrategy");

var PresentationSidebarSelectionAdapter = require("../../../component/designer/presentationDesigner/sidebar/adapter/PresentationSidebarSelectionAdapter");

var PresentationDesignerSidebarDragController = require("../../../component/designer/presentationDesigner/draggable/sidebar/controller/PresentationDesignerSidebarDragController");

var SidebarTreeExpandCollapsePlugin = require("../../../component/layout/sidebarView/tree/plugin/SidebarTreeExpandCollapsePlugin");

var PresentationItemsContextMenu = require("../../../component/designer/presentationDesigner/view/PresentationItemsContextMenu");

var presentationItemsContextMenuOptionsFactory = require("../../../component/designer/presentationDesigner/factory/presentationItemsContextMenuOptionsFactory");

var PresentationDesignerInitialDropZoneController = require("../../../component/designer/presentationDesigner/droppable/canvas/controller/PresentationDesignerInitialDropZoneController");

var PresentationDesignerResizableCellsController = require("../../../component/designer/presentationDesigner/controller/PresentationDesignerResizableCellsController");

var PresentationDesignerSearchKeywordProvider = require("../../../component/designer/presentationDesigner/provider/PresentationDesignerSearchKeywordProvider");

var PresentationDesignerAddSetController = require("../../../component/designer/presentationDesigner/controller/PresentationDesignerAddSetController");

var ResourceIdentifierGenerator = require("../../../common/util/ResourceIdentifierGenerator");

var SequenceGenerator = require("../../../../model/util/SequenceGenerator");

var PresentationNewSetFactory = require("../../../component/designer/presentationDesigner/factory/PresentationNewSetFactory");

var newPresentationSetNameTemplate = require("text!../../../component/designer/presentationDesigner/template/newPresentationSetNameTemplate.htm");

var menuItemWithOptionsTemplate = require("text!../../../common/template/menuItemWithOptionsTemplate.htm");

var MovePresentationItemsController = require("../../../component/designer/presentationDesigner/moveItems/controller/MovePresentationItemsController");

var MovePresentationItemsEventNameFactory = require("../../../component/designer/presentationDesigner/moveItems/factory/MovePresentationItemsEventNameFactory");

var MovePresentationItemsEventOptionsFactory = require("../../../component/designer/presentationDesigner/moveItems/factory/MovePresentationItemsEventOptionsFactory");

var getMovePositionStrategyFactory = require("../../../component/designer/presentationDesigner/moveItems/factory/getMovePositionStrategyFactory");

var presentationDesignerDropZoneFactory = require("../../../component/designer/presentationDesigner/droppable/canvas/factory/presentationDesignerDropZoneFactory");

var controlsVueConfigFactory = require("../../../component/designer/presentationDesigner/component/controls/controlsVueConfigFactory");

var selectVueConfigFactory = require("../../../common/component/selectVue/selectVueConfigFactory");

var presentationDesignerVueConfigFactory = require("../../../component/designer/presentationDesigner/component/main/presentationDesignerVueConfigFactory");

var presentationDesignerTableVueConfigFactory = require("../../../component/designer/presentationDesigner/component/presentationDesignerTable/presentationDesignerTableVueConfigFactory");

var emptyDataIslandsVueConfigFactory = require("../../../component/designer/presentationDesigner/component/emptyDataIslands/emptyDataIslandsVueConfigFactory");

var treeNodeVueConfigFactory = require("../../../component/designer/presentationDesigner/component/presentationItem/treeNodeVueConfigFactory");

var droppableTreeNodeVueConfigFactory = require("../../../component/designer/presentationDesigner/component/presentationItem/droppableTreeNodeVueConfigFactory");

var headerVueConfigFactory = require("../../../component/designer/presentationDesigner/component/header/headerVueConfigFactory");

var dataIslandOrSetVueConfigFactory = require("../../../component/designer/presentationDesigner/component/dataIslandOrSet/dataIslandOrSetVueConfigFactory");

var presentationFieldVueConfigFactory = require("../../../component/designer/presentationDesigner/component/presentationField/presentationFieldVueConfigFactory");

var lastRowVueConfigFactory = require("../../../component/designer/presentationDesigner/component/lastRow/lastRowVueConfigFactory");

var presentationItemVueConfigFactory = require("../../../component/designer/presentationDesigner/component/presentationItem/presentationItemVueConfigFactory");

var staticComponentVueConfigFactory = require("../../../common/component/static/staticComponentVueConfigFactory");

var removeItemVueConfigFactory = require("../../../component/designer/presentationDesigner/component/presentationItem/removeItemVueConfigFactory");

var togglePropertiesEditorVueConfigFactory = require("../../../component/designer/presentationDesigner/component/presentationItem/togglePropertiesEditorVueConfigFactory");

var tableCellTemplate = require("text!../../../component/designer/presentationDesigner/component/table/template/tableCellTemplate.htm");

var tableTextCellTemplate = require("text!../../../component/designer/presentationDesigner/component/table/template/tableTextCellTemplate.htm");

var propertyEditorVueConfigFactory = require("../../../component/designer/presentationDesigner/component/presentationItem/propertyEditorVueConfigFactory");

var tooltipVueConfig = require("../../../common/component/tooltip/component/tooltipVueConfig");

var inputGroupTemplate = require("text!../../../component/designer/presentationDesigner/component/presentationItem/template/inputGroupTemplate.htm");

var propertyVueConfigFactory = require("../../../component/designer/presentationDesigner/component/presentationItem/propertyVueConfigFactory");

var readOnlyPropertyVueConfigFactory = require("../../../component/designer/presentationDesigner/component/presentationItem/readOnlyPropertyVueConfigFactory");

var selectPropertyVueConfigFactory = require("../../../component/designer/presentationDesigner/component/presentationField/selectPropertyVueConfigFactory");

var selectPropertyCollapsedTemplate = require("text!../../../component/designer/presentationDesigner/component/presentationField/template/selectPropertyCollapsedTemplate.htm");

var selectPropertyExpandedTemplate = require("text!../../../component/designer/presentationDesigner/component/presentationField/template/selectPropertyExpandedTemplate.htm");

var PresentationDesignerController = require("../../../component/designer/presentationDesigner/controller/PresentationDesignerController");

var virtualDataVueConfigFactory = require("../../../common/component/virtualData/virtualDataVueConfigFactory");

var presentationItemSelectionVueMixinFactory = require("../../../component/designer/presentationDesigner/component/mixin/presentationItemSelectionVueMixinFactory");

var presentationItemContextMenuVueMixinFactory = require("../../../component/designer/presentationDesigner/component/mixin/presentationItemContextMenuVueMixinFactory");

var presentationItemSelectionPropertiesVueMixin = require("../../../component/designer/presentationDesigner/component/mixin/presentationItemSelectionPropertiesVueMixin");

var columnWidthComputedMixin = require("../../../component/designer/presentationDesigner/component/mixin/columnWidthComputedMixin");

var presentationItemDataNameComputedMixin = require("../../../component/designer/presentationDesigner/component/presentationItem/mixin/presentationItemDataNameComputedMixin");

var resizerDirectiveFactory = require("../../../common/vue/directive/resizer/resizerDirectiveFactory");

var resizableMixinFactory = require("../../../component/designer/presentationDesigner/component/mixin/resizableMixinFactory");

var dropZoneVueConfigFactory = require("../../../component/designer/presentationDesigner/droppable/canvas/component/dropZone/dropZoneVueConfigFactory");

var dropZoneActivatorVueConfigFactory = require("../../../component/designer/presentationDesigner/droppable/canvas/component/dropZoneActivator/dropZoneActivatorVueConfigFactory");

var presentationItemDraggableVueMixinFactory = require("../../../component/designer/presentationDesigner/draggable/canvas/mixin/presentationItemDraggableVueMixinFactory");

var searchVueConfigFactory = require("../../../common/component/search/factory/searchVueConfigFactory");

var clickMenuDirectiveFactory = require("../../../common/vue/directive/clickMenuDirectiveFactory");

var ClickMenuWithEventsRetrigger = require("../../../common/menu/ClickMenuWithEventsRetrigger");

var schemaEntityToPresentationItemConverterMap = require("../../../component/designer/presentationDesigner/converter/converterMap/schemaEntityToPresentationItemConverterMap");

var constantGroupEntityToPresentationItemConverterMap = require("../../../component/designer/presentationDesigner/converter/converterMap/constantGroupEntityToPresentationItemConverterMap");

var GenericMapBasedConverter = require("../../../component/layout/sidebarView/converter/GenericMapBasedConverter");

var PresentationItemsGroupedByEntityToDataIslandsWithPresentationItemsConverter = require("../../../component/designer/presentationDesigner/converter/PresentationItemsGroupedByEntityToDataIslandsWithPresentationItemsConverter");

var PresentationSidebarJoinTreeResourcesToPresentationItemsGroupedByJoinTreeConverter = require("../../../component/designer/presentationDesigner/converter/PresentationSidebarJoinTreeResourcesToPresentationItemsGroupedByJoinTreeConverter");

var presentationItemsGroupedByEntityToPresentationItemsWithParentIdConverter = require("../../../component/designer/presentationDesigner/converter/presentationItemsGroupedByEntityToPresentationItemsWithParentIdConverter");

var PresentationSidebarConstantGroupToPresentationItemsDTOHierarchyConverter = require("../../../component/designer/presentationDesigner/converter/PresentationSidebarConstantGroupToPresentationItemsDTOHierarchyConverter");

var PresentationItemUniqueNameConverter = require("../../../component/designer/presentationDesigner/converter/PresentationItemUniqueNameConverter");

var presentationItemSourceJoinTreeIdConverter = require("../../../component/designer/presentationDesigner/converter/presentationItemSourceJoinTreeIdConverter");

var presentationItemBasedOnConstantGroupCalcFieldParentIdConverter = require("../../../component/designer/presentationDesigner/converter/presentationItemBasedOnConstantGroupCalcFieldParentIdConverter");

var ConvertResourceNoChildrenForTableReferenceBasedDataIslandsConverter = require("../../../component/designer/presentationDesigner/converter/ConvertResourceNoChildrenForTableReferenceBasedDataIslandsConverter");

var PresentationSidebarDataSourceResourcesToPresentationItemsGroupedByTableReferenceConverter = require("../../../component/designer/presentationDesigner/converter/PresentationSidebarDataSourceResourcesToPresentationItemsGroupedByTableReferenceConverter");

var convertResourceInHierarchy = require("../../../component/designer/presentationDesigner/converter/predicate/convertResourceInHierarchy");

var acceptResourcesWhichAreInDroppableItemsPath = require("../../../component/designer/presentationDesigner/converter/predicate/acceptResourcesWhichAreInDroppableItemsPath");

var includeTableInResourcePathPredicateWrapper = require("../../../component/designer/presentationDesigner/converter/predicate/includeTableInResourcePathPredicateWrapper");

var VirtualDataAutoScrollController = require("../../../common/controller/VirtualDataAutoScrollController");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createPresentationDesignerSpecifications(context, options) {
  context.register('dropAcceptedByDropZoneResourcesSpecification', new DropAcceptedByDropZoneResourcesSpecification({
    presentationCanvasDroppableItemsService: context.get('presentationCanvasDroppableItemsService')
  }));
  context.register('dropConstantCalcFieldsSpecification', new DropConstantCalcFieldsSpecification({
    presentationCanvasDroppableItemsService: context.get('presentationCanvasDroppableItemsService'),
    clientDomainSchemaService: context.get('clientDomainSchemaService')
  }));
  context.register('dropDataIslandsAmongDataIslandsSpecification', new DropDataIslandsAmongDataIslandsSpecification({
    presentationCanvasDroppableItemsService: context.get('presentationCanvasDroppableItemsService')
  }));
  context.register('dropSidebarResourcesToCreateNewDataIslandsSpecification', new DropSidebarResourcesToCreateNewDataIslandsSpecification({
    presentationCanvasDroppableItemsService: context.get('presentationCanvasDroppableItemsService')
  }));
  context.register('dropSidebarResourcesToAddPresentationItemsSpecification', new DropSidebarResourcesToAddPresentationItemsSpecification({
    presentationCanvasDroppableItemsService: context.get('presentationCanvasDroppableItemsService')
  }));
  context.register('dropSetsAndFieldsAmongSetsAndFieldsSpecification', new DropSetsAndFieldsAmongSetsAndFieldsSpecification({
    presentationCanvasDroppableItemsService: context.get('presentationCanvasDroppableItemsService')
  }));
  context.register('dropItemsIntoDropZoneSpecification', new DropItemsIntoDropZoneSpecification({
    dropAcceptedByDropZoneResourcesSpecification: context.get('dropAcceptedByDropZoneResourcesSpecification'),
    dropDataIslandsAmongDataIslandsSpecification: context.get('dropDataIslandsAmongDataIslandsSpecification'),
    dropSidebarResourcesToCreateNewDataIslandsSpecification: context.get('dropSidebarResourcesToCreateNewDataIslandsSpecification'),
    dropSidebarResourcesToAddPresentationItemsSpecification: context.get('dropSidebarResourcesToAddPresentationItemsSpecification'),
    dropSetsAndFieldsAmongSetsAndFieldsSpecification: context.get('dropSetsAndFieldsAmongSetsAndFieldsSpecification'),
    dropConstantCalcFieldsSpecification: context.get('dropConstantCalcFieldsSpecification'),
    presentationCanvasDroppableItemsService: context.get('presentationCanvasDroppableItemsService')
  }));
}

function createPresentationDesignerFactories(context, options) {
  context.register('presentationItemsRangeSelectionProvider', new PresentationItemsRangeSelectionProvider({
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService'),
    clientDomainSchemaService: context.get('clientDomainSchemaService')
  }));
  context.register('presentationItemsSelectionAdapter', new PresentationItemsSelectionAdapter({
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService'),
    rangeSelectionProvider: context.get('presentationItemsRangeSelectionProvider')
  }));
  context.register('presentationItemsOnDragStartOptionsFactory', new OnDragStartOptionsFactory({
    selectionService: context.get('presentationItemsSelectionAdapter')
  }));
  context.register('presentationItemsOnDragStartSelectionFactory', new OnDragStartSelectionFactory({
    rangeSelectionProvider: context.get('presentationItemsRangeSelectionProvider'),
    selectionService: context.get('presentationItemsSelectionAdapter')
  }));
  context.register('presentationItemsDraggableLabelFactory', new DraggableLabelFactory({
    selectionService: context.get('presentationItemsSelectionAdapter')
  }));
  context.register('presentationCanvasDraggableItemsFactory', new PresentationCanvasDraggableItemsFactory());
  context.register('presentationItemsDraggableDataFactory', new DraggableDataFactory({
    selectionService: context.get('presentationItemsSelectionAdapter'),
    draggableItemsFactory: context.get('presentationCanvasDraggableItemsFactory')
  }));
  context.register('presentationDesignerLastRowDropZonePropertiesFactory', new PresentationDesignerLastRowDropZonePropertiesFactory({
    presentationCanvasDroppableItemsService: context.get('presentationCanvasDroppableItemsService')
  }));
}

function createPresentationDesignerConverters(context, options) {
  context.register('presentationDesignerItemReferencePathProvider', new PresentationDesignerItemReferencePathProvider({
    clientDataSourceGroupService: context.get('clientDataSourceGroupService'),
    dataSourceGroupNameIsEmptySpecification: context.get('dataSourceGroupNameIsEmptySpecification'),
    schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec: context.get('schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec')
  }));
  context.register('presentationDesignerSchemaToViewModelConverter', new PresentationDesignerSchemaToViewModelConverter({
    settings: options.presentationDesigner,
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService'),
    presentationDesignerDropZoneActivatorFactory: presentationDesignerDropZoneActivatorFactory
  }));
  context.register('presentationDesignerViewModelToVisibleDataConverter', new PresentationDesignerViewModelToVisibleDataConverter({}));
  context.register('presentationDesignerVisibleDataToVisibleDataWithDropZonesConverter', new PresentationDesignerVisibleDataToVisibleDataWithDropZonesConverter({
    presentationDesignerDropZoneFactory: presentationDesignerDropZoneFactory
  }));
  context.register('presentationDesignerVisibleDataToVisibleDataWithSourcePathConverter', new PresentationDesignerVisibleDataToVisibleDataWithSourcePathConverter({
    presentationDesignerItemReferencePathProvider: context.get('presentationDesignerItemReferencePathProvider')
  }));
  context.register('presentationDesignerLastRowHeightConverter', new PresentationDesignerLastRowHeightConverter());
  context.register('presentationDesignerViewModelToStoreConverter', new PresentationDesignerViewModelToStoreConverter({
    converters: [context.get('presentationDesignerViewModelToVisibleDataConverter'), context.get('presentationDesignerVisibleDataToVisibleDataWithDropZonesConverter'), context.get('presentationDesignerVisibleDataToVisibleDataWithSourcePathConverter'), context.get('presentationDesignerLastRowHeightConverter')]
  }));
}

function createPresentationDesignerControllers(context, options) {
  context.register('presentationDesignerCanvasAutoScrollByCanvasDraggableController', new VirtualDataAutoScrollController({
    store: context.get('presentationDesignerStore'),
    eventBus: context.get('presentationDesignerEventBus'),
    dragEvent: 'canvas:drag',
    dragStopEvent: 'canvas:dragStop',
    autoScrollAreaTopOffset: options.autoScroll.autoScrollAreaTopOffset,
    autoScrollAreaBottomOffset: options.autoScroll.autoScrollAreaBottomOffset,
    autoScrollStep: options.autoScroll.autoScrollStep,
    autoScrollTimeout: options.autoScroll.autoScrollTimeout,
    autoScrollThrottle: options.autoScroll.autoScrollThrottle
  }));
  context.register('presentationDesignerCanvasAutoScrollBySidebarDraggableController', new VirtualDataAutoScrollController({
    store: context.get('presentationDesignerStore'),
    eventBus: context.get('presentationDesignerEventBus'),
    dragEvent: 'sidebar:drag',
    dragStopEvent: 'sidebar:dragStop',
    autoScrollAreaTopOffset: options.autoScroll.autoScrollAreaTopOffset,
    autoScrollAreaBottomOffset: options.autoScroll.autoScrollAreaBottomOffset,
    autoScrollStep: options.autoScroll.autoScrollStep,
    autoScrollTimeout: options.autoScroll.autoScrollTimeout,
    autoScrollThrottle: options.autoScroll.autoScrollThrottle
  }));
  context.register('presentationDesignerResizableCellsController', new PresentationDesignerResizableCellsController({
    presentationDesignerStore: context.get('presentationDesignerStore'),
    minCanvasWidthEm: options.presentationDesigner.width.minCanvasWidthEm,
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    applicationCrossComponentEventBus: context.get('applicationCrossComponentEventBus')
  }));
  context.register('presentationItemDTONameGenerator', new PresentationItemDTONameGenerator({
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    domainSchemaSpecification: context.get('domainSchemaSpecification'),
    resourceIdentifierGenerator: new ResourceIdentifierGenerator({
      template: presentationItemDTONameTemplateFunction,
      sequenceGenerator: new SequenceGenerator()
    })
  }));
  var presentationItemUniqueNameConverter = new PresentationItemUniqueNameConverter({
    presentationItemDTONameGenerator: context.get('presentationItemDTONameGenerator'),
    presentationItemDTOProcessor: presentationItemDTOProcessor
  });
  var presentationItemsGroupedByEntityToDataIslandsWithPresentationItemsConverter = new PresentationItemsGroupedByEntityToDataIslandsWithPresentationItemsConverter({
    clientDomainSchemaService: context.get("clientDomainSchemaService"),
    domainSchemaSpecification: context.get("domainSchemaSpecification"),
    resourceIdentifierGenerator: new ResourceIdentifierGenerator({
      template: presentationItemDTONameTemplateFunction,
      sequenceGenerator: new SequenceGenerator()
    })
  });
  var presentationSidebarJoinTreeResourcesToPresentationItemsGroupedByJoinTreeConverter = new PresentationSidebarJoinTreeResourcesToPresentationItemsGroupedByJoinTreeConverter({
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    presentationItemDTONameGenerator: context.get('presentationItemDTONameGenerator'),
    comparator: context.get('comparatorByName'),
    joinTreesConverter: new JoinTreesTreeConverter({
      resourceMatch: acceptResourcesWhichAreInDroppableItemsPath,
      doNotSkipResourceConversion: convertResourceInHierarchy,
      convertResourceNoChildren: new CompositeResourceConverter([new GenericMapBasedConverter({
        converterMap: schemaEntityToPresentationItemConverterMap
      }).convert, presentationItemUniqueNameConverter.convert, presentationItemSourceJoinTreeIdConverter.convert]),
      convertResource: context.get('joinTreesMapBasedConverter')
    })
  });
  var presentationSidebarDataSourceResourcesToPresentationItemsGroupedByTableReferenceConverter = new PresentationSidebarDataSourceResourcesToPresentationItemsGroupedByTableReferenceConverter({
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    presentationItemDTONameGenerator: context.get('presentationItemDTONameGenerator'),
    comparator: context.get('comparatorByName'),
    dataSourceResourcesConverter: new DataSourceTreeConverter({
      resourceMatch: includeTableInResourcePathPredicateWrapper(acceptResourcesWhichAreInDroppableItemsPath),
      doNotSkipResourceConversion: false,
      convertResourceNoChildren: new ConvertResourceNoChildrenForTableReferenceBasedDataIslandsConverter({
        resourceConverter: new CompositeResourceConverter([new GenericMapBasedConverter({
          converterMap: schemaEntityToPresentationItemConverterMap
        }).convert, presentationItemUniqueNameConverter.convert])
      }),
      convertResource: context.get('resourceMapBasedConverter'),
      schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec: context.get('schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec')
    })
  });
  context.register('addDataIslandsBasedOnJoinTreeToCanvasDropStrategy', new AddDataIslandsBasedOnJoinTreeToCanvasDropStrategy({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    presentationCanvasDroppableItemsService: context.get('presentationCanvasDroppableItemsService'),
    presentationSidebarJoinTreeResourcesToPresentationItemsGroupedByJoinTreeConverter: presentationSidebarJoinTreeResourcesToPresentationItemsGroupedByJoinTreeConverter,
    presentationItemsGroupedByEntityToDataIslandsWithPresentationItemsConverter: presentationItemsGroupedByEntityToDataIslandsWithPresentationItemsConverter
  }));
  context.register('addDataIslandsBasedOnTableReferenceToCanvasDropStrategy', new AddDataIslandsBasedOnTableReferenceToCanvasDropStrategy({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    presentationCanvasDroppableItemsService: context.get('presentationCanvasDroppableItemsService'),
    presentationSidebarDataSourceResourcesToPresentationItemsGroupedByTableReferenceConverter: presentationSidebarDataSourceResourcesToPresentationItemsGroupedByTableReferenceConverter,
    presentationItemsGroupedByEntityToDataIslandsWithPresentationItemsConverter: presentationItemsGroupedByEntityToDataIslandsWithPresentationItemsConverter
  }));
  var presentationDesignerSearchKeywordProvider = new PresentationDesignerSearchKeywordProvider({
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService')
  });
  context.register('presentationDesignerSearchViewController', new SearchComponentController({
    store: context.get('presentationDesignerStore'),
    searchKeywordProvider: presentationDesignerSearchKeywordProvider,
    dispatcherEventName: applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_SEARCH_KEYWORD,
    eventBus: context.get('presentationDesignerEventBus'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    onChangeStateSearchStrategy: context.get('onChangeStateSearchStrategy')
  }));
  context.register('presentationDesignerDataIslandController', new PresentationDesignerDataIslandController({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    presentationDesignerEventBus: context.get('presentationDesignerEventBus')
  }));
  context.register('presentationDesignerSetsController', new PresentationDesignerSetsController({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    presentationDesignerEventBus: context.get('presentationDesignerEventBus')
  }));
  var presentationSetNameSequenceGenerator = new SequenceGenerator();
  context.register('presentationNewSetFactory', new PresentationNewSetFactory({
    sequenceGenerator: presentationSetNameSequenceGenerator,
    domainSchemaSpecification: context.get('domainSchemaSpecification'),
    resourceIdentifierGenerator: new ResourceIdentifierGenerator({
      template: newPresentationSetNameTemplate,
      sequenceGenerator: presentationSetNameSequenceGenerator
    })
  }));
  context.register('presentationDesignerAddSetController', new PresentationDesignerAddSetController({
    store: context.get('presentationDesignerStore'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    presentationNewSetFactory: context.get('presentationNewSetFactory'),
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus')
  }));
  var movePresentationItemsEventNameFactory = new MovePresentationItemsEventNameFactory({
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService')
  });
  var movePresentationItemsEventOptionsFactory = new MovePresentationItemsEventOptionsFactory({
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService'),
    getMovePositionStrategyFactory: getMovePositionStrategyFactory
  });
  context.register('presentationDesignerMoveSetButtonsController', new MovePresentationItemsController({
    store: context.get('presentationDesignerStore'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    movePresentationItemsEventNameFactory: movePresentationItemsEventNameFactory,
    movePresentationItemsEventOptionsFactory: movePresentationItemsEventOptionsFactory,
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus')
  }));
  context.register('fieldAndSetNameValidator', new FieldAndSetNameValidator({
    domainSchemaSpecification: context.get('domainSchemaSpecification')
  }));
  context.register('dataIslandNameValidator', new DataIslandNameValidator({
    domainSchemaSpecification: context.get('domainSchemaSpecification')
  }));
  var presentationFieldsValidationRulesFactory = new PresentationFieldsValidationRulesFactory({
    fieldAndSetNameValidator: context.get('fieldAndSetNameValidator'),
    dataIslandNameValidator: context.get('dataIslandNameValidator'),
    bundleKeyValidator: bundleKeyValidator,
    emptyValidator: emptyValidator,
    escapeJsonValidator: escapeJsonValidator,
    idValidator: idValidator,
    startsFromNumberValidator: startsFromNumberValidator
  });
  context.register('presentationDesignerFieldsController', new PresentationDesignerFieldsController({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    presentationDesignerEventBus: context.get('presentationDesignerEventBus')
  }));
  context.register('presentationDesignerEditPropertiesController', new PresentationDesignerEditPropertiesController({
    store: context.get('presentationDesignerStore'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    validationRulesFactory: presentationFieldsValidationRulesFactory,
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    presentationDesignerEventBus: context.get('presentationDesignerEventBus')
  }));
  context.register('presentationCanvasDropPresentationItemsStrategy', new PresentationCanvasDropPresentationItemsStrategy({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus')
  }));
  context.register('presentationCanvasDropDataIslandsStrategy', new PresentationCanvasDropDataIslandsStrategy({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus')
  }));
  context.register('presentationCanvasDropStrategyFactory', new PresentationCanvasDropStrategyFactory({
    presentationCanvasDropDataIslandsStrategy: context.get('presentationCanvasDropDataIslandsStrategy'),
    presentationCanvasDropPresentationItemsStrategy: context.get('presentationCanvasDropPresentationItemsStrategy')
  }));
  context.register('addPresentationItemsBasedOnJoinTreeToCanvasDropStrategy', new AddPresentationItemsBasedOnJoinTreeToCanvasDropStrategy({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    presentationCanvasDroppableItemsService: context.get('presentationCanvasDroppableItemsService'),
    presentationSidebarJoinTreeResourcesToPresentationItemsGroupedByJoinTreeConverter: presentationSidebarJoinTreeResourcesToPresentationItemsGroupedByJoinTreeConverter,
    presentationItemsGroupedByEntityToPresentationItemsWithParentIdConverter: presentationItemsGroupedByEntityToPresentationItemsWithParentIdConverter
  }));
  context.register('addPresentationItemsBasedOnTableReferenceToCanvasDropStrategy', new AddPresentationItemsBasedOnTableReferenceToCanvasDropStrategy({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    presentationCanvasDroppableItemsService: context.get('presentationCanvasDroppableItemsService'),
    presentationSidebarDataSourceResourcesToPresentationItemsGroupedByTableReferenceConverter: presentationSidebarDataSourceResourcesToPresentationItemsGroupedByTableReferenceConverter,
    presentationItemsGroupedByEntityToPresentationItemsWithParentIdConverter: presentationItemsGroupedByEntityToPresentationItemsWithParentIdConverter
  }));
  var presentationSidebarConstantGroupToPresentationDataIslandDTOHierarchyConverter = new PresentationSidebarConstantGroupToPresentationItemsDTOHierarchyConverter({
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    presentationItemDTONameGenerator: context.get('presentationItemDTONameGenerator'),
    constantGroupConverter: new ConstantGroupTreeConverter({
      resourceMatch: acceptResourcesWhichAreInDroppableItemsPath,
      convertResourceNoChildren: new CompositeResourceConverter([new GenericMapBasedConverter({
        converterMap: constantGroupEntityToPresentationItemConverterMap
      }).convert, presentationItemUniqueNameConverter.convert]),
      comparator: context.get('comparatorByLabel'),
      convertResource: context.get('constantGroupMapBasedConverter')
    })
  });
  context.register('addConstantDataIslandToCanvasDropStrategy', new AddConstantDataIslandToCanvasDropStrategy({
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    presentationCanvasDroppableItemsService: context.get('presentationCanvasDroppableItemsService'),
    presentationSidebarConstantGroupToPresentationDataIslandDTOHierarchyConverter: presentationSidebarConstantGroupToPresentationDataIslandDTOHierarchyConverter
  }));
  var presentationSidebarConstantGroupCalcFieldsToPresentationItemsDTOHierarchyConverter = new PresentationSidebarConstantGroupToPresentationItemsDTOHierarchyConverter({
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    presentationItemDTONameGenerator: context.get('presentationItemDTONameGenerator'),
    constantGroupConverter: new ConstantGroupTreeConverter({
      resourceMatch: acceptResourcesWhichAreInDroppableItemsPath,
      doNotSkipResourceConversion: convertResourceInHierarchy,
      convertResourceNoChildren: new CompositeResourceConverter([new GenericMapBasedConverter({
        converterMap: constantGroupEntityToPresentationItemConverterMap
      }).convert, presentationItemUniqueNameConverter.convert, presentationItemBasedOnConstantGroupCalcFieldParentIdConverter.convert]),
      comparator: context.get('comparatorByLabel'),
      convertResource: context.get('constantGroupMapBasedConverter')
    })
  });
  context.register('addPresentationItemBasedOnConstantGroupCalcFieldToCanvasDropStrategy', new AddPresentationItemBasedOnConstantGroupCalcFieldToCanvasDropStrategy({
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    presentationCanvasDroppableItemsService: context.get('presentationCanvasDroppableItemsService'),
    presentationSidebarConstantGroupCalcFieldsToPresentationItemsDTOHierarchyConverter: presentationSidebarConstantGroupCalcFieldsToPresentationItemsDTOHierarchyConverter
  }));
  context.register('presentationSidebarToCanvasDropStrategyFactory', new PresentationSidebarToCanvasDropStrategyFactory({
    addPresentationItemsBasedOnJoinTreeToCanvasDropStrategy: context.get('addPresentationItemsBasedOnJoinTreeToCanvasDropStrategy'),
    addPresentationItemsBasedOnTableReferenceToCanvasDropStrategy: context.get('addPresentationItemsBasedOnTableReferenceToCanvasDropStrategy'),
    addDataIslandsBasedOnJoinTreeToCanvasDropStrategy: context.get('addDataIslandsBasedOnJoinTreeToCanvasDropStrategy'),
    addDataIslandsBasedOnTableReferenceToCanvasDropStrategy: context.get('addDataIslandsBasedOnTableReferenceToCanvasDropStrategy'),
    addConstantDataIslandToCanvasDropStrategy: context.get('addConstantDataIslandToCanvasDropStrategy'),
    addPresentationItemBasedOnConstantGroupCalcFieldToCanvasDropStrategy: context.get('addPresentationItemBasedOnConstantGroupCalcFieldToCanvasDropStrategy')
  }));
  context.register('presentationDesignerDropStrategyFactory', new PresentationDesignerDropStrategyFactory({
    presentationCanvasDroppableItemsService: context.get('presentationCanvasDroppableItemsService'),
    presentationSidebarToCanvasDropStrategyFactory: context.get('presentationSidebarToCanvasDropStrategyFactory'),
    presentationCanvasDropStrategyFactory: context.get('presentationCanvasDropStrategyFactory')
  }));
  context.register('presentationSidebarDraggableItemsFactory', new PresentationSidebarDraggableItemsFactory());
  context.register('presentationDesignerInitialDropZoneController', new PresentationDesignerInitialDropZoneController({
    store: context.get('presentationDesignerStore'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    dropAcceptedByDropZoneResourcesSpecification: context.get('dropAcceptedByDropZoneResourcesSpecification'),
    presentationDesignerDropStrategyFactory: context.get('presentationDesignerDropStrategyFactory'),
    presentationSidebarDraggableItemsFactory: context.get('presentationSidebarDraggableItemsFactory'),
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService')
  }));
  context.register('presentationCanvasDropZoneTriggersController', new PresentationCanvasDropZoneActivatorController({
    store: context.get('presentationDesignerStore'),
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    presentationDesignerDropZoneFactory: presentationDesignerDropZoneFactory
  }));
  context.register('presentationCanvasDropItemsController', new PresentationCanvasDropItemsController({
    store: context.get('presentationDesignerStore'),
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    presentationDesignerDropStrategyFactory: context.get('presentationDesignerDropStrategyFactory'),
    clientViewStateModelService: context.get('presentationDesignerViewStateModelService')
  }));
  context.register('presentationItemsDragController', new PresentationItemsDragController({
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    presentationItemsOnDragStartSelectionFactory: context.get('presentationItemsOnDragStartSelectionFactory')
  }));
  context.register('presentationDesignerItemsSelectionController', new PresentationDesignerItemsSelectionController({
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService'),
    presentationItemsRangeSelectionProvider: context.get('presentationItemsRangeSelectionProvider')
  }));
  context.register('presentationDesignerDeleteDataIslandsBySelectionStrategy', new PresentationDesignerDeleteDataIslandsBySelectionStrategy({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService')
  }));
  context.register('presentationDesignerDeletePresentationItemsBySelectionStrategy', new PresentationDesignerDeletePresentationItemsBySelectionStrategy({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService')
  }));
  context.register('presentationDesignerDeleteItemsBySelectionController', new PresentationDesignerDeleteItemsBySelectionController({
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService'),
    presentationDesignerDeleteDataIslandsBySelectionStrategy: context.get('presentationDesignerDeleteDataIslandsBySelectionStrategy'),
    presentationDesignerDeletePresentationItemsBySelectionStrategy: context.get('presentationDesignerDeletePresentationItemsBySelectionStrategy')
  }));
  context.register('presentationDesignerSidebarSearchViewController', new SearchComponentController({
    store: context.get('presentationDesignerSidebarSearchStore'),
    eventBus: context.get('presentationDesignerSidebarSearchEventBus'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    searchKeywordProvider: context.get('presentationDesignerSidebarSearchKeywordProvider'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    dispatcherEventName: applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_SIDEBAR_SEARCH_KEYWORD,
    onChangeStateSearchStrategy: context.get('onChangeStateSidebarSearchStrategy')
  }));
  context.register('presentationSidebarItemsRangeSelectionProvider', new PresentationSidebarItemsRangeSelectionProvider({
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService'),
    sidebarTreeModel: context.get('presentationDesignerSidebarNestedTreeModel')
  }));
  context.register('presentationDesignerSidebarSingleSelectStrategy', new PresentationDesignerSidebarSingleSelectStrategy({
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus')
  }));
  context.register('presentationDesignerSidebarSelectionController', new PresentationDesignerSidebarSelectionController({
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    presentationDesignerSidebarSingleSelectStrategy: context.get('presentationDesignerSidebarSingleSelectStrategy'),
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    presentationSidebarItemsRangeSelectionProvider: context.get('presentationSidebarItemsRangeSelectionProvider')
  }));
  context.register('presentationDesignerSidebarActionsController', new PresentationDesignerSidebarActionsController({
    presentationDesignerSidebarSingleSelectStrategy: context.get('presentationDesignerSidebarSingleSelectStrategy'),
    presentationDesignerEventBus: context.get('presentationDesignerEventBus')
  }));
  context.register('presentationDesignerSidebarTreeSelectionProvider', new PresentationDesignerSidebarTreeSelectionProvider({
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService')
  }));
  context.register('presentationSidebarSelectionAdapter', new PresentationSidebarSelectionAdapter({
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService'),
    rangeSelectionProvider: context.get('presentationSidebarItemsRangeSelectionProvider')
  }));
  context.register('presentationSidebarOnDragStartOptionsFactory', new OnDragStartOptionsFactory({
    selectionService: context.get('presentationSidebarSelectionAdapter')
  }));
  context.register('presentationSidebarOnDragStartSelectionFactory', new OnDragStartSelectionFactory({
    rangeSelectionProvider: context.get('presentationSidebarItemsRangeSelectionProvider'),
    selectionService: context.get('presentationSidebarSelectionAdapter')
  }));
  context.register('presentationSidebarDraggableLabelFactory', new DraggableLabelFactory({
    selectionService: context.get('presentationSidebarSelectionAdapter')
  }));
  context.register('presentationSidebarDraggableDataFactory', new DraggableDataFactory({
    selectionService: context.get('presentationSidebarSelectionAdapter'),
    draggableItemsFactory: context.get('presentationSidebarDraggableItemsFactory')
  }));
  context.register('presentationDesignerSidebarDragController', new PresentationDesignerSidebarDragController({
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    presentationSidebarOnDragStartSelectionFactory: context.get('presentationSidebarOnDragStartSelectionFactory')
  }));
  context.register('sidebarTreeExpandCollapsePlugin', new SidebarTreeExpandCollapsePlugin({
    eventBus: context.get('applicationDispatcherEventBus'),
    el: context.get('presentationDesignerSidebar').$el,
    expandedNodesProvider: context.get('viewStateModelQueryService'),
    searchKeywordProvider: context.get('presentationDesignerSidebarSearchKeywordProvider'),
    expandNodeEvent: applicationStateEventsEnum.EXPAND_SIDEBAR_NODE,
    collapseNodeEvent: applicationStateEventsEnum.COLLAPSE_SIDEBAR_NODE
  }));
  context.register('presentationDesignerSidebarTreeSelectionPlugin', new PresentationDesignerSidebarTreeSelectionPlugin({
    el: context.get('presentationDesignerSidebar').$el,
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    sidebarTreeModel: context.get('presentationDesignerSidebarNestedTreeModel')
  }));
  context.register('presentationDesignerSidebarTreeDraggablePlugin', new PresentationDesignerSidebarTreeDraggablePlugin({
    el: context.get('presentationDesignerSidebar').$el,
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    sidebarTreeModel: context.get('presentationDesignerSidebarNestedTreeModel'),
    presentationSidebarOnDragStartOptionsFactory: context.get('presentationSidebarOnDragStartOptionsFactory'),
    presentationSidebarDraggableLabelFactory: context.get('presentationSidebarDraggableLabelFactory'),
    presentationSidebarDraggableDataFactory: context.get('presentationSidebarDraggableDataFactory')
  }));
  context.register('presentationDesignerSidebarTreeController', new SidebarTreeController({
    selectionProvider: context.get('presentationDesignerSidebarTreeSelectionProvider'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    tree: context.get('presentationDesignerSidebarTree'),
    treeDataProvider: context.get('presentationDesignerSidebarTreeDataProvider'),
    model: context.get('presentationDesignerSidebarStore'),
    fetchTreeEventsBlacklist: presentationDesignerFetchTreeEventsBlacklistEnum
  }));
  context.register('presentationDesignerCanvasMenuController', new PresentationDesignerCanvasMenuController({
    model: context.get('presentationDesignerStore'),
    presentationDesignerViewStateModelService: context.get('presentationDesignerViewStateModelService'),
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    storeChangeEventBus: context.get('storeChangeEventBus')
  }));
  context.register('presentationDesignerController', new PresentationDesignerController({
    document: $(document),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    cache: new SimpleCache(),
    presentationDesignerStore: context.get('presentationDesignerStore'),
    presentationDesignerSchemaToViewModelConverter: context.get('presentationDesignerSchemaToViewModelConverter'),
    presentationDesignerViewModelToStoreConverter: context.get('presentationDesignerViewModelToStoreConverter'),
    notEmptyFieldsSpecification: context.get('notEmptyFieldsSpecification')
  }));
}

function createPresentationDesignerVueComponents(context, options) {
  var clickMenuDirective = clickMenuDirectiveFactory.create(ClickMenuWithEventsRetrigger, {
    eventBus: context.get('presentationDesignerEventBus'),
    menuOptionTemplate: menuItemWithOptionsTemplate
  });
  var SelectInput = Vue.extend(selectVueConfigFactory.create());
  var TableCell = Vue.extend(staticComponentVueConfigFactory.create({
    template: tableCellTemplate
  }));
  var TableTextCell = Vue.extend(staticComponentVueConfigFactory.create({
    template: tableTextCellTemplate,
    components: {
      cell: TableCell
    }
  }));
  var Tooltip = Vue.extend(tooltipVueConfig);
  var presentationDesignerPropertyEditorConfig = propertyEditorVueConfigFactory.create({
    errorTooltipConfig: options.presentationDesigner.canvasErrorTooltipConfig,
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    components: {
      tooltip: Tooltip
    },
    mixins: [presentationItemDataNameComputedMixin]
  });
  var presentationDesignerPropertyEditorConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: presentationDesignerPropertyEditorConfig,
    dataNames: automationDataNameAttributesEnum.presentationDesigner.propertyEditor
  });
  var PropertyEditor = Vue.extend(presentationDesignerPropertyEditorConfigWithDataNameAttribute);
  var ReadOnlyProperty = Vue.extend(readOnlyPropertyVueConfigFactory.create({
    mixins: [presentationItemDataNameComputedMixin]
  }));
  var InputGroup = Vue.extend(staticComponentVueConfigFactory.create({
    template: inputGroupTemplate
  }));
  var leftResizableMixin = resizableMixinFactory.create({
    event: 'canvas:resize:left:column',
    resizerDirective: resizerDirectiveFactory.create(),
    presentationDesignerEventBus: context.get('presentationDesignerEventBus')
  });
  var rightResizableMixin = resizableMixinFactory.create({
    event: 'canvas:resize:right:column',
    resizerDirective: resizerDirectiveFactory.create(),
    presentationDesignerEventBus: context.get('presentationDesignerEventBus')
  });
  var presentationDesignerHeaderConfig = headerVueConfigFactory.create({
    cell: TableCell,
    textCell: TableTextCell,
    clickMenuDirective: clickMenuDirective,
    canvasMenuOptionsFactory: canvasMenuOptionsFactory,
    mixins: [columnWidthComputedMixin, leftResizableMixin]
  });
  var presentationDesignerHeaderConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: presentationDesignerHeaderConfig,
    dataNames: automationDataNameAttributesEnum.presentationDesigner.header
  });
  var Header = Vue.extend(presentationDesignerHeaderConfigWithDataNameAttribute);
  var DropZoneActivator = Vue.extend(dropZoneActivatorVueConfigFactory.create({
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    dropItemsIntoDropZoneSpecification: context.get('dropItemsIntoDropZoneSpecification')
  }));
  var presentationItemSelectionVueMixin = presentationItemSelectionVueMixinFactory.create({
    presentationDesignerEventBus: context.get('presentationDesignerEventBus')
  });
  context.register('presentationItemsContextMenu', new PresentationItemsContextMenu({
    menuOptionsFactory: presentationItemsContextMenuOptionsFactory,
    presentationDesignerEventBus: context.get('presentationDesignerEventBus')
  }));
  var presentationItemContextMenuVueMixin = presentationItemContextMenuVueMixinFactory.create({
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    presentationItemsContextMenu: context.get('presentationItemsContextMenu')
  });
  var presentationItemDraggableVueMixin = presentationItemDraggableVueMixinFactory.create({
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    presentationItemsOnDragStartOptionsFactory: context.get('presentationItemsOnDragStartOptionsFactory'),
    presentationItemsDraggableLabelFactory: context.get('presentationItemsDraggableLabelFactory'),
    presentationItemsDraggableDataFactory: context.get('presentationItemsDraggableDataFactory')
  });
  var presentationDesignerTreeNodeConfig = treeNodeVueConfigFactory.create({
    mixins: [presentationItemSelectionVueMixin, presentationItemContextMenuVueMixin, presentationItemSelectionPropertiesVueMixin, presentationItemDraggableVueMixin],
    dropZoneActivator: DropZoneActivator,
    presentationDesignerEventBus: context.get('presentationDesignerEventBus')
  });
  var presentationDesignerTreeNodeConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: presentationDesignerTreeNodeConfig,
    dataNames: automationDataNameAttributesEnum.presentationDesigner.treeNode
  });
  var TreeNode = Vue.extend(presentationDesignerTreeNodeConfigWithDataNameAttribute);
  var DragAndDropTreeNode = Vue.extend(droppableTreeNodeVueConfigFactory.create({
    treeNode: TreeNode,
    dropZoneActivator: DropZoneActivator,
    dropItemsIntoDropZoneSpecification: context.get('dropItemsIntoDropZoneSpecification'),
    presentationDesignerEventBus: context.get('presentationDesignerEventBus')
  }));
  var presentationDesignerRemoveItemConfig = removeItemVueConfigFactory.create({
    cell: TableCell,
    presentationDesignerEventBus: context.get('presentationDesignerEventBus')
  });
  var presentationDesignerRemoveItemConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: presentationDesignerRemoveItemConfig,
    dataNames: automationDataNameAttributesEnum.presentationDesigner.removeItem
  });
  var RemoveItem = Vue.extend(presentationDesignerRemoveItemConfigWithDataNameAttribute);
  var presentationDesignerTogglePropertiesEditorConfig = togglePropertiesEditorVueConfigFactory.create({
    cell: TableCell,
    presentationDesignerEventBus: context.get('presentationDesignerEventBus')
  });
  var presentationDesignerTogglePropertiesEditorConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: presentationDesignerTogglePropertiesEditorConfig,
    dataNames: automationDataNameAttributesEnum.presentationDesigner.togglePropertiesEditor
  });
  var TogglePropertiesEditor = Vue.extend(presentationDesignerTogglePropertiesEditorConfigWithDataNameAttribute);
  var Property = Vue.extend(propertyVueConfigFactory.create({
    cell: TableCell,
    propertyEditor: PropertyEditor,
    readOnlyProperty: ReadOnlyProperty
  }));
  var PresentationItem = Vue.extend(presentationItemVueConfigFactory.create({
    treeNode: TreeNode,
    togglePropertiesEditor: TogglePropertiesEditor,
    removeItem: RemoveItem,
    mixins: [columnWidthComputedMixin, leftResizableMixin]
  }));
  var DragAndDropPresentationItem = Vue.extend(presentationItemVueConfigFactory.create({
    treeNode: DragAndDropTreeNode,
    togglePropertiesEditor: TogglePropertiesEditor,
    removeItem: RemoveItem,
    mixins: [columnWidthComputedMixin, leftResizableMixin]
  }));
  var dataIslandOrSetVueConfig = dataIslandOrSetVueConfigFactory.create({
    property: Property,
    cell: TableCell,
    propertyEditor: PropertyEditor,
    inputGroup: InputGroup,
    presentationItem: DragAndDropPresentationItem,
    dataIslandOrSet: automationDataNameAttributesEnum.presentationDesigner.dataIslandOrSet
  });
  var dataIslandOrSetVueConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: dataIslandOrSetVueConfig,
    dataNames: automationDataNameAttributesEnum.presentationDesigner.dataIslandOrSet
  });
  var DataIslandOrSet = Vue.extend(dataIslandOrSetVueConfigWithDataNameAttribute);
  var SelectPropertyCollapsed = Vue.extend(selectPropertyVueConfigFactory.create({
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    template: selectPropertyCollapsedTemplate,
    components: {
      cell: TableCell,
      selectInput: SelectInput
    }
  }));
  var SelectPropertyExpanded = Vue.extend(selectPropertyVueConfigFactory.create({
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    template: selectPropertyExpandedTemplate,
    components: {
      selectInput: SelectInput
    }
  }));
  var PresentationField = Vue.extend(presentationFieldVueConfigFactory.create({
    selectPropertyCollapsed: SelectPropertyCollapsed,
    selectPropertyExpanded: SelectPropertyExpanded,
    presentationItem: PresentationItem,
    property: Property,
    propertyEditor: PropertyEditor,
    readOnlyProperty: ReadOnlyProperty,
    cell: TableCell,
    inputGroup: InputGroup,
    genericTypeToMasksEnum: genericTypeToMasksEnum,
    selectPropertiesExpanded: automationDataNameAttributesEnum.presentationDesigner.selectPropertiesExpanded,
    selectPropertiesCollapsed: automationDataNameAttributesEnum.presentationDesigner.selectPropertiesCollapsed,
    dataIslandOrSet: automationDataNameAttributesEnum.presentationDesigner.dataIslandOrSet
  }));
  var VirtualData = Vue.extend(virtualDataVueConfigFactory.create({
    eventBus: context.get('presentationDesignerEventBus'),
    defaultHeight: options.presentationDesigner.height.canvas,
    debounce: options.virtualData.debounce
  }));
  var DropZone = Vue.extend(dropZoneVueConfigFactory.create({
    presentationDesignerEventBus: context.get('presentationDesignerEventBus')
  }));
  var lastRow = Vue.extend(lastRowVueConfigFactory.create({
    mixins: [columnWidthComputedMixin, leftResizableMixin],
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    dropItemsIntoDropZoneSpecification: context.get('dropItemsIntoDropZoneSpecification'),
    presentationDesignerLastRowDropZonePropertiesFactory: context.get('presentationDesignerLastRowDropZonePropertiesFactory')
  }));
  var emptyDataIslands = Vue.extend(emptyDataIslandsVueConfigFactory.create({
    mixins: [columnWidthComputedMixin, rightResizableMixin],
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    dropAcceptedByDropZoneResourcesSpecification: context.get('dropAcceptedByDropZoneResourcesSpecification')
  }));
  var presentationDesignerConfig = searchVueConfigFactory.create({
    eventBus: context.get('presentationDesignerEventBus')
  });
  var presentationDesignerConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: presentationDesignerConfig,
    dataNames: automationDataNameAttributesEnum.presentationDesigner.search
  });
  var Search = Vue.extend(presentationDesignerConfigWithDataNameAttribute);
  var presentationDesignerControlsConfig = controlsVueConfigFactory.create({
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    search: Search
  });
  var presentationDesignerControlsConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: presentationDesignerControlsConfig,
    dataNames: automationDataNameAttributesEnum.presentationDesigner.controls
  });
  var Controls = Vue.extend(presentationDesignerControlsConfigWithDataNameAttribute);
  var presentationDesignerTableVueConfig = presentationDesignerTableVueConfigFactory.create({
    header: Header,
    lastRow: lastRow,
    dataIslandOrSet: DataIslandOrSet,
    presentationField: PresentationField,
    emptyDataIslands: emptyDataIslands,
    dropZone: DropZone,
    virtualData: VirtualData,
    presentationDesignerEventBus: context.get('presentationDesignerEventBus')
  });
  var presentationDesignerTableVueConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: presentationDesignerTableVueConfig,
    dataNames: automationDataNameAttributesEnum.presentationDesigner.table
  });
  var PresentationDesignerTable = Vue.extend(presentationDesignerTableVueConfigWithDataNameAttribute);
  context.register('presentationDesignerVueConfig', presentationDesignerVueConfigFactory.create({
    data: context.get('presentationDesignerStore').attributes,
    controls: Controls,
    presentationDesignerTable: PresentationDesignerTable,
    presentationDesignerEventBus: context.get('presentationDesignerEventBus'),
    resizerDirective: resizerDirectiveFactory.create()
  }));
}

module.exports = function (context, options) {
  createPresentationDesignerSpecifications(context, options);
  createPresentationDesignerFactories(context, options);
  createPresentationDesignerConverters(context, options);
  createPresentationDesignerVueComponents(context, options);
  createPresentationDesignerControllers(context, options);
};

});