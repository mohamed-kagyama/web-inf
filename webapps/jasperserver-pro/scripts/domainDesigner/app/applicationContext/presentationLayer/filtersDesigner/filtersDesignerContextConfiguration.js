define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var filtersDesignerValidationContextConfiguration = require("./filtersDesignerValidationContextConfiguration");

var filtersDesignerConvertersContextConfiguration = require("./filtersDesignerConvertersContextConfiguration");

var filtersDesignerDraftFilterFactoryConfiguration = require("./filtersDesignerDraftFilterFactoryConfiguration");

var expressionsEnum = require("../../../model/enum/expressionsEnum");

var applicationStateEventsEnum = require("../../../dispatcher/enum/applicationStateEventsEnum");

var filtersDesignerFetchTreeEventsBlacklistEnum = require("../../../component/designer/filtersDesigner/sidebar/enum/filtersDesignerFetchTreeEventsBlacklistEnum");

var Vue = require('vue');

var genericTypesEnum = require("../../../../model/schema/enum/genericTypesEnum");

var multiSelectNumberValuesSortFn = require("../../../component/designer/filtersDesigner/component/draftFilter/valueEditor/sorter/multiSelectNumberValuesSortFn");

var multiSelectStringValuesSortFn = require("../../../component/designer/filtersDesigner/component/draftFilter/valueEditor/sorter/multiSelectStringValuesSortFn");

var multiSelectBooleanValuesSortFn = require("../../../component/designer/filtersDesigner/component/draftFilter/valueEditor/sorter/multiSelectBooleanValuesSortFn");

var SidebarTreeController = require("../../../component/layout/sidebarView/controller/SidebarTreeController");

var addAutomationDataNameAttributeMixinFactory = require("../../../common/factory/addAutomationDataNameAttributeMixinFactory");

var automationDataNameAttributesEnum = require("../../../common/enum/automationDataNameAttributesEnum");

var availableOperatorsValueConverter = require("../../../component/designer/filtersDesigner/util/availableOperatorsValueConverter");

var AvailableOperatorOptionsConverter = require("../../../component/designer/filtersDesigner/converter/store/AvailableOperatorOptionsConverter");

var FiltersDesignerViewModelToStoreConverter = require("../../../component/designer/filtersDesigner/converter/store/FiltersDesignerViewModelToStoreConverter");

var FiltersDesignerController = require("../../../component/designer/filtersDesigner/controller/FiltersDesignerController");

var FiltersDesignerSchemaToViewModelConverter = require("../../../component/designer/filtersDesigner/converter/schema/FiltersDesignerSchemaToViewModelConverter");

var ShouldDropZoneBeActiveSpecification = require("../../../component/designer/filtersDesigner/converter/schema/specification/ShouldDropZoneBeActiveSpecification");

var IsResourceAlreadyDroppedSpecification = require("../../../component/designer/filtersDesigner/converter/schema/specification/IsResourceAlreadyDroppedSpecification");

var IsFilterDropAreaAcceptsResourceSpecification = require("../../../component/designer/filtersDesigner/converter/schema/specification/IsFilterDropAreaAcceptsResourceSpecification");

var IsResourcesHaveTheSameSourceSpecification = require("../../../component/designer/filtersDesigner/converter/schema/specification/IsResourcesHaveTheSameSourceSpecification");

var IsResourcesHaveTheSameTypeSpecification = require("../../../component/designer/filtersDesigner/converter/schema/specification/IsResourcesHaveTheSameTypeSpecification");

var IsResourcesHaveRelatedTypesSpecification = require("../../../component/designer/filtersDesigner/converter/schema/specification/IsResourcesHaveRelatedTypesSpecification");

var IsResourceDroppableSpecification = require("../../../component/designer/filtersDesigner/converter/schema/specification/IsResourceDroppableSpecification");

var IsResourceDroppableIntoCanvasDroppableAreaSpecification = require("../../../component/designer/filtersDesigner/controller/specification/IsResourceDroppableIntoCanvasDroppableAreaSpecification");

var draftFilterVueConfigFactory = require("../../../component/designer/filtersDesigner/component/draftFilter/draftFilterVueConfigFactory");

var complexFilterVueConfigFactory = require("../../../component/designer/filtersDesigner/component/complexFilter/complexFilterVueConfigFactory");

var filtersDesignerVueConfigFactory = require("../../../component/designer/filtersDesigner/component/main/filtersDesignerVueConfigFactory");

var virtualDataVueConfigFactory = require("../../../common/component/virtualData/virtualDataVueConfigFactory");

var cellActionsVueConfigFactory = require("../../../component/designer/filtersDesigner/component/cellActions/cellActionsVueConfigFactory");

var optionsMenuVueConfigFactory = require("../../../component/designer/filtersDesigner/component/draftFilter/optionsMenuVueConfigFactory");

