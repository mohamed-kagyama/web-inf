define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var Dialog = require("runtime_dependencies/js-sdk/src/components/dialog/Dialog");

var SimpleCache = require("../../../../util/cache/SimpleCache");

var ConfirmationDialogView = require("../../../component/dialog/confirmation/view/ConfirmationDialogView");

var constantJoinExpressionEditorVueConfigFactory = require("../../../component/designer/joinsDesigner/dialog/constantJoinExpression/component/main/factory/constantJoinExpressionEditorVueConfigFactory");

var ConstantJoinExpressionConverter = require("../../../component/designer/joinsDesigner/converter/ConstantJoinExpressionConverter");

var JoinTreeOptionsMenuController = require("../../../component/designer/joinsDesigner/controller/JoinTreeOptionsMenuController");

var renameDialogFactory = require("../../../component/dialog/rename/factory/renameDialogFactory");

var renameJoinTreeDialogStoreFactory = require("../../../component/designer/joinsDesigner/dialog/store/renameJoinTreeDialogStoreFactory");

var ActionButton = require("../../../common/component/actionButton/ActionButton");

var InputErrorMessageWithVisibility = require("../../../common/component/inputErrorMessage/InputErrorMessageWithVisibility");

var Validation = require("../../../common/component/validation/Validation");

var compositeAndValidationRuleFactory = require("../../../common/factory/compositeAndValidationRuleFactory");

var addAutomationDataNameAttributeMixinFactory = require("../../../common/factory/addAutomationDataNameAttributeMixinFactory");

var automationDataNameAttributesEnum = require("../../../common/enum/automationDataNameAttributesEnum");

var applicationStateEventsEnum = require("../../../dispatcher/enum/applicationStateEventsEnum");

var joinsDesignerJoinConstructorFactory = require("../../../component/designer/joinsDesigner/factory/joinsDesignerJoinConstructorFactory");

var joinsDesignerDraftJoinTreeFactory = require("../../../component/designer/joinsDesigner/factory/joinsDesignerDraftJoinTreeFactory");

var SearchComponentController = require("../../../common/component/search/controller/SearchComponentController");

var JoinTreesController = require("../../../component/designer/joinsDesigner/controller/JoinTreesController");

var JoinsController = require("../../../component/designer/joinsDesigner/controller/JoinsController");

var JoinExpressionsController = require("../../../component/designer/joinsDesigner/controller/JoinExpressionsController");

var ConstantJoinExpressionsController = require("../../../component/designer/joinsDesigner/controller/ConstantJoinExpressionsController");

var ConstantJoinExpressionFactory = require("../../../component/designer/joinsDesigner/factory/ConstantJoinExpressionFactory");

var ConstantJoinExpressionValidator = require("../../../component/designer/joinsDesigner/dialog/constantJoinExpression/validator/ConstantJoinExpressionValidator");

var JoinsDesignerIsResourceDroppableIntoJoinTreeSpecification = require("../../../component/designer/joinsDesigner/specification/JoinsDesignerIsResourceDroppableIntoJoinTreeSpecification");

var JoinsDesignerIsResourceDroppableFieldSpecification = require("../../../component/designer/joinsDesigner/specification/JoinsDesignerIsResourceDroppableFieldSpecification");

var JoinsDesignerCanResourceParticipateInJoinSpecification = require("../../../component/designer/joinsDesigner/specification/JoinsDesignerCanResourceParticipateInJoinSpecification");

var JoinsDesignerShouldJoinConstructorRightDroppableAreaBeActiveSpecification = require("../../../component/designer/joinsDesigner/specification/JoinsDesignerShouldJoinConstructorRightDroppableAreaBeActiveSpecification");

var JoinsDesignerSchemaToViewModelConverter = require("../../../component/designer/joinsDesigner/converter/JoinsDesignerSchemaToViewModelConverter");

var JoinsDesignerViewModelToStoreConverter = require("../../../component/designer/joinsDesigner/converter/JoinsDesignerViewModelToStoreConverter");

var JoinsDesignerViewModelToVisibleDataConverter = require("../../../component/designer/joinsDesigner/converter/JoinsDesignerViewModelToVisibleDataConverter");

var JoinsDesignerVisibleDataToNestedStructureConverter = require("../../../component/designer/joinsDesigner/converter/JoinsDesignerVisibleDataToNestedStructureConverter");

var JoinsDesignerLastJoinTreePlaceholderHeightConverter = require("../../../component/designer/joinsDesigner/converter/JoinsDesignerLastJoinTreePlaceholderHeightConverter");

var joinConstructorEventsComputedMixin = require("../../../component/designer/joinsDesigner/component/joinConsturctor/mixin/joinConstructorEventsComputedMixin");

var draftJoinConstructorEventsComputedMixin = require("../../../component/designer/joinsDesigner/component/joinTree/mixin/draftJoinConstructorEventsComputedMixin");

var joinsDesignerJoinExpressionByJoinConstructorAndResourceFactory = require("../../../component/designer/joinsDesigner/factory/joinsDesignerJoinExpressionByJoinConstructorAndResourceFactory");