var filterExpressionVueConfigFactory = require("../../../component/designer/filtersDesigner/component/filterExpression/filterExpressionVueConfigFactory");

var leftOperandVueConfigFactory = require("../../../component/designer/filtersDesigner/component/draftFilter/leftOperandVueConfigFactory");

var operatorVueConfigFactory = require("../../../component/designer/filtersDesigner/component/draftFilter/operatorVueConfigFactory");

var rightOperandVueConfigFactory = require("../../../component/designer/filtersDesigner/component/draftFilter/rightOperandVueConfigFactory");

var fieldValueEditorVueConfigFactory = require("../../../component/designer/filtersDesigner/component/draftFilter/valueEditor/fieldValueEditorVueConfigFactory");

var filterSupportsAlternativeValueEditorSpecification = require("../../../component/designer/filtersDesigner/specification/filterSupportsAlternativeValueEditorSpecification");

var filterSupportsSwapOptionSpecification = require("../../../component/designer/filtersDesigner/factory/specification/filterSupportsSwapOptionSpecification");

var filterSupportsFieldToValueEditorSpecification = require("../../../component/designer/filtersDesigner/factory/specification/filterSupportsFieldToValueEditorSpecification");

var textInputValueEditorVueConfigFactory = require("../../../component/designer/filtersDesigner/component/draftFilter/valueEditor/textInputValueEditorVueConfigFactory");

var textInputValueEditorTemplate = require("text!../../../component/designer/filtersDesigner/component/draftFilter/valueEditor/template/textInputValueEditorTemplate.htm");

var dateTimeInputValueEditorTemplate = require("text!../../../component/designer/filtersDesigner/component/draftFilter/valueEditor/template/dateTimeInputValueEditorTemplate.htm");

var dateTimeInputValueEditorMixinFactory = require("../../../component/designer/filtersDesigner/component/draftFilter/valueEditor/mixin/dateTimeInputValueEditorMixinFactory");

var dateTimeRangeValueEditorMixinFactory = require("../../../component/designer/filtersDesigner/component/draftFilter/valueEditor/mixin/dateTimeRangeValueEditorMixinFactory");

var filtersDesignerDroppableAreaConfigMixinFactory = require("../../../component/designer/filtersDesigner/component/canvasDroppableArea/mixin/filtersDesignerDroppableAreaConfigMixinFactory");

var dateAndTimePickerOptionsFactory = require("../../../component/designer/filtersDesigner/component/draftFilter/valueEditor/factory/dateAndTimePickerOptionsFactory");

var dateTimePickerDirectiveFactory = require("../../../common/vue/directive/dateTimePickerDirectiveFactory");

var multiSelectValueEditorVueConfigFactory = require("../../../component/designer/filtersDesigner/component/draftFilter/valueEditor/multiSelectValueEditorVueConfigFactory");

var multiSelectVueConfigFactory = require("../../../common/component/multiSelect/multiSelectVueConfigFactory");

var rangeValueEditorVueConfigFactory = require("../../../component/designer/filtersDesigner/component/draftFilter/valueEditor/rangeValueEditorVueConfigFactory");

var rangeValueEditorTemplate = require("text!../../../component/designer/filtersDesigner/component/draftFilter/valueEditor/template/rangeValueEditorTemplate.htm");

var dateTimeRangeValueEditorTemplate = require("text!../../../component/designer/filtersDesigner/component/draftFilter/valueEditor/template/dateTimeRangeValueEditorTemplate.htm");

var AvailableValuesCacheCleaner = require("../../../component/designer/filtersDesigner/provider/AvailableValuesCacheCleaner");

var MultiLevelAdhocQueryToAvailableValuesConverter = require("../../../component/designer/filtersDesigner/converter/availableValues/MultiLevelAdhocQueryToAvailableValuesConverter");

var singleSelectValueEditorVueConfigFactory = require("../../../component/designer/filtersDesigner/component/draftFilter/valueEditor/singleSelectValueEditorVueConfigFactory");

var singleSelectLabelProvider = require("../../../component/designer/filtersDesigner/component/draftFilter/valueEditor/provider/singleSelectLabelProvider");

var singleSelectVueConfigFactory = require("../../../common/component/singleSelect/singleSelectVueConfigFactory");

var AvailableValuesDataProvider = require("../../../component/designer/filtersDesigner/provider/AvailableValuesDataProvider");

var BooleanAvailableValuesDataProvider = require("../../../component/designer/filtersDesigner/provider/BooleanAvailableValuesDataProvider");

var DataProviderNew = require("runtime_dependencies/js-sdk/src/components/singleSelect/dataprovider/DataProviderNew");

var DataProviderWithDraftFilter = require("../../../component/designer/filtersDesigner/provider/DataProviderWithDraftFilter");

var QueryExecutionAvailableValuesDataProvider = require("../../../component/designer/filtersDesigner/provider/QueryExecutionAvailableValuesDataProvider");

var DomainSchemaToInMemoryDomainForAvailableValuesReducer = require("../../../component/designer/filtersDesigner/reducer/DomainSchemaToInMemoryDomainForAvailableValuesReducer");

var DomainToInMemoryDomainForAvailableValuesConverter = require("../../../component/designer/filtersDesigner/converter/availableValues/DomainToInMemoryDomainForAvailableValuesConverter");

var actionButtonsVueConfigFactory = require("../../../component/designer/filtersDesigner/component/draftFilter/actionButtonsVueConfigFactory");

var filtersDesignerCanvasDroppableAreaVueConfigFactory = require("../../../component/designer/filtersDesigner/component/canvasDroppableArea/filtersDesignerCanvasDroppableAreaVueConfigFactory");

var searchVueConfigFactory = require("../../../common/component/search/factory/searchVueConfigFactory");

var AdhocQueryByFieldNameFactory = require("../../../component/designer/filtersDesigner/factory/AdhocQueryByFieldNameFactory");

var adhocQueryStringFilterExpressionFactory = require("../../../component/designer/filtersDesigner/factory/adhocQueryStringFilterExpressionFactory");

var AdhocQueryNumberFilterExpressionFactory = require("../../../component/designer/filtersDesigner/factory/AdhocQueryNumberFilterExpressionFactory");

var clickMenuDirectiveFactory = require("../../../common/vue/directive/clickMenuDirectiveFactory");

var ClickMenuWithEventsRetrigger = require("../../../common/menu/ClickMenuWithEventsRetrigger");

var DraftFilterOptionsMenuOptionsFactory = require("../../../component/designer/filtersDesigner/factory/DraftFilterOptionsMenuOptionsFactory");

var filterExpressionOperatorByRightOperandTypeFactory = require("../../../component/designer/filtersDesigner/draftFilter/factory/filterExpressionOperatorByRightOperandTypeFactory");

var menuItemWithOptionsTemplate = require("text!../../../common/template/menuItemWithOptionsTemplate.htm");

var SimpleCache = require("../../../../util/cache/SimpleCache");

var filtersDesignerSearchKeywordProvider = require("../../../component/designer/filtersDesigner/controller/provider/filtersDesignerSearchKeywordProvider");

var SearchComponentController = require("../../../common/component/search/controller/SearchComponentController");

var FiltersDesignerOnEditFilterConverter = require("../../../component/designer/filtersDesigner/controller/converter/FiltersDesignerOnEditFilterConverter");

var OnEditDraftFilterOperandSourceProvider = require("../../../component/designer/filtersDesigner/controller/provider/OnEditDraftFilterOperandSourceProvider");

var FiltersDesignerDraftFilterController = require("../../../component/designer/filtersDesigner/controller/FiltersDesignerDraftFilterController");

var OnSaveDraftFilterSourceByExpressionProvider = require("../../../component/designer/filtersDesigner/controller/provider/OnSaveDraftFilterSourceByExpressionProvider");

var FiltersDesignerOnSaveDraftFilterConverter = require("../../../component/designer/filtersDesigner/controller/converter/FiltersDesignerOnSaveDraftFilterConverter");

var FiltersDesignerSidebarSelectionController = require("../../../component/designer/filtersDesigner/controller/FiltersDesignerSidebarSelectionController");

var SidebarTreeSingleSelectionProvider = require("../../../component/layout/sidebarView/util/SidebarTreeSingleSelectionProvider");

var FiltersDesignerCreateDraftFilterByResourceController = require("../../../component/designer/filtersDesigner/controller/FiltersDesignerCreateDraftFilterByResourceController");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createFiltersDesignerSpecifications(context, options) {
  context.register('isResourceDroppableSpecification', new IsResourceDroppableSpecification({}));
  context.register('isResourceAlreadyDroppedSpecification', new IsResourceAlreadyDroppedSpecification());
  context.register('isResourcesHaveTheSameSourceSpecification', new IsResourcesHaveTheSameSourceSpecification({
    clientDomainSchemaService: context.get('clientDomainSchemaService')
  }));
  context.register('isResourcesHaveRelatedTypesSpecification', new IsResourcesHaveRelatedTypesSpecification({
    clientDomainSchemaService: context.get('clientDomainSchemaService')
  }));
  context.register('isResourcesHaveTheSameTypeSpecification', new IsResourcesHaveTheSameTypeSpecification({
    clientDomainSchemaService: context.get('clientDomainSchemaService')
  }));
  context.register('isFilterDropAreaAcceptsResourceSpecification', new IsFilterDropAreaAcceptsResourceSpecification({
    isResourcesHaveTheSameSourceSpecification: context.get('isResourcesHaveTheSameSourceSpecification'),
    isResourcesHaveRelatedTypesSpecification: context.get('isResourcesHaveRelatedTypesSpecification'),
    isResourcesHaveTheSameTypeSpecification: context.get('isResourcesHaveTheSameTypeSpecification')
  }));
}