var JoinConstructorController = require("../../../component/designer/joinsDesigner/controller/JoinConstructorController");

var joinsDesignerSearchKeywordProvider = require("../../../component/designer/joinsDesigner/controller/provider/joinsDesignerSearchKeywordProvider");

var JoinsDesignerController = require("../../../component/designer/joinsDesigner/controller/JoinsDesignerController");

var i18n = require("bundle!DomainDesignerBundle");

var hoverMenuDirectiveFactory = require("../../../common/vue/directive/hoverMenuDirectiveFactory");

var HoverMenuWithEventsRetrigger = require("../../../common/menu/HoverMenuWithEventsRetrigger");

var clickMenuDirectiveFactory = require("../../../common/vue/directive/clickMenuDirectiveFactory");

var ClickMenuWithEventsRetrigger = require("../../../common/menu/ClickMenuWithEventsRetrigger");

var menuItemWithOptionsTemplate = require("text!../../../common/template/menuItemWithOptionsTemplate.htm");

var baseRenameDialogIsEmptyValidationRule = require("../../../component/designer/joinsDesigner/model/validation/baseRenameDialogIsEmptyValidationRule");

var joinTreeNameIsAlreadyExistsValidationRuleFactory = require("../../../component/designer/joinsDesigner/model/validation/joinTreeNameIsAlreadyExistsValidationRuleFactory");

var joinTreeNameContainsForbiddenCharactersValidationRuleFactory = require("../../../component/designer/joinsDesigner/model/validation/joinTreeNameContainsForbiddenCharactersValidationRuleFactory");

var JoinsDesignerIsDraftJoinTreeOrJoinConstructorExistSpecification = require("../../../component/designer/joinsDesigner/specification/JoinsDesignerIsDraftJoinTreeOrJoinConstructorExistSpecification");

var JoinsDesignerCanResourceBeReorderedSpecification = require("../../../component/designer/joinsDesigner/specification/JoinsDesignerCanResourceBeReorderedSpecification");

var JoinsDesignerIsResourceDroppableIntoJoinTreePlaceholderSpecification = require("../../../component/designer/joinsDesigner/specification/JoinsDesignerIsResourceDroppableIntoJoinTreePlaceholderSpecification");

var CreateDraftJoinTreeStrategy = require("../../../component/designer/joinsDesigner/strategy/CreateDraftJoinTreeStrategy");

var ReorderJoinTreeStrategy = require("../../../component/designer/joinsDesigner/strategy/ReorderJoinTreeStrategy");

var ReorderDraftJoinTreeStrategy = require("../../../component/designer/joinsDesigner/strategy/ReorderDraftJoinTreeStrategy");

var JoinsDesignerDraftJoinTreeController = require("../../../component/designer/joinsDesigner/controller/JoinsDesignerDraftJoinTreeController");

var JoinsDesignerInitialDropZoneController = require("../../../component/designer/joinsDesigner/controller/JoinsDesignerInitialDropZoneController");

var JoinsDesignerJoinTreePlaceholderController = require("../../../component/designer/joinsDesigner/controller/JoinsDesignerJoinTreePlaceholderController");

var joinsDesignerInitialDropZoneVueConfigFactory = require("../../../component/designer/joinsDesigner/component/initialDropZone/factory/joinsDesignerInitialDropZoneVueConfigFactory");

var joinsDesignerVueConfigFactory = require("../../../component/designer/joinsDesigner/component/main/factory/joinsDesignerVueConfigFactory");

var joinConstructorVueConfigFactory = require("../../../component/designer/joinsDesigner/component/joinConsturctor/factory/joinConstructorVueConfigFactory");

var droppableAreaVueConfigFactory = require("../../../component/designer/joinsDesigner/component/joinConsturctor/factory/droppableAreaVueConfigFactory");

var leftDropAreaComputedMixin = require("../../../component/designer/joinsDesigner/component/joinConsturctor/mixin/leftDropAreaComputedMixin");

var rightDropAreaComputedMixin = require("../../../component/designer/joinsDesigner/component/joinConsturctor/mixin/rightDropAreaComputedMixin");

var joinTreeVueConfigFactory = require("../../../component/designer/joinsDesigner/component/joinTree/factory/joinTreeVueConfigFactory");

var joinTreePlaceholderVueConfigFactory = require("../../../component/designer/joinsDesigner/component/joinTreePlaceholder/factory/joinTreePlaceholderVueConfigFactory");

var joinVueConfigFactory = require("../../../component/designer/joinsDesigner/component/join/factory/joinVueConfigFactory");

var joinMenuOptionsFactory = require("../../../component/designer/joinsDesigner/factory/joinMenuOptionsFactory");

var joinVueComputedMixin = require("../../../component/designer/joinsDesigner/component/join/mixin/joinVueComputedMixin");

var joinVueMethodsMixinFactory = require("../../../component/designer/joinsDesigner/component/join/mixin/joinVueMethodsMixinFactory");

var joinTreeMenuOptionsFactory = require("../../../component/designer/joinsDesigner/factory/joinTreeMenuOptionsFactory");