function createFiltersDesignerConverters(context, options) {
  context.register('filtersDesignerSchemaToViewModelConverter', new FiltersDesignerSchemaToViewModelConverter({
    settings: _.cloneDeep(options.filtersDesigner),
    filterExpressionSerializer: context.get('filterExpressionSerializerForFiltersDesigner'),
    shouldDropZoneBeActiveSpecification: new ShouldDropZoneBeActiveSpecification({
      filtersDesignerViewStateModelService: context.get('filtersDesignerViewStateModelService'),
      isResourceAlreadyDroppedSpecification: context.get('isResourceAlreadyDroppedSpecification'),
      isResourceDroppableSpecification: context.get('isResourceDroppableSpecification'),
      isFilterDropAreaAcceptsResourceSpecification: context.get('isFilterDropAreaAcceptsResourceSpecification')
    }),
    filtersDesignerViewStateModelService: context.get('filtersDesignerViewStateModelService')
  }));
  var domainSchemaToInMemoryDomainForAvailableValuesReducer = new DomainSchemaToInMemoryDomainForAvailableValuesReducer({
    clientDomainSchemaCalcFieldsService: context.get('clientDomainSchemaCalcFieldsService'),
    schemaModelConverter: context.get('schemaModelConverter')
  });
  context.register('domainToInMemoryDomainForAvailableValuesConverter', new DomainToInMemoryDomainForAvailableValuesConverter({
    domainSchemaToInMemoryDomainForAvailableValuesReducer: domainSchemaToInMemoryDomainForAvailableValuesReducer,
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    clientResourcePropertiesService: context.get('clientResourcePropertiesService'),
    serverSchemaModelSerializer: context.get('serverSchemaModelSerializer')
  }));
}

function createAvailableValuesDataProviders(context, options) {
  context.register('inMemoryDomainForAvailableValuesCache', new SimpleCache());
  context.register('availableValuesErrorsCache', new SimpleCache());
  context.register('availableValuesFirstRequestSuccessCache', new SimpleCache());
  var multiLevelAdhocQueryToAvailableValuesConverter = new MultiLevelAdhocQueryToAvailableValuesConverter({
    availableValuesLabelConverter: context.get('availableValuesLabelConverter'),
    availableValuesValueConverter: context.get('availableValuesValueConverter')
  });
  var adhocQueryNumberFilterExpressionFactory = new AdhocQueryNumberFilterExpressionFactory({
    converter: context.get('stringToNumberConverter')
  });
  var filterExpressionFactoryByLiteralTypeMap = {};
  filterExpressionFactoryByLiteralTypeMap[expressionsEnum.operators.number.name] = adhocQueryNumberFilterExpressionFactory;
  filterExpressionFactoryByLiteralTypeMap[expressionsEnum.operators.string.name] = adhocQueryStringFilterExpressionFactory;
  var adhocQueryByFieldNameFactory = new AdhocQueryByFieldNameFactory({
    filterExpressionFactoryByLiteralTypeMap: filterExpressionFactoryByLiteralTypeMap
  });
  var queryExecutionAvailableValuesDataProvider = new QueryExecutionAvailableValuesDataProvider({
    queryExecutionService: context.get('queryExecutionServiceWrappedWithLoader'),
    domainToInMemoryDomainForAvailableValuesConverter: context.get('domainToInMemoryDomainForAvailableValuesConverter'),
    filtersDesignerViewStateModelService: context.get('filtersDesignerViewStateModelService'),
    adhocQueryByFieldNameFactory: adhocQueryByFieldNameFactory,
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    multilevelAdhocQueryToAvailableValuesConverter: multiLevelAdhocQueryToAvailableValuesConverter,
    cache: context.get('inMemoryDomainForAvailableValuesCache'),
    errorsCache: context.get('availableValuesErrorsCache'),
    availableValuesFirstRequestSuccessCache: context.get('availableValuesFirstRequestSuccessCache')
  });
  context.register('dataProviderWithSearchAndCacheForAvailableValues', new DataProviderNew({
    serialRequestsDelay: options.serialRequestsDelay,
    request: queryExecutionAvailableValuesDataProvider.getData,
    saveLastCriteria: true
  }));
  context.register('dataProviderWithDraftFilterDecorator', new DataProviderWithDraftFilter({
    filtersDesignerViewStateModelService: context.get('filtersDesignerViewStateModelService'),
    request: context.get('dataProviderWithSearchAndCacheForAvailableValues').getData
  }));
  var booleanAvailableValuesDataProvider = new BooleanAvailableValuesDataProvider();
  context.register('booleanAvailableValuesDataProvider', new DataProviderNew({
    request: booleanAvailableValuesDataProvider.getData,
    saveLastCriteria: true
  }));
  context.register('availableValuesCacheCleaner', new AvailableValuesCacheCleaner({
    availableValuesErrorsCache: context.get('availableValuesErrorsCache'),
    inMemoryDomainForAvailableValuesCache: context.get('inMemoryDomainForAvailableValuesCache'),
    booleanAvailableValuesDataProvider: context.get('booleanAvailableValuesDataProvider'),
    dataProviderWithSearchAndCacheForAvailableValues: context.get('dataProviderWithSearchAndCacheForAvailableValues'),
    availableValuesFirstRequestSuccessCache: context.get('availableValuesFirstRequestSuccessCache')
  }));
  context.register('availableValuesDataProvider', new AvailableValuesDataProvider({
    filtersDesignerViewStateModelService: context.get('filtersDesignerViewStateModelService'),
    booleanAvailableValuesDataProvider: context.get('booleanAvailableValuesDataProvider'),
    queryExecutionAvailableValuesDataProvider: context.get('dataProviderWithDraftFilterDecorator')
  }));
}

function createFiltersDesignerVueComponents(context, options) {
  var droppableMixinConfig = filtersDesignerDroppableAreaConfigMixinFactory.create({
    eventBus: context.get('filtersDesignerEventBus')
  });
  var VirtualData = Vue.extend(virtualDataVueConfigFactory.create({
    eventBus: context.get('filtersDesignerEventBus'),
    defaultHeight: options.filtersDesigner.height.canvas,
    debounce: options.virtualData.debounce
  }));
  var clickMenuDirective = clickMenuDirectiveFactory.create(ClickMenuWithEventsRetrigger, {
    menuOptionTemplate: menuItemWithOptionsTemplate,
    eventBus: context.get('filtersDesignerEventBus')
  });
  var filtersDesignerOptionsMenuConfig = optionsMenuVueConfigFactory.create({
    clickMenuDirective: clickMenuDirective,
    draftFilterOptionsMenuOptionsFactory: new DraftFilterOptionsMenuOptionsFactory({
      filterSupportsAlternativeValueEditorSpecification: filterSupportsAlternativeValueEditorSpecification,
      filterSupportsSwapOptionSpecification: filterSupportsSwapOptionSpecification,
      filterSupportsFieldToValueEditorSpecification: filterSupportsFieldToValueEditorSpecification
    })
  });
  var filtersDesignerOptionsMenuConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: filtersDesignerOptionsMenuConfig,
    dataNames: automationDataNameAttributesEnum.filtersDesigner.optionsMenu
  });
  var OptionsMenu = Vue.extend(filtersDesignerOptionsMenuConfigWithDataNameAttribute);
  var filtersDesignerCellActionsConfig = cellActionsVueConfigFactory.create({
    filtersDesignerEventBus: context.get('filtersDesignerEventBus')
  });
  var filtersDesignerCellActionsConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: filtersDesignerCellActionsConfig,
    dataNames: automationDataNameAttributesEnum.filtersDesigner.cellActions
  });
  var CellActions = Vue.extend(filtersDesignerCellActionsConfigWithDataNameAttribute);
  var FilterExpression = Vue.extend(filterExpressionVueConfigFactory.create({
    cellActions: CellActions
  }));
  var ComplexFilter = Vue.extend(complexFilterVueConfigFactory.create({
    cellActions: CellActions
  }));
  var FieldValueEditor = Vue.extend(fieldValueEditorVueConfigFactory.create({
    filtersDesignerEventBus: context.get('filtersDesignerEventBus'),
    store: context.get('filtersDesignerStore')
  }));
  var filtersDesignerTextInputValueEditorConfig = textInputValueEditorVueConfigFactory.create({
    filtersDesignerEventBus: context.get('filtersDesignerEventBus'),
    template: textInputValueEditorTemplate
  });
  var filtersDesignerTextInputValueEditorConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: filtersDesignerTextInputValueEditorConfig,
    dataNames: automationDataNameAttributesEnum.filtersDesigner.textInputValueEditor
  });
  var TextInputValueEditor = Vue.extend(filtersDesignerTextInputValueEditorConfigWithDataNameAttribute);
  var dateTimeInputValueEditorMixin = dateTimeInputValueEditorMixinFactory.create({
    dateAndTimePickerOptionsFactory: dateAndTimePickerOptionsFactory,
    filtersDesignerEventBus: context.get('filtersDesignerEventBus'),
    dateAndTimePicker: dateTimePickerDirectiveFactory.create({})
  });
  var dateTimeRangeValueEditorMixin = dateTimeRangeValueEditorMixinFactory.create({
    dateAndTimePickerOptionsFactory: dateAndTimePickerOptionsFactory,
    filtersDesignerEventBus: context.get('filtersDesignerEventBus'),
    dateAndTimePicker: dateTimePickerDirectiveFactory.create({})
  });
  var filtersDesignerDateTimeInputValueEditorConfig = textInputValueEditorVueConfigFactory.create({
    filtersDesignerEventBus: context.get('filtersDesignerEventBus'),
    store: context.get('filtersDesignerStore'),
    template: dateTimeInputValueEditorTemplate,
    mixins: [dateTimeInputValueEditorMixin]
  });
  var filtersDesignerDateTimeInputValueEditorConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: filtersDesignerDateTimeInputValueEditorConfig,
    dataNames: automationDataNameAttributesEnum.filtersDesigner.dateTimeInputValueEditor
  });
  var DateTimeInputValueEditor = Vue.extend(filtersDesignerDateTimeInputValueEditorConfigWithDataNameAttribute);
  var filtersDesignerDateTimeRangeValueEditorConfig = rangeValueEditorVueConfigFactory.create({
    filtersDesignerEventBus: context.get('filtersDesignerEventBus'),
    template: dateTimeRangeValueEditorTemplate,
    mixins: [dateTimeRangeValueEditorMixin]
  });
  var filtersDesignerDateTimeRangeValueEditorConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: filtersDesignerDateTimeRangeValueEditorConfig,
    dataNames: automationDataNameAttributesEnum.filtersDesigner.dateTimeRangeValueEditor
  });
  var DateTimeRangeValueEditor = Vue.extend(filtersDesignerDateTimeRangeValueEditorConfigWithDataNameAttribute);
  var onSelectListValuesSortFnConfig = {};
  onSelectListValuesSortFnConfig[genericTypesEnum.INTEGER] = multiSelectNumberValuesSortFn;
  onSelectListValuesSortFnConfig[genericTypesEnum.DECIMAL] = multiSelectNumberValuesSortFn;
  onSelectListValuesSortFnConfig[genericTypesEnum.BOOLEAN] = multiSelectBooleanValuesSortFn;
  onSelectListValuesSortFnConfig[genericTypesEnum.STRING] = multiSelectStringValuesSortFn;
  var MultiSelectValueEditor = Vue.extend(multiSelectValueEditorVueConfigFactory.create({
    onShowListValuesConverter: context.get('filtersDesignerOnShowListValuesConverter'),
    onSelectListValuesConverterConfig: context.get('onSelectListValuesConverterConfig'),
    onSelectListValuesSortFnConfig: onSelectListValuesSortFnConfig,
    filtersDesignerEventBus: context.get('filtersDesignerEventBus'),
    multiSelect: Vue.extend(multiSelectVueConfigFactory.create({
      multiSelectOptions: {
        heightAutoAdjustment: false,
        height: options.filtersDesigner.multiSelect.height,
        getData: context.get('availableValuesDataProvider').getData
      }
    }))
  }));
  var rangeValueEditorVueConfig = rangeValueEditorVueConfigFactory.create({
    template: rangeValueEditorTemplate,
    filtersDesignerEventBus: context.get('filtersDesignerEventBus'),
    store: context.get('filtersDesignerStore')
  });
  var rangeValueEditorVueConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: rangeValueEditorVueConfig,
    dataNames: automationDataNameAttributesEnum.filtersDesigner.rangeValueEditor
  });
  var RangeValueEditor = Vue.extend(rangeValueEditorVueConfigWithDataNameAttribute);
  var SingleSelectValueEditor = Vue.extend(singleSelectValueEditorVueConfigFactory.create({
    onShowListValuesConverter: context.get('filtersDesignerOnShowListValuesConverter'),
    onSelectListValuesConverterConfig: context.get('onSelectListValuesConverterConfig'),
    singleSelectLabelProvider: singleSelectLabelProvider,
    filtersDesignerEventBus: context.get('filtersDesignerEventBus'),
    singleSelect: Vue.extend(singleSelectVueConfigFactory.create({
      getData: context.get('availableValuesDataProvider').getData
    }))
  }));
  var filtersDesignerActionButtonsConfig = actionButtonsVueConfigFactory.create({
    filtersDesignerEventBus: context.get('filtersDesignerEventBus')
  });
  var filtersDesignerActionButtonsConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: filtersDesignerActionButtonsConfig,
    dataNames: automationDataNameAttributesEnum.filtersDesigner.actionButtons
  });
  var ActionButtons = Vue.extend(filtersDesignerActionButtonsConfigWithDataNameAttribute);
  var LeftOperand = Vue.extend(leftOperandVueConfigFactory.create({
    fieldValueEditor: FieldValueEditor
  }));
  var Operator = Vue.extend(operatorVueConfigFactory.create({
    availableOperatorOptionsConverter: new AvailableOperatorOptionsConverter({
      valueConverter: availableOperatorsValueConverter
    }),
    valueConverter: availableOperatorsValueConverter,
    filtersDesignerEventBus: context.get('filtersDesignerEventBus')
  }));
  var RightOperand = Vue.extend(rightOperandVueConfigFactory.create({
    fieldValueEditor: FieldValueEditor,
    textInputValueEditor: TextInputValueEditor,
    dateTimeInputValueEditor: DateTimeInputValueEditor,
    dateTimeRangeValueEditor: DateTimeRangeValueEditor,
    multiSelectValueEditor: MultiSelectValueEditor,
    rangeValueEditor: RangeValueEditor,
    singleSelectValueEditor: SingleSelectValueEditor,
    actionButtons: ActionButtons,
    filterSupportsAlternativeValueEditorSpecification: filterSupportsAlternativeValueEditorSpecification
  }));
  var DraftFilter = Vue.extend(draftFilterVueConfigFactory.create({
    optionsMenu: OptionsMenu,
    leftOperand: LeftOperand,
    operator: Operator,
    rightOperand: RightOperand
  }));
  var CanvasDroppableArea = Vue.extend(filtersDesignerCanvasDroppableAreaVueConfigFactory.create({
    mixins: [droppableMixinConfig]
  }));
  var filtersDesignerSearchConfig = searchVueConfigFactory.create({
    eventBus: context.get('filtersDesignerEventBus')
  });
  var filtersDesignerSearchConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: filtersDesignerSearchConfig,
    dataNames: automationDataNameAttributesEnum.filtersDesigner.search
  });
  var FiltersDesignerSearch = Vue.extend(filtersDesignerSearchConfigWithDataNameAttribute);
  var filtersDesignerVueConfig = filtersDesignerVueConfigFactory.create({
    filtersDesignerEventBus: context.get('filtersDesignerEventBus'),
    mixins: [droppableMixinConfig],
    data: context.get('filtersDesignerStore').attributes,
    canvasDroppableArea: CanvasDroppableArea,
    filterExpression: FilterExpression,
    complexFilter: ComplexFilter,
    draftFilter: DraftFilter,
    virtualData: VirtualData,
    filtersDesignerSearch: FiltersDesignerSearch
  });
  var filtersDesignerVueConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: filtersDesignerVueConfig,
    dataNames: automationDataNameAttributesEnum.filtersDesigner.table
  });
  context.register('filtersDesignerVueConfig', filtersDesignerVueConfigWithDataNameAttribute);
}