var draftJoinTreeMenuOptionsFactory = require("../../../component/designer/joinsDesigner/factory/draftJoinTreeMenuOptionsFactory");

var joinExpressionVueConfigFactory = require("../../../component/designer/joinsDesigner/component/joinExpression/factory/joinExpressionVueConfigFactory");

var constantJoinExpressionVueConfigFactory = require("../../../component/designer/joinsDesigner/component/constantJoinExpression/factory/constantJoinExpressionVueConfigFactory");

var constantJoinExpressionMenuOptionsFactory = require("../../../component/designer/joinsDesigner/factory/constantJoinExpressionMenuOptionsFactory");

var tooltipDirectiveFactory = require("../../../common/component/tooltip/directive/tooltipDirectiveFactory");

var lazyDroppableDirective = require("../../../common/vue/directive/lazyDroppableDirective");

var lazyDraggableDirective = require("../../../common/vue/directive/lazyDraggableDirective");

var droppableJoinTreeMixinFactory = require("../../../component/designer/joinsDesigner/component/joinTree/mixin/droppableJoinTreeMixinFactory");

var joinTreeMethodsMixinFactory = require("../../../component/designer/joinsDesigner/component/joinTree/mixin/joinTreeMethodsMixinFactory");

var droppableDraftJoinTreeMixin = require("../../../component/designer/joinsDesigner/component/joinTree/mixin/droppableDraftJoinTreeMixin");

var draftJoinTreeMethodsMixinFactory = require("../../../component/designer/joinsDesigner/component/joinTree/mixin/draftJoinTreeMethodsMixinFactory");

var draftJoinTreeJoinMethodsMixinFactory = require("../../../component/designer/joinsDesigner/component/joinTree/mixin/draftJoinTreeJoinMethodsMixinFactory");

var complexJoinHeaderVueConfigFactory = require("../../../component/designer/joinsDesigner/component/complexJoinHeader/factory/complexJoinHeaderVueConfigFactory");

var complexJoinExpressionVueConfigFactory = require("../../../component/designer/joinsDesigner/component/complexJoinExpression/factory/complexJoinExpressionVueConfigFactory");

var joinAliasVueConfigFactory = require("../../../component/designer/joinsDesigner/component/joinAlias/factory/joinAliasVueConfigFactory");

var searchVueConfigFactory = require("../../../common/component/search/factory/searchVueConfigFactory");

var virtualDataVueConfigFactory = require("../../../common/component/virtualData/virtualDataVueConfigFactory");

var VirtualDataAutoScrollController = require("../../../common/controller/VirtualDataAutoScrollController");

var joinsDesignerJoinsGenerationContextConfiguration = require("./joinsDesignerJoinsGenerationContextConfiguration");

var AttentionDialogStore = require("../../../component/dialog/attentionDialog/store/AttentionDialogStore");

var attentionDialogVueConfigFactory = require("../../../component/dialog/attentionDialog/factory/attentionDialogVueConfigFactory");

var genericNotificationDialogVueConfigFactory = require("../../../component/dialog/genericNotificationDialog/factory/genericNotificationDialogVueConfigFactory");

var CannotCreateJoinAttentionDialogController = require("../../../component/designer/joinsDesigner/controller/CannotCreateJoinAttentionDialogController");

var JoinsDesignerIsFieldUsedInSingleTableDataIslandSpecification = require("../../../component/designer/joinsDesigner/specification/JoinsDesignerIsFieldUsedInSingleTableDataIslandSpecification");

var OpenCannotCreateJoinAttentionDialogStrategy = require("../../../component/designer/joinsDesigner/strategy/OpenCannotCreateJoinAttentionDialogStrategy");

var cannotCreateJoinAttentionDialogMessageFactory = require("../../../component/designer/joinsDesigner/factory/cannotCreateJoinAttentionDialogMessageFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createJoinsDesignerSpecification(context, options) {
  context.register('joinsDesignerIsResourceDroppableFieldSpecification', new JoinsDesignerIsResourceDroppableFieldSpecification({
    clientDomainSchemaCalcFieldsService: context.get('clientDomainSchemaCalcFieldsService')
  }));
  context.register('joinsDesignerCanResourceParticipateInJoinSpecification', new JoinsDesignerCanResourceParticipateInJoinSpecification({
    isResourceDroppableFieldSpecification: context.get('joinsDesignerIsResourceDroppableFieldSpecification')
  }));
  context.register('joinsDesignerIsDraftJoinTreeOrJoinConstructorExistSpecification', new JoinsDesignerIsDraftJoinTreeOrJoinConstructorExistSpecification({
    joinsDesignerViewStateModelService: context.get('joinsDesignerViewStateModelService')
  }));
  context.register('joinsDesignerIsResourceDroppableIntoJoinTreeSpecification', new JoinsDesignerIsResourceDroppableIntoJoinTreeSpecification({
    isDraftJoinTreeOrJoinConstructorExistSpecification: context.get('joinsDesignerIsDraftJoinTreeOrJoinConstructorExistSpecification'),
    canResourceParticipateInJoinSpecification: context.get('joinsDesignerCanResourceParticipateInJoinSpecification')
  }));
  context.register('joinsDesignerShouldJoinConstructorRightDroppableAreaBeActiveSpecification', new JoinsDesignerShouldJoinConstructorRightDroppableAreaBeActiveSpecification({
    domainSchemaSpecification: context.get('domainSchemaSpecification'),
    canResourceParticipateInJoinSpecification: context.get('joinsDesignerCanResourceParticipateInJoinSpecification')
  }));
  context.register('joinsDesignerCanResourceBeReorderedSpecification', new JoinsDesignerCanResourceBeReorderedSpecification());
  context.register('joinsDesignerIsResourceDroppableIntoJoinTreePlaceholderSpecification', new JoinsDesignerIsResourceDroppableIntoJoinTreePlaceholderSpecification({
    isDraftJoinTreeOrJoinConstructorExistSpecification: context.get('joinsDesignerIsDraftJoinTreeOrJoinConstructorExistSpecification'),
    canResourceParticipateInJoinSpecification: context.get('joinsDesignerCanResourceParticipateInJoinSpecification'),
    canResourceBeReorderedSpecification: context.get('joinsDesignerCanResourceBeReorderedSpecification')
  }));
}