function createFiltersDesignerControllers(context, options) {
  context.register('filtersDesignerOnEditFilterConverter', new FiltersDesignerOnEditFilterConverter({
    filtersDesignerDraftFilterRightOperandConverter: context.get('filtersDesignerOnEditDraftFilterRightOperandConverter'),
    filtersDesignerDraftFilterFactory: context.get('filtersDesignerDraftFilterFactory'),
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    onEditDraftFilterOperandSourceProvider: new OnEditDraftFilterOperandSourceProvider({
      clientDomainSchemaService: context.get('clientDomainSchemaService')
    })
  }));
  context.register('filterExpressionOperatorByRightOperandTypeFactory', filterExpressionOperatorByRightOperandTypeFactory);
  context.register('onSaveDraftFilterSourceByExpressionProvider', new OnSaveDraftFilterSourceByExpressionProvider({
    clientDomainSchemaService: context.get('clientDomainSchemaService')
  }));
  context.register('filtersDesignerSearchViewController', new SearchComponentController({
    searchKeywordProvider: filtersDesignerSearchKeywordProvider,
    dispatcherEventName: applicationStateEventsEnum.FILTERS_DESIGNER_SET_SEARCH_KEYWORD,
    eventBus: context.get('filtersDesignerEventBus'),
    store: context.get('filtersDesignerStore'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    onChangeStateSearchStrategy: context.get('onChangeStateSearchStrategy')
  }));
  context.register('filtersDesignerOnSaveDraftFilterConverter', new FiltersDesignerOnSaveDraftFilterConverter({
    onSaveDraftFilterSourceByExpressionProvider: context.get('onSaveDraftFilterSourceByExpressionProvider'),
    filtersDesignerDraftFilterRightOperandConverter: context.get('filtersDesignerOnSaveDraftFilterRightOperandConverter')
  }));
  context.register('filtersDesignerDraftFilterController', new FiltersDesignerDraftFilterController({
    store: context.get('filtersDesignerStore'),
    filtersDesignerEventBus: context.get('filtersDesignerEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    filtersDesignerViewStateModelService: context.get('filtersDesignerViewStateModelService'),
    filtersDesignerOnSaveDraftFilterConverter: context.get('filtersDesignerOnSaveDraftFilterConverter'),
    filtersDesignerDraftFilterValidator: context.get('filtersDesignerDraftFilterValidator'),
    filtersDesignerDraftFilterFactory: context.get('filtersDesignerDraftFilterFactory'),
    filterExpressionOperatorByRightOperandTypeFactory: context.get('filterExpressionOperatorByRightOperandTypeFactory'),
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    availableValuesCacheCleaner: context.get('availableValuesCacheCleaner')
  }));
  context.register('filtersDesignerCreateDraftFilterByResourceController', new FiltersDesignerCreateDraftFilterByResourceController({
    isResourceDroppableIntoCanvasDroppableAreaSpecification: new IsResourceDroppableIntoCanvasDroppableAreaSpecification({}),
    filtersDesignerEventBus: context.get('filtersDesignerEventBus'),
    filtersDesignerStore: context.get('filtersDesignerStore'),
    filtersDesignerViewStateModelService: context.get('filtersDesignerViewStateModelService'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    filtersDesignerDraftFilterFactory: context.get('filtersDesignerDraftFilterFactory'),
    availableValuesCacheCleaner: context.get('availableValuesCacheCleaner')
  }));
  context.register('filtersDesignerSidebarSearchViewController', new SearchComponentController({
    eventBus: context.get('filtersDesignerSidebarSearchEventBus'),
    store: context.get('filtersDesignerSidebarSearchStore'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    searchKeywordProvider: context.get('filtersDesignerSidebarSearchKeywordProvider'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    dispatcherEventName: applicationStateEventsEnum.FILTERS_DESIGNER_SET_SIDEBAR_SEARCH_KEYWORD,
    onChangeStateSearchStrategy: context.get('onChangeStateSidebarSearchStrategy')
  }));
  context.register('filtersDesignerSidebarTreeSelectionProvider', new SidebarTreeSingleSelectionProvider({
    clientViewStateModelService: context.get('filtersDesignerViewStateModelService')
  }));
  context.register('filtersDesignerSidebarTreeController', new SidebarTreeController({
    selectionProvider: context.get('filtersDesignerSidebarTreeSelectionProvider'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    tree: context.get('filtersDesignerSidebarTree'),
    treeDataProvider: context.get('filtersDesignerSidebarTreeDataProvider'),
    model: context.get('filtersDesignerSidebarStore'),
    fetchTreeEventsBlacklist: filtersDesignerFetchTreeEventsBlacklistEnum
  }));
  context.register('filtersDesignerViewModelToStoreConverter', new FiltersDesignerViewModelToStoreConverter({
    filtersDesignerViewStateModelService: context.get('filtersDesignerViewStateModelService')
  }));
  context.register('filtersDesignerSidebarSelectionController', new FiltersDesignerSidebarSelectionController({
    filtersDesignerEventBus: context.get('filtersDesignerEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus')
  }));
  context.register('filtersDesignerController', new FiltersDesignerController({
    storeChangeEventBus: context.get('storeChangeEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    filtersDesignerEventBus: context.get('filtersDesignerEventBus'),
    filtersDesignerSchemaToViewModelConverter: context.get('filtersDesignerSchemaToViewModelConverter'),
    filtersDesignerViewModelToStoreConverter: context.get('filtersDesignerViewModelToStoreConverter'),
    cache: new SimpleCache({}),
    store: context.get('filtersDesignerStore'),
    filtersDesignerDraftFilterFactory: context.get('filtersDesignerDraftFilterFactory'),
    filtersDesignerOnEditFilterConverter: context.get('filtersDesignerOnEditFilterConverter'),
    clientDomainSchemaFiltersService: context.get('clientDomainSchemaFiltersService'),
    availableValuesCacheCleaner: context.get('availableValuesCacheCleaner'),
    notEmptyTablesSpecification: context.get('notEmptyTablesSpecification'),
    isResourceDroppableIntoCanvasDroppableAreaSpecification: new IsResourceDroppableIntoCanvasDroppableAreaSpecification({})
  }));
}

module.exports = function (context, options) {
  filtersDesignerValidationContextConfiguration(context, options);
  filtersDesignerConvertersContextConfiguration(context, options);
  createFiltersDesignerSpecifications(context, options);
  createFiltersDesignerConverters(context, options);
  createAvailableValuesDataProviders(context, options);
  createFiltersDesignerVueComponents(context, options);
  filtersDesignerDraftFilterFactoryConfiguration(context, options);
  createFiltersDesignerControllers(context, options);
};

});