function createJoinsDesignerSchemaToViewModelConverter(context, options) {
  var converter = new JoinsDesignerSchemaToViewModelConverter({
    settings: options.joinsDesigner,
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    joinsDesignerViewStateModelService: context.get('joinsDesignerViewStateModelService'),
    advancedJoinsMappingSpecification: context.get('advancedJoinsMappingSpecification'),
    shouldJoinConstructorRightDroppableAreaBeActiveSpecification: context.get('joinsDesignerShouldJoinConstructorRightDroppableAreaBeActiveSpecification')
  });
  context.register('joinsDesignerSchemaToViewModelConverter', converter);
}

function createJoinsDesignerViewModelToStoreConverter(context, options) {
  var converter = new JoinsDesignerViewModelToStoreConverter({
    converters: [new JoinsDesignerViewModelToVisibleDataConverter(), new JoinsDesignerLastJoinTreePlaceholderHeightConverter(), new JoinsDesignerVisibleDataToNestedStructureConverter()]
  });
  context.register('joinsDesignerViewModelToStoreConverter', converter);
}

function createJoinsDesignerViews(context, options) {
  context.register('renameJoinTreeValidator', compositeAndValidationRuleFactory.create([baseRenameDialogIsEmptyValidationRule, joinTreeNameIsAlreadyExistsValidationRuleFactory.create({
    domainSchemaSpecification: context.get('domainSchemaSpecification')
  }), joinTreeNameContainsForbiddenCharactersValidationRuleFactory.create({
    domainSchemaGranularSpecs: context.get('domainSchemaGranularSpecs')
  })]));
  context.register('renameJoinTreeDialogStore', renameJoinTreeDialogStoreFactory.create());
  context.register('renameJoinTreeDialog', renameDialogFactory.create({
    store: context.get('renameJoinTreeDialogStore'),
    components: {
      actionButton: ActionButton,
      inputErrorMessage: InputErrorMessageWithVisibility
    },
    dataNameAttrs: automationDataNameAttributesEnum.joinsDesigner.renameJoinTreeDialog
  }));
  context.register('renameDraftJoinTreeDialogStore', renameJoinTreeDialogStoreFactory.create());
  context.register('renameDraftJoinTreeDialog', renameDialogFactory.create({
    store: context.get('renameDraftJoinTreeDialogStore'),
    components: {
      actionButton: ActionButton,
      inputErrorMessage: InputErrorMessageWithVisibility
    },
    dataNameAttrs: automationDataNameAttributesEnum.joinsDesigner.renameJoinTreeDialog
  }));
  var joinsDesignerConstantJoinExpressionDialogConfig = constantJoinExpressionEditorVueConfigFactory.create({
    store: context.get('constantJoinExpressionDialogStore'),
    eventBus: context.get('joinsDesignerEventBus'),
    ActionButton: ActionButton,
    Validation: Validation,
    selectOptionsWithAdditionalPropsFactory: context.get('selectOptionsWithAdditionalPropsFactory')
  });
  var joinsDesignerConstantJoinExpressionDialogConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: joinsDesignerConstantJoinExpressionDialogConfig,
    dataNames: automationDataNameAttributesEnum.joinsDesigner.constantJoinExpressionDialog
  });
  var ConstantJoinExpressionDialogVue = Vue.extend(joinsDesignerConstantJoinExpressionDialogConfigWithDataNameAttribute);
  context.register('constantJoinExpressionDialogVue', new ConstantJoinExpressionDialogVue());
  context.register('constantJoinExpressionDialog', new Dialog({
    el: context.get('constantJoinExpressionDialogVue').$mount().$el
  }));
  var hoverMenuDirective = hoverMenuDirectiveFactory.create(HoverMenuWithEventsRetrigger, {
    eventBus: context.get('joinsDesignerEventBus'),
    menuOptionTemplate: menuItemWithOptionsTemplate
  });
  var clickMenuDirective = clickMenuDirectiveFactory.create(ClickMenuWithEventsRetrigger, {
    eventBus: context.get('joinsDesignerEventBus'),
    menuOptionTemplate: menuItemWithOptionsTemplate
  });
  var joinVueMethodsMixin = joinVueMethodsMixinFactory.create({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus')
  });
  var draftJoinTreeJoinMethodsMixin = draftJoinTreeJoinMethodsMixinFactory.create({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus')
  });
  var joinsDesignerJoinConfig = joinVueConfigFactory.create({
    joinMenuOptionsFactory: joinMenuOptionsFactory,
    clickMenuDirective: clickMenuDirective,
    mixins: [joinVueComputedMixin, joinVueMethodsMixin],
    joinsDesignerEventBus: context.get('joinsDesignerEventBus')
  });
  var joinsDesignerJoinConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: joinsDesignerJoinConfig,
    dataNames: automationDataNameAttributesEnum.joinsDesigner.join
  });
  var Join = Vue.extend(joinsDesignerJoinConfigWithDataNameAttribute);
  var joinsDesignerDraftJoinConfig = joinVueConfigFactory.create({
    joinMenuOptionsFactory: joinMenuOptionsFactory,
    hoverMenuDirective: hoverMenuDirective,
    mixins: [joinVueComputedMixin, joinVueMethodsMixin, draftJoinTreeJoinMethodsMixin],
    joinsDesignerEventBus: context.get('joinsDesignerEventBus')
  });
  var joinsDesignerDraftJoinConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: joinsDesignerDraftJoinConfig,
    dataNames: automationDataNameAttributesEnum.joinsDesigner.join
  });
  var DraftJoin = Vue.extend(joinsDesignerDraftJoinConfigWithDataNameAttribute);
  var joinsDesignerJoinExpressionConfig = joinExpressionVueConfigFactory.create({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus')
  });
  var joinsDesignerJoinExpressionConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: joinsDesignerJoinExpressionConfig,
    dataNames: automationDataNameAttributesEnum.joinsDesigner.joinExpression
  });
  var JoinExpression = Vue.extend(joinsDesignerJoinExpressionConfigWithDataNameAttribute);
  var joinsDesignerConstantJoinExpressionConfig = constantJoinExpressionVueConfigFactory.create({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    hoverMenuDirective: hoverMenuDirective,
    constantJoinExpressionMenuOptionsFactory: constantJoinExpressionMenuOptionsFactory
  });
  var joinsDesignerConstantJoinExpressionConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: joinsDesignerConstantJoinExpressionConfig,
    dataNames: automationDataNameAttributesEnum.joinsDesigner.constantJoinExpression
  });
  var ConstantJoinExpression = Vue.extend(joinsDesignerConstantJoinExpressionConfigWithDataNameAttribute);
  var joinsDesignerComplexJoinHeaderConfig = complexJoinHeaderVueConfigFactory.create({
    mixins: [joinVueComputedMixin, joinVueMethodsMixin],
    joinsDesignerEventBus: context.get('joinsDesignerEventBus')
  });
  var joinsDesignerComplexJoinExpressionConfig = complexJoinExpressionVueConfigFactory.create({
    mixins: [joinVueComputedMixin, joinVueMethodsMixin],
    joinsDesignerEventBus: context.get('joinsDesignerEventBus')
  });
  var joinsDesignerComplexJoinHeaderConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: joinsDesignerComplexJoinHeaderConfig,
    dataNames: automationDataNameAttributesEnum.joinsDesigner.complexJoinHeader
  });
  var joinsDesignerComplexJoinExpressionConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: joinsDesignerComplexJoinExpressionConfig,
    dataNames: automationDataNameAttributesEnum.joinsDesigner.complexJoinExpression
  });
  var ComplexJoinHeader = Vue.extend(joinsDesignerComplexJoinHeaderConfigWithDataNameAttribute);
  var ComplexJoinExpression = Vue.extend(joinsDesignerComplexJoinExpressionConfigWithDataNameAttribute);
  var joinsDesignerJoinAliasConfig = joinAliasVueConfigFactory.create({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus')
  });
  var joinsDesignerJoinAliasConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: joinsDesignerJoinAliasConfig,
    dataNames: automationDataNameAttributesEnum.joinsDesigner.joinAlias
  });
  var JoinAlias = Vue.extend(joinsDesignerJoinAliasConfigWithDataNameAttribute);
  var joinsDesignerConfig = searchVueConfigFactory.create({
    eventBus: context.get('joinsDesignerEventBus')
  });
  var joinsDesignerConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: joinsDesignerConfig,
    dataNames: automationDataNameAttributesEnum.joinsDesigner.search
  });
  var JoinsDesignerSearch = Vue.extend(joinsDesignerConfigWithDataNameAttribute);
  var VirtualData = Vue.extend(virtualDataVueConfigFactory.create({
    eventBus: context.get('joinsDesignerEventBus'),
    defaultHeight: options.joinsDesigner.height.canvas,
    debounce: options.virtualData.debounce
  }));
  var LeftDroppableArea = Vue.extend(droppableAreaVueConfigFactory.create({
    mixins: [leftDropAreaComputedMixin]
  }));
  var RightDroppableArea = Vue.extend(droppableAreaVueConfigFactory.create({
    mixins: [rightDropAreaComputedMixin]
  }));
  var JoinConstructor = Vue.extend(joinConstructorVueConfigFactory.create({
    LeftDroppableArea: LeftDroppableArea,
    RightDroppableArea: RightDroppableArea,
    mixins: [joinConstructorEventsComputedMixin],
    joinsDesignerEventBus: context.get('joinsDesignerEventBus')
  }));
  var DraftJoinTreeJoinConstructor = Vue.extend(joinConstructorVueConfigFactory.create({
    LeftDroppableArea: LeftDroppableArea,
    RightDroppableArea: RightDroppableArea,
    mixins: [draftJoinConstructorEventsComputedMixin],
    joinsDesignerEventBus: context.get('joinsDesignerEventBus')
  }));
  var tooltipDirective = tooltipDirectiveFactory.create();
  var joinTreeDesignerConfig = joinTreeVueConfigFactory.create({
    Join: Join,
    JoinExpression: JoinExpression,
    ConstantJoinExpression: ConstantJoinExpression,
    ComplexJoinExpression: ComplexJoinExpression,
    ComplexJoinHeader: ComplexJoinHeader,
    JoinAlias: JoinAlias,
    JoinConstructor: JoinConstructor,
    tooltipDirective: tooltipDirective,
    tooltipOffset: options.tooltip.offset,
    lazyDroppableDirective: lazyDroppableDirective,
    lazyDraggableDirective: lazyDraggableDirective,
    mixins: [droppableJoinTreeMixinFactory.create({
      joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
      isResourceDroppableIntoJoinTreeSpecification: context.get('joinsDesignerIsResourceDroppableIntoJoinTreeSpecification')
    }), joinTreeMethodsMixinFactory.create({
      joinsDesignerEventBus: context.get('joinsDesignerEventBus')
    })],
    clickMenuDirective: clickMenuDirective,
    joinTreeMenuOptionsFactory: joinTreeMenuOptionsFactory
  });
  var joinsTreeConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: joinTreeDesignerConfig,
    dataNames: automationDataNameAttributesEnum.joinsDesigner.joinTree
  });
  var JoinTree = Vue.extend(joinsTreeConfigWithDataNameAttribute);
  var draftJoinTreeVueConfig = joinTreeVueConfigFactory.create({
    Join: DraftJoin,
    JoinExpression: JoinExpression,
    ConstantJoinExpression: ConstantJoinExpression,
    ComplexJoinExpression: ComplexJoinExpression,
    ComplexJoinHeader: ComplexJoinHeader,
    JoinAlias: JoinAlias,
    JoinConstructor: DraftJoinTreeJoinConstructor,
    tooltipDirective: tooltipDirective,
    tooltipOffset: options.tooltip.offset,
    lazyDroppableDirective: lazyDroppableDirective,
    lazyDraggableDirective: lazyDraggableDirective,
    mixins: [droppableDraftJoinTreeMixin, draftJoinTreeMethodsMixinFactory.create({
      joinsDesignerEventBus: context.get('joinsDesignerEventBus')
    })],
    hoverMenuDirective: hoverMenuDirective,
    joinTreeMenuOptionsFactory: draftJoinTreeMenuOptionsFactory
  });
  var draftJoinTreeConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: draftJoinTreeVueConfig,
    dataNames: automationDataNameAttributesEnum.joinsDesigner.joinTree
  });
  var DraftJoinTree = Vue.extend(draftJoinTreeConfigWithDataNameAttribute);
  var JoinTreePlaceholder = Vue.extend(joinTreePlaceholderVueConfigFactory.create({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    lazyDroppableDirective: lazyDroppableDirective,
    isResourceDroppableIntoJoinTreePlaceholderSpecification: context.get('joinsDesignerIsResourceDroppableIntoJoinTreePlaceholderSpecification')
  }));
  var JoinsDesignerInitialDropZone = Vue.extend(joinsDesignerInitialDropZoneVueConfigFactory.create({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus')
  }));
  var joinsDesignerVueConfig = joinsDesignerVueConfigFactory.create({
    data: context.get('joinsDesignerStore').attributes,
    JoinTree: JoinTree,
    DraftJoinTree: DraftJoinTree,
    JoinTreePlaceholder: JoinTreePlaceholder,
    JoinsDesignerSearch: JoinsDesignerSearch,
    VirtualData: VirtualData,
    InitialDropZone: JoinsDesignerInitialDropZone
  });
  var joinsDesignerVueConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: joinsDesignerVueConfig,
    dataNames: automationDataNameAttributesEnum.joinsDesigner.table
  });
  context.register('joinsDesignerVueConfig', joinsDesignerVueConfigWithDataNameAttribute);
}

function createJoinsDesignerControllers(context, options) {
  context.register('joinsDesignerCanvasAutoScrollBySidebarDraggableController', new VirtualDataAutoScrollController({
    store: context.get('joinsDesignerStore'),
    eventBus: context.get('joinsDesignerEventBus'),
    dragEvent: 'sidebar:drag',
    dragStopEvent: 'sidebar:dragStop',
    autoScrollAreaTopOffset: options.autoScroll.autoScrollAreaTopOffset,
    autoScrollAreaBottomOffset: options.autoScroll.autoScrollAreaBottomOffset,
    autoScrollStep: options.autoScroll.autoScrollStep,
    autoScrollTimeout: options.autoScroll.autoScrollTimeout,
    autoScrollThrottle: options.autoScroll.autoScrollThrottle
  }));
  context.register('joinsDesignerSearchViewController', new SearchComponentController({
    searchKeywordProvider: joinsDesignerSearchKeywordProvider,
    dispatcherEventName: applicationStateEventsEnum.JOINS_DESIGNER_SET_SEARCH_KEYWORD,
    eventBus: context.get('joinsDesignerEventBus'),
    store: context.get('joinsDesignerStore'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    onChangeStateSearchStrategy: context.get('onChangeStateSearchStrategy')
  }));
  context.register('joinTreeOptionsMenuController', new JoinTreeOptionsMenuController({
    renameJoinTreeDialog: context.get('renameJoinTreeDialog'),
    renameJoinTreeDialogStore: context.get('renameJoinTreeDialogStore'),
    renameJoinTreeValidator: context.get('renameJoinTreeValidator'),
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    advancedJoinsMappingSpecification: context.get('advancedJoinsMappingSpecification')
  }));
  context.register('cannotCreateJoinAttentionDialogStore', new AttentionDialogStore());
  var GenericNotificationDialog = Vue.extend(genericNotificationDialogVueConfigFactory.create({
    actionButton: ActionButton
  }));
  var attentionDialogVueConfig = attentionDialogVueConfigFactory.create({
    genericNotificationDialog: GenericNotificationDialog,
    store: context.get('cannotCreateJoinAttentionDialogStore').attributes,
    event: 'attentionDialog:close',
    eventBus: context.get('joinsDesignerEventBus')
  });
  var attentionDialogVueConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: attentionDialogVueConfig,
    dataNames: automationDataNameAttributesEnum.joinsDesigner.attentionDialog
  });
  var CannotCreateJoinAttentionDialogVue = Vue.extend(attentionDialogVueConfigWithDataNameAttribute);
  var cannotCreateJoinAttentionDialogVue = new CannotCreateJoinAttentionDialogVue();
  context.register('cannotCreateJoinAttentionDialog', new Dialog({
    el: cannotCreateJoinAttentionDialogVue.$mount().$el
  }));
  context.register('cannotCreateJoinAttentionDialogController', new CannotCreateJoinAttentionDialogController({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    attentionDialog: context.get('cannotCreateJoinAttentionDialog')
  }));
  context.register('joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification', new JoinsDesignerIsFieldUsedInSingleTableDataIslandSpecification({
    clientDomainSchemaService: context.get('clientDomainSchemaService')
  }));
  context.register('openCannotCreateJoinAttentionDialogStrategy', new OpenCannotCreateJoinAttentionDialogStrategy({
    attentionDialog: context.get('cannotCreateJoinAttentionDialog'),
    attentionDialogStore: context.get('cannotCreateJoinAttentionDialogStore'),
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    cannotCreateJoinAttentionDialogMessageFactory: cannotCreateJoinAttentionDialogMessageFactory
  }));
  context.register('joinTreesController', new JoinTreesController({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    joinConstructorFactory: joinsDesignerJoinConstructorFactory,
    openCannotCreateJoinAttentionDialogStrategy: context.get('openCannotCreateJoinAttentionDialogStrategy'),
    joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification: context.get('joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification')
  }));
  context.register('joinConstructorController', new JoinConstructorController({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    joinExpressionByJoinConstructorAndResourceFactory: joinsDesignerJoinExpressionByJoinConstructorAndResourceFactory,
    openCannotCreateJoinAttentionDialogStrategy: context.get('openCannotCreateJoinAttentionDialogStrategy'),
    joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification: context.get('joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification')
  }));
  context.register('constantJoinExpressionConverter', new ConstantJoinExpressionConverter({
    selectOptionClassName: options.dialogs.constantJoinExpressionEditor.selectOptionClassName
  }));
  context.register('joinsController', new JoinsController({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    selectOptionsWithAdditionalPropsFactory: context.get('selectOptionsWithAdditionalPropsFactory'),
    constantJoinExpressionDialogStore: context.get('constantJoinExpressionDialogStore'),
    constantJoinExpressionDialog: context.get('constantJoinExpressionDialog'),
    constantJoinExpressionConverter: context.get('constantJoinExpressionConverter')
  }));
  context.register('joinExpressionsController', new JoinExpressionsController({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    joinsDesignerEventBus: context.get('joinsDesignerEventBus')
  }));
  context.register('saveConstantJoinConfirmationDialog', new ConfirmationDialogView({
    yesLabel: i18n['button.ok'],
    noLabel: i18n['button.no'],
    dataNameAttrs: automationDataNameAttributesEnum.joinsDesigner.saveConstantJoinConfirmationDialog
  }));
  context.register('constantJoinExpressionValidator', new ConstantJoinExpressionValidator({
    validationService: context.get('validationServiceWrappedWithDoNotHandle400ErrorsNotification')
  }));
  context.register('constantJoinExpressionFactory', new ConstantJoinExpressionFactory({
    clientDomainSchemaService: context.get('clientDomainSchemaService')
  }));
  context.register('constantJoinExpressionsController', new ConstantJoinExpressionsController({
    saveConstantJoinConfirmationDialog: context.get('saveConstantJoinConfirmationDialog'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    constantJoinExpressionDialog: context.get('constantJoinExpressionDialog'),
    selectOptionsWithAdditionalPropsFactory: context.get('selectOptionsWithAdditionalPropsFactory'),
    constantJoinExpressionDialogStore: context.get('constantJoinExpressionDialogStore'),
    constantJoinExpressionConverter: context.get('constantJoinExpressionConverter'),
    constantJoinExpressionValidator: context.get('constantJoinExpressionValidator'),
    constantJoinExpressionFactory: context.get('constantJoinExpressionFactory'),
    clientDomainSchemaJoinsDesignerService: context.get('clientDomainSchemaJoinsDesignerService')
  }));
  context.register('createDraftJoinTreeStrategy', new CreateDraftJoinTreeStrategy({
    draftJoinTreeFactory: joinsDesignerDraftJoinTreeFactory,
    joinConstructorFactory: joinsDesignerJoinConstructorFactory,
    clientDomainSchemaJoinsDesignerService: context.get('clientDomainSchemaJoinsDesignerService'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus')
  }));
  context.register('joinsDesignerInitialDropZoneController', new JoinsDesignerInitialDropZoneController({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    createDraftJoinTreeStrategy: context.get('createDraftJoinTreeStrategy'),
    openCannotCreateJoinAttentionDialogStrategy: context.get('openCannotCreateJoinAttentionDialogStrategy'),
    joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification: context.get('joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification')
  }));
  context.register('reorderJoinTreeStrategy', new ReorderJoinTreeStrategy({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus')
  }));
  context.register('reorderDraftJoinTreeStrategy', new ReorderDraftJoinTreeStrategy({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    joinsDesignerViewStateModelService: context.get('joinsDesignerViewStateModelService')
  }));
  context.register('joinsDesignerJoinTreePlaceholderController', new JoinsDesignerJoinTreePlaceholderController({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    createDraftJoinTreeStrategy: context.get('createDraftJoinTreeStrategy'),
    reorderJoinTreeStrategy: context.get('reorderJoinTreeStrategy'),
    reorderDraftJoinTreeStrategy: context.get('reorderDraftJoinTreeStrategy'),
    openCannotCreateJoinAttentionDialogStrategy: context.get('openCannotCreateJoinAttentionDialogStrategy'),
    joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification: context.get('joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification')
  }));
  context.register('joinsDesignerDraftJoinTreeController', new JoinsDesignerDraftJoinTreeController({
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    advancedJoinsMappingSpecification: context.get('advancedJoinsMappingSpecification'),
    renameDraftJoinTreeDialog: context.get('renameDraftJoinTreeDialog'),
    renameDraftJoinTreeDialogStore: context.get('renameDraftJoinTreeDialogStore'),
    renameJoinTreeValidator: context.get('renameJoinTreeValidator'),
    joinsDesignerViewStateModelService: context.get('joinsDesignerViewStateModelService'),
    joinExpressionByJoinConstructorAndResourceFactory: joinsDesignerJoinExpressionByJoinConstructorAndResourceFactory,
    openCannotCreateJoinAttentionDialogStrategy: context.get('openCannotCreateJoinAttentionDialogStrategy'),
    joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification: context.get('joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification')
  }));
  context.register('joinsDesignerStateController', new JoinsDesignerController({
    storeChangeEventBus: context.get('storeChangeEventBus'),
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    notEmptyTablesSpecification: context.get('notEmptyTablesSpecification'),
    store: context.get('joinsDesignerStore'),
    cache: new SimpleCache(),
    joinsDesignerViewModelToStoreConverter: context.get('joinsDesignerViewModelToStoreConverter'),
    joinsDesignerSchemaToViewModelConverter: context.get('joinsDesignerSchemaToViewModelConverter'),
    isResourceDroppableFieldSpecification: context.get('joinsDesignerIsResourceDroppableFieldSpecification')
  }));
}

module.exports = function (context, options) {
  createJoinsDesignerSpecification(context, options);
  createJoinsDesignerSchemaToViewModelConverter(context, options);
  createJoinsDesignerViewModelToStoreConverter(context, options);
  createJoinsDesignerViews(context, options);
  createJoinsDesignerControllers(context, options);
  joinsDesignerJoinsGenerationContextConfiguration(context, options);
};

});