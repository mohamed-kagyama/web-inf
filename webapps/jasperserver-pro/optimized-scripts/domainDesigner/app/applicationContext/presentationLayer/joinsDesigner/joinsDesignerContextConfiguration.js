/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","vue","runtime_dependencies/js-sdk/src/components/dialog/Dialog","../../../../util/cache/SimpleCache","../../../component/dialog/confirmation/view/ConfirmationDialogView","../../../component/designer/joinsDesigner/dialog/constantJoinExpression/component/main/factory/constantJoinExpressionEditorVueConfigFactory","../../../component/designer/joinsDesigner/converter/ConstantJoinExpressionConverter","../../../component/designer/joinsDesigner/controller/JoinTreeOptionsMenuController","../../../component/dialog/rename/factory/renameDialogFactory","../../../component/designer/joinsDesigner/dialog/store/renameJoinTreeDialogStoreFactory","../../../common/component/actionButton/ActionButton","../../../common/component/inputErrorMessage/InputErrorMessageWithVisibility","../../../common/component/validation/Validation","../../../common/factory/compositeAndValidationRuleFactory","../../../common/factory/addAutomationDataNameAttributeMixinFactory","../../../common/enum/automationDataNameAttributesEnum","../../../dispatcher/enum/applicationStateEventsEnum","../../../component/designer/joinsDesigner/factory/joinsDesignerJoinConstructorFactory","../../../component/designer/joinsDesigner/factory/joinsDesignerDraftJoinTreeFactory","../../../common/component/search/controller/SearchComponentController","../../../component/designer/joinsDesigner/controller/JoinTreesController","../../../component/designer/joinsDesigner/controller/JoinsController","../../../component/designer/joinsDesigner/controller/JoinExpressionsController","../../../component/designer/joinsDesigner/controller/ConstantJoinExpressionsController","../../../component/designer/joinsDesigner/factory/ConstantJoinExpressionFactory","../../../component/designer/joinsDesigner/dialog/constantJoinExpression/validator/ConstantJoinExpressionValidator","../../../component/designer/joinsDesigner/specification/JoinsDesignerIsResourceDroppableIntoJoinTreeSpecification","../../../component/designer/joinsDesigner/specification/JoinsDesignerIsResourceDroppableFieldSpecification","../../../component/designer/joinsDesigner/specification/JoinsDesignerCanResourceParticipateInJoinSpecification","../../../component/designer/joinsDesigner/specification/JoinsDesignerShouldJoinConstructorRightDroppableAreaBeActiveSpecification","../../../component/designer/joinsDesigner/converter/JoinsDesignerSchemaToViewModelConverter","../../../component/designer/joinsDesigner/converter/JoinsDesignerViewModelToStoreConverter","../../../component/designer/joinsDesigner/converter/JoinsDesignerViewModelToVisibleDataConverter","../../../component/designer/joinsDesigner/converter/JoinsDesignerVisibleDataToNestedStructureConverter","../../../component/designer/joinsDesigner/converter/JoinsDesignerLastJoinTreePlaceholderHeightConverter","../../../component/designer/joinsDesigner/component/joinConsturctor/mixin/joinConstructorEventsComputedMixin","../../../component/designer/joinsDesigner/component/joinTree/mixin/draftJoinConstructorEventsComputedMixin","../../../component/designer/joinsDesigner/factory/joinsDesignerJoinExpressionByJoinConstructorAndResourceFactory","../../../component/designer/joinsDesigner/controller/JoinConstructorController","../../../component/designer/joinsDesigner/controller/provider/joinsDesignerSearchKeywordProvider","../../../component/designer/joinsDesigner/controller/JoinsDesignerController","bundle!DomainDesignerBundle","../../../common/vue/directive/hoverMenuDirectiveFactory","../../../common/menu/HoverMenuWithEventsRetrigger","../../../common/vue/directive/clickMenuDirectiveFactory","../../../common/menu/ClickMenuWithEventsRetrigger","text!../../../common/template/menuItemWithOptionsTemplate.htm","../../../component/designer/joinsDesigner/model/validation/baseRenameDialogIsEmptyValidationRule","../../../component/designer/joinsDesigner/model/validation/joinTreeNameIsAlreadyExistsValidationRuleFactory","../../../component/designer/joinsDesigner/model/validation/joinTreeNameContainsForbiddenCharactersValidationRuleFactory","../../../component/designer/joinsDesigner/specification/JoinsDesignerIsDraftJoinTreeOrJoinConstructorExistSpecification","../../../component/designer/joinsDesigner/specification/JoinsDesignerCanResourceBeReorderedSpecification","../../../component/designer/joinsDesigner/specification/JoinsDesignerIsResourceDroppableIntoJoinTreePlaceholderSpecification","../../../component/designer/joinsDesigner/strategy/CreateDraftJoinTreeStrategy","../../../component/designer/joinsDesigner/strategy/ReorderJoinTreeStrategy","../../../component/designer/joinsDesigner/strategy/ReorderDraftJoinTreeStrategy","../../../component/designer/joinsDesigner/controller/JoinsDesignerDraftJoinTreeController","../../../component/designer/joinsDesigner/controller/JoinsDesignerInitialDropZoneController","../../../component/designer/joinsDesigner/controller/JoinsDesignerJoinTreePlaceholderController","../../../component/designer/joinsDesigner/component/initialDropZone/factory/joinsDesignerInitialDropZoneVueConfigFactory","../../../component/designer/joinsDesigner/component/main/factory/joinsDesignerVueConfigFactory","../../../component/designer/joinsDesigner/component/joinConsturctor/factory/joinConstructorVueConfigFactory","../../../component/designer/joinsDesigner/component/joinConsturctor/factory/droppableAreaVueConfigFactory","../../../component/designer/joinsDesigner/component/joinConsturctor/mixin/leftDropAreaComputedMixin","../../../component/designer/joinsDesigner/component/joinConsturctor/mixin/rightDropAreaComputedMixin","../../../component/designer/joinsDesigner/component/joinTree/factory/joinTreeVueConfigFactory","../../../component/designer/joinsDesigner/component/joinTreePlaceholder/factory/joinTreePlaceholderVueConfigFactory","../../../component/designer/joinsDesigner/component/join/factory/joinVueConfigFactory","../../../component/designer/joinsDesigner/factory/joinMenuOptionsFactory","../../../component/designer/joinsDesigner/component/join/mixin/joinVueComputedMixin","../../../component/designer/joinsDesigner/component/join/mixin/joinVueMethodsMixinFactory","../../../component/designer/joinsDesigner/factory/joinTreeMenuOptionsFactory","../../../component/designer/joinsDesigner/factory/draftJoinTreeMenuOptionsFactory","../../../component/designer/joinsDesigner/component/joinExpression/factory/joinExpressionVueConfigFactory","../../../component/designer/joinsDesigner/component/constantJoinExpression/factory/constantJoinExpressionVueConfigFactory","../../../component/designer/joinsDesigner/factory/constantJoinExpressionMenuOptionsFactory","../../../common/component/tooltip/directive/tooltipDirectiveFactory","../../../common/vue/directive/lazyDroppableDirective","../../../common/vue/directive/lazyDraggableDirective","../../../component/designer/joinsDesigner/component/joinTree/mixin/droppableJoinTreeMixinFactory","../../../component/designer/joinsDesigner/component/joinTree/mixin/joinTreeMethodsMixinFactory","../../../component/designer/joinsDesigner/component/joinTree/mixin/droppableDraftJoinTreeMixin","../../../component/designer/joinsDesigner/component/joinTree/mixin/draftJoinTreeMethodsMixinFactory","../../../component/designer/joinsDesigner/component/joinTree/mixin/draftJoinTreeJoinMethodsMixinFactory","../../../component/designer/joinsDesigner/component/complexJoinHeader/factory/complexJoinHeaderVueConfigFactory","../../../component/designer/joinsDesigner/component/complexJoinExpression/factory/complexJoinExpressionVueConfigFactory","../../../component/designer/joinsDesigner/component/joinAlias/factory/joinAliasVueConfigFactory","../../../common/component/search/factory/searchVueConfigFactory","../../../common/component/virtualData/virtualDataVueConfigFactory","../../../common/controller/VirtualDataAutoScrollController","./joinsDesignerJoinsGenerationContextConfiguration","../../../component/dialog/attentionDialog/store/AttentionDialogStore","../../../component/dialog/attentionDialog/factory/attentionDialogVueConfigFactory","../../../component/dialog/genericNotificationDialog/factory/genericNotificationDialogVueConfigFactory","../../../component/designer/joinsDesigner/controller/CannotCreateJoinAttentionDialogController","../../../component/designer/joinsDesigner/specification/JoinsDesignerIsFieldUsedInSingleTableDataIslandSpecification","../../../component/designer/joinsDesigner/strategy/OpenCannotCreateJoinAttentionDialogStrategy","../../../component/designer/joinsDesigner/factory/cannotCreateJoinAttentionDialogMessageFactory"],function(e,n,o){function i(e,n){e.register("joinsDesignerIsResourceDroppableFieldSpecification",new w({clientDomainSchemaCalcFieldsService:e.get("clientDomainSchemaCalcFieldsService")})),e.register("joinsDesignerCanResourceParticipateInJoinSpecification",new R({isResourceDroppableFieldSpecification:e.get("joinsDesignerIsResourceDroppableFieldSpecification")})),e.register("joinsDesignerIsDraftJoinTreeOrJoinConstructorExistSpecification",new ie({joinsDesignerViewStateModelService:e.get("joinsDesignerViewStateModelService")})),e.register("joinsDesignerIsResourceDroppableIntoJoinTreeSpecification",new b({isDraftJoinTreeOrJoinConstructorExistSpecification:e.get("joinsDesignerIsDraftJoinTreeOrJoinConstructorExistSpecification"),canResourceParticipateInJoinSpecification:e.get("joinsDesignerCanResourceParticipateInJoinSpecification")})),e.register("joinsDesignerShouldJoinConstructorRightDroppableAreaBeActiveSpecification",new O({domainSchemaSpecification:e.get("domainSchemaSpecification"),canResourceParticipateInJoinSpecification:e.get("joinsDesignerCanResourceParticipateInJoinSpecification")})),e.register("joinsDesignerCanResourceBeReorderedSpecification",new te),e.register("joinsDesignerIsResourceDroppableIntoJoinTreePlaceholderSpecification",new re({isDraftJoinTreeOrJoinConstructorExistSpecification:e.get("joinsDesignerIsDraftJoinTreeOrJoinConstructorExistSpecification"),canResourceParticipateInJoinSpecification:e.get("joinsDesignerCanResourceParticipateInJoinSpecification"),canResourceBeReorderedSpecification:e.get("joinsDesignerCanResourceBeReorderedSpecification")}))}function t(e,n){var o=new N({settings:n.joinsDesigner,clientDomainSchemaService:e.get("clientDomainSchemaService"),joinsDesignerViewStateModelService:e.get("joinsDesignerViewStateModelService"),advancedJoinsMappingSpecification:e.get("advancedJoinsMappingSpecification"),shouldJoinConstructorRightDroppableAreaBeActiveSpecification:e.get("joinsDesignerShouldJoinConstructorRightDroppableAreaBeActiveSpecification")});e.register("joinsDesignerSchemaToViewModelConverter",o)}function r(e,n){var o=new P({converters:[new W,new U,new H]});e.register("joinsDesignerViewModelToStoreConverter",o)}function s(e,n){e.register("renameJoinTreeValidator",C.create([ee,ne.create({domainSchemaSpecification:e.get("domainSchemaSpecification")}),oe.create({domainSchemaGranularSpecs:e.get("domainSchemaGranularSpecs")})])),e.register("renameJoinTreeDialogStore",j.create()),e.register("renameJoinTreeDialog",u.create({store:e.get("renameJoinTreeDialogStore"),components:{actionButton:f,inputErrorMessage:J},dataNameAttrs:y.joinsDesigner.renameJoinTreeDialog})),e.register("renameDraftJoinTreeDialogStore",j.create()),e.register("renameDraftJoinTreeDialog",u.create({store:e.get("renameDraftJoinTreeDialogStore"),components:{actionButton:f,inputErrorMessage:J},dataNameAttrs:y.joinsDesigner.renameJoinTreeDialog}));var o=D.create({store:e.get("constantJoinExpressionDialogStore"),eventBus:e.get("joinsDesignerEventBus"),ActionButton:f,Validation:v,selectOptionsWithAdditionalPropsFactory:e.get("selectOptionsWithAdditionalPropsFactory")}),i=S.create({config:o,dataNames:y.joinsDesigner.constantJoinExpressionDialog}),t=c.extend(i);e.register("constantJoinExpressionDialogVue",new t),e.register("constantJoinExpressionDialog",new g({el:e.get("constantJoinExpressionDialogVue").$mount().$el}));var r=$.create(q,{eventBus:e.get("joinsDesignerEventBus"),menuOptionTemplate:X}),s=Y.create(Q,{eventBus:e.get("joinsDesignerEventBus"),menuOptionTemplate:X}),a=Ee.create({joinsDesignerEventBus:e.get("joinsDesignerEventBus")}),p=Oe.create({joinsDesignerEventBus:e.get("joinsDesignerEventBus")}),l=Ce.create({joinMenuOptionsFactory:Se,clickMenuDirective:s,mixins:[ye,a],joinsDesignerEventBus:e.get("joinsDesignerEventBus")}),m=S.create({config:l,dataNames:y.joinsDesigner.join}),d=c.extend(m),E=Ce.create({joinMenuOptionsFactory:Se,hoverMenuDirective:r,mixins:[ye,a,p],joinsDesignerEventBus:e.get("joinsDesignerEventBus")}),x=S.create({config:E,dataNames:y.joinsDesigner.join}),T=c.extend(x),h=he.create({joinsDesignerEventBus:e.get("joinsDesignerEventBus")}),F=S.create({config:h,dataNames:y.joinsDesigner.joinExpression}),B=c.extend(F),M=Fe.create({joinsDesignerEventBus:e.get("joinsDesignerEventBus"),hoverMenuDirective:r,constantJoinExpressionMenuOptionsFactory:Be}),V=S.create({config:M,dataNames:y.joinsDesigner.constantJoinExpression}),I=c.extend(V),A=Ne.create({mixins:[ye,a],joinsDesignerEventBus:e.get("joinsDesignerEventBus")}),b=Pe.create({mixins:[ye,a],joinsDesignerEventBus:e.get("joinsDesignerEventBus")}),w=S.create({config:A,dataNames:y.joinsDesigner.complexJoinHeader}),R=S.create({config:b,dataNames:y.joinsDesigner.complexJoinExpression}),O=c.extend(w),N=c.extend(R),P=We.create({joinsDesignerEventBus:e.get("joinsDesignerEventBus")}),W=S.create({config:P,dataNames:y.joinsDesigner.joinAlias}),H=c.extend(W),U=He.create({eventBus:e.get("joinsDesignerEventBus")}),Z=S.create({config:U,dataNames:y.joinsDesigner.search}),L=c.extend(Z),_=c.extend(Ue.create({eventBus:e.get("joinsDesignerEventBus"),defaultHeight:n.joinsDesigner.height.canvas,debounce:n.virtualData.debounce})),G=c.extend(ue.create({mixins:[je]})),K=c.extend(ue.create({mixins:[fe]})),ie=c.extend(de.create({LeftDroppableArea:G,RightDroppableArea:K,mixins:[k],joinsDesignerEventBus:e.get("joinsDesignerEventBus")})),te=c.extend(de.create({LeftDroppableArea:G,RightDroppableArea:K,mixins:[z],joinsDesignerEventBus:e.get("joinsDesignerEventBus")})),re=Me.create(),se=Je.create({Join:d,JoinExpression:B,ConstantJoinExpression:I,ComplexJoinExpression:N,ComplexJoinHeader:O,JoinAlias:H,JoinConstructor:ie,tooltipDirective:re,tooltipOffset:n.tooltip.offset,lazyDroppableDirective:Ve,lazyDraggableDirective:Ie,mixins:[Ae.create({joinsDesignerEventBus:e.get("joinsDesignerEventBus"),isResourceDroppableIntoJoinTreeSpecification:e.get("joinsDesignerIsResourceDroppableIntoJoinTreeSpecification")}),be.create({joinsDesignerEventBus:e.get("joinsDesignerEventBus")})],clickMenuDirective:s,joinTreeMenuOptionsFactory:xe}),ae=S.create({config:se,dataNames:y.joinsDesigner.joinTree}),ce=c.extend(ae),ge=Je.create({Join:T,JoinExpression:B,ConstantJoinExpression:I,ComplexJoinExpression:N,ComplexJoinHeader:O,JoinAlias:H,JoinConstructor:te,tooltipDirective:re,tooltipOffset:n.tooltip.offset,lazyDroppableDirective:Ve,lazyDraggableDirective:Ie,mixins:[we,Re.create({joinsDesignerEventBus:e.get("joinsDesignerEventBus")})],hoverMenuDirective:r,joinTreeMenuOptionsFactory:Te}),pe=S.create({config:ge,dataNames:y.joinsDesigner.joinTree}),le=c.extend(pe),ke=c.extend(ve.create({joinsDesignerEventBus:e.get("joinsDesignerEventBus"),lazyDroppableDirective:Ve,isResourceDroppableIntoJoinTreePlaceholderSpecification:e.get("joinsDesignerIsResourceDroppableIntoJoinTreePlaceholderSpecification")})),ze=c.extend(De.create({joinsDesignerEventBus:e.get("joinsDesignerEventBus")})),Ze=me.create({data:e.get("joinsDesignerStore").attributes,JoinTree:ce,DraftJoinTree:le,JoinTreePlaceholder:ke,JoinsDesignerSearch:L,VirtualData:_,InitialDropZone:ze}),Le=S.create({config:Ze,dataNames:y.joinsDesigner.table});e.register("joinsDesignerVueConfig",Le)}function a(e,n){e.register("joinsDesignerCanvasAutoScrollBySidebarDraggableController",new ke({store:e.get("joinsDesignerStore"),eventBus:e.get("joinsDesignerEventBus"),dragEvent:"sidebar:drag",dragStopEvent:"sidebar:dragStop",autoScrollAreaTopOffset:n.autoScroll.autoScrollAreaTopOffset,autoScrollAreaBottomOffset:n.autoScroll.autoScrollAreaBottomOffset,autoScrollStep:n.autoScroll.autoScrollStep,autoScrollTimeout:n.autoScroll.autoScrollTimeout,autoScrollThrottle:n.autoScroll.autoScrollThrottle})),e.register("joinsDesignerSearchViewController",new h({searchKeywordProvider:_,dispatcherEventName:E.JOINS_DESIGNER_SET_SEARCH_KEYWORD,eventBus:e.get("joinsDesignerEventBus"),store:e.get("joinsDesignerStore"),storeChangeEventBus:e.get("storeChangeEventBus"),applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),onChangeStateSearchStrategy:e.get("onChangeStateSearchStrategy")})),e.register("joinTreeOptionsMenuController",new d({renameJoinTreeDialog:e.get("renameJoinTreeDialog"),renameJoinTreeDialogStore:e.get("renameJoinTreeDialogStore"),renameJoinTreeValidator:e.get("renameJoinTreeValidator"),joinsDesignerEventBus:e.get("joinsDesignerEventBus"),applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),advancedJoinsMappingSpecification:e.get("advancedJoinsMappingSpecification")})),e.register("cannotCreateJoinAttentionDialogStore",new Ze);var o=c.extend(_e.create({actionButton:f})),i=Le.create({genericNotificationDialog:o,store:e.get("cannotCreateJoinAttentionDialogStore").attributes,event:"attentionDialog:close",eventBus:e.get("joinsDesignerEventBus")}),t=S.create({config:i,dataNames:y.joinsDesigner.attentionDialog}),r=c.extend(t),s=new r;e.register("cannotCreateJoinAttentionDialog",new g({el:s.$mount().$el})),e.register("cannotCreateJoinAttentionDialogController",new Ge({joinsDesignerEventBus:e.get("joinsDesignerEventBus"),attentionDialog:e.get("cannotCreateJoinAttentionDialog")})),e.register("joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification",new Ke({clientDomainSchemaService:e.get("clientDomainSchemaService")})),e.register("openCannotCreateJoinAttentionDialogStrategy",new $e({attentionDialog:e.get("cannotCreateJoinAttentionDialog"),attentionDialogStore:e.get("cannotCreateJoinAttentionDialogStore"),clientDomainSchemaService:e.get("clientDomainSchemaService"),cannotCreateJoinAttentionDialogMessageFactory:qe})),e.register("joinTreesController",new F({applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),joinsDesignerEventBus:e.get("joinsDesignerEventBus"),joinConstructorFactory:x,openCannotCreateJoinAttentionDialogStrategy:e.get("openCannotCreateJoinAttentionDialogStrategy"),joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification:e.get("joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification")})),e.register("joinConstructorController",new L({joinsDesignerEventBus:e.get("joinsDesignerEventBus"),applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),joinExpressionByJoinConstructorAndResourceFactory:Z,openCannotCreateJoinAttentionDialogStrategy:e.get("openCannotCreateJoinAttentionDialogStrategy"),joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification:e.get("joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification")})),e.register("constantJoinExpressionConverter",new m({selectOptionClassName:n.dialogs.constantJoinExpressionEditor.selectOptionClassName})),e.register("joinsController",new B({applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),joinsDesignerEventBus:e.get("joinsDesignerEventBus"),selectOptionsWithAdditionalPropsFactory:e.get("selectOptionsWithAdditionalPropsFactory"),constantJoinExpressionDialogStore:e.get("constantJoinExpressionDialogStore"),constantJoinExpressionDialog:e.get("constantJoinExpressionDialog"),constantJoinExpressionConverter:e.get("constantJoinExpressionConverter")})),e.register("joinExpressionsController",new M({applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),joinsDesignerEventBus:e.get("joinsDesignerEventBus")})),e.register("saveConstantJoinConfirmationDialog",new l({yesLabel:K["button.ok"],noLabel:K["button.no"],dataNameAttrs:y.joinsDesigner.saveConstantJoinConfirmationDialog})),e.register("constantJoinExpressionValidator",new A({validationService:e.get("validationServiceWrappedWithDoNotHandle400ErrorsNotification")})),e.register("constantJoinExpressionFactory",new I({clientDomainSchemaService:e.get("clientDomainSchemaService")})),e.register("constantJoinExpressionsController",new V({saveConstantJoinConfirmationDialog:e.get("saveConstantJoinConfirmationDialog"),applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),joinsDesignerEventBus:e.get("joinsDesignerEventBus"),constantJoinExpressionDialog:e.get("constantJoinExpressionDialog"),selectOptionsWithAdditionalPropsFactory:e.get("selectOptionsWithAdditionalPropsFactory"),constantJoinExpressionDialogStore:e.get("constantJoinExpressionDialogStore"),constantJoinExpressionConverter:e.get("constantJoinExpressionConverter"),constantJoinExpressionValidator:e.get("constantJoinExpressionValidator"),constantJoinExpressionFactory:e.get("constantJoinExpressionFactory"),clientDomainSchemaJoinsDesignerService:e.get("clientDomainSchemaJoinsDesignerService")})),e.register("createDraftJoinTreeStrategy",new se({draftJoinTreeFactory:T,joinConstructorFactory:x,clientDomainSchemaJoinsDesignerService:e.get("clientDomainSchemaJoinsDesignerService"),applicationDispatcherEventBus:e.get("applicationDispatcherEventBus")})),e.register("joinsDesignerInitialDropZoneController",new pe({joinsDesignerEventBus:e.get("joinsDesignerEventBus"),createDraftJoinTreeStrategy:e.get("createDraftJoinTreeStrategy"),openCannotCreateJoinAttentionDialogStrategy:e.get("openCannotCreateJoinAttentionDialogStrategy"),joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification:e.get("joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification")})),e.register("reorderJoinTreeStrategy",new ae({applicationDispatcherEventBus:e.get("applicationDispatcherEventBus")})),e.register("reorderDraftJoinTreeStrategy",new ce({applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),joinsDesignerViewStateModelService:e.get("joinsDesignerViewStateModelService")})),e.register("joinsDesignerJoinTreePlaceholderController",new le({joinsDesignerEventBus:e.get("joinsDesignerEventBus"),createDraftJoinTreeStrategy:e.get("createDraftJoinTreeStrategy"),reorderJoinTreeStrategy:e.get("reorderJoinTreeStrategy"),reorderDraftJoinTreeStrategy:e.get("reorderDraftJoinTreeStrategy"),openCannotCreateJoinAttentionDialogStrategy:e.get("openCannotCreateJoinAttentionDialogStrategy"),joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification:e.get("joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification")})),e.register("joinsDesignerDraftJoinTreeController",new ge({joinsDesignerEventBus:e.get("joinsDesignerEventBus"),applicationDispatcherEventBus:e.get("applicationDispatcherEventBus"),advancedJoinsMappingSpecification:e.get("advancedJoinsMappingSpecification"),renameDraftJoinTreeDialog:e.get("renameDraftJoinTreeDialog"),renameDraftJoinTreeDialogStore:e.get("renameDraftJoinTreeDialogStore"),renameJoinTreeValidator:e.get("renameJoinTreeValidator"),joinsDesignerViewStateModelService:e.get("joinsDesignerViewStateModelService"),joinExpressionByJoinConstructorAndResourceFactory:Z,openCannotCreateJoinAttentionDialogStrategy:e.get("openCannotCreateJoinAttentionDialogStrategy"),joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification:e.get("joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification")})),e.register("joinsDesignerStateController",new G({storeChangeEventBus:e.get("storeChangeEventBus"),joinsDesignerEventBus:e.get("joinsDesignerEventBus"),notEmptyTablesSpecification:e.get("notEmptyTablesSpecification"),store:e.get("joinsDesignerStore"),cache:new p,joinsDesignerViewModelToStoreConverter:e.get("joinsDesignerViewModelToStoreConverter"),joinsDesignerSchemaToViewModelConverter:e.get("joinsDesignerSchemaToViewModelConverter"),isResourceDroppableFieldSpecification:e.get("joinsDesignerIsResourceDroppableFieldSpecification")}))}
var c=e("vue"),g=e("runtime_dependencies/js-sdk/src/components/dialog/Dialog"),p=e("../../../../util/cache/SimpleCache"),l=e("../../../component/dialog/confirmation/view/ConfirmationDialogView"),D=e("../../../component/designer/joinsDesigner/dialog/constantJoinExpression/component/main/factory/constantJoinExpressionEditorVueConfigFactory"),m=e("../../../component/designer/joinsDesigner/converter/ConstantJoinExpressionConverter"),d=e("../../../component/designer/joinsDesigner/controller/JoinTreeOptionsMenuController"),u=e("../../../component/dialog/rename/factory/renameDialogFactory"),j=e("../../../component/designer/joinsDesigner/dialog/store/renameJoinTreeDialogStoreFactory"),f=e("../../../common/component/actionButton/ActionButton"),J=e("../../../common/component/inputErrorMessage/InputErrorMessageWithVisibility"),v=e("../../../common/component/validation/Validation"),C=e("../../../common/factory/compositeAndValidationRuleFactory"),S=e("../../../common/factory/addAutomationDataNameAttributeMixinFactory"),y=e("../../../common/enum/automationDataNameAttributesEnum"),E=e("../../../dispatcher/enum/applicationStateEventsEnum"),x=e("../../../component/designer/joinsDesigner/factory/joinsDesignerJoinConstructorFactory"),T=e("../../../component/designer/joinsDesigner/factory/joinsDesignerDraftJoinTreeFactory"),h=e("../../../common/component/search/controller/SearchComponentController"),F=e("../../../component/designer/joinsDesigner/controller/JoinTreesController"),B=e("../../../component/designer/joinsDesigner/controller/JoinsController"),M=e("../../../component/designer/joinsDesigner/controller/JoinExpressionsController"),V=e("../../../component/designer/joinsDesigner/controller/ConstantJoinExpressionsController"),I=e("../../../component/designer/joinsDesigner/factory/ConstantJoinExpressionFactory"),A=e("../../../component/designer/joinsDesigner/dialog/constantJoinExpression/validator/ConstantJoinExpressionValidator"),b=e("../../../component/designer/joinsDesigner/specification/JoinsDesignerIsResourceDroppableIntoJoinTreeSpecification"),w=e("../../../component/designer/joinsDesigner/specification/JoinsDesignerIsResourceDroppableFieldSpecification"),R=e("../../../component/designer/joinsDesigner/specification/JoinsDesignerCanResourceParticipateInJoinSpecification"),O=e("../../../component/designer/joinsDesigner/specification/JoinsDesignerShouldJoinConstructorRightDroppableAreaBeActiveSpecification"),N=e("../../../component/designer/joinsDesigner/converter/JoinsDesignerSchemaToViewModelConverter"),P=e("../../../component/designer/joinsDesigner/converter/JoinsDesignerViewModelToStoreConverter"),W=e("../../../component/designer/joinsDesigner/converter/JoinsDesignerViewModelToVisibleDataConverter"),H=e("../../../component/designer/joinsDesigner/converter/JoinsDesignerVisibleDataToNestedStructureConverter"),U=e("../../../component/designer/joinsDesigner/converter/JoinsDesignerLastJoinTreePlaceholderHeightConverter"),k=e("../../../component/designer/joinsDesigner/component/joinConsturctor/mixin/joinConstructorEventsComputedMixin"),z=e("../../../component/designer/joinsDesigner/component/joinTree/mixin/draftJoinConstructorEventsComputedMixin"),Z=e("../../../component/designer/joinsDesigner/factory/joinsDesignerJoinExpressionByJoinConstructorAndResourceFactory"),L=e("../../../component/designer/joinsDesigner/controller/JoinConstructorController"),_=e("../../../component/designer/joinsDesigner/controller/provider/joinsDesignerSearchKeywordProvider"),G=e("../../../component/designer/joinsDesigner/controller/JoinsDesignerController"),K=e("bundle!DomainDesignerBundle"),$=e("../../../common/vue/directive/hoverMenuDirectiveFactory"),q=e("../../../common/menu/HoverMenuWithEventsRetrigger"),Y=e("../../../common/vue/directive/clickMenuDirectiveFactory"),Q=e("../../../common/menu/ClickMenuWithEventsRetrigger"),X=e("text!../../../common/template/menuItemWithOptionsTemplate.htm"),ee=e("../../../component/designer/joinsDesigner/model/validation/baseRenameDialogIsEmptyValidationRule"),ne=e("../../../component/designer/joinsDesigner/model/validation/joinTreeNameIsAlreadyExistsValidationRuleFactory"),oe=e("../../../component/designer/joinsDesigner/model/validation/joinTreeNameContainsForbiddenCharactersValidationRuleFactory"),ie=e("../../../component/designer/joinsDesigner/specification/JoinsDesignerIsDraftJoinTreeOrJoinConstructorExistSpecification"),te=e("../../../component/designer/joinsDesigner/specification/JoinsDesignerCanResourceBeReorderedSpecification"),re=e("../../../component/designer/joinsDesigner/specification/JoinsDesignerIsResourceDroppableIntoJoinTreePlaceholderSpecification"),se=e("../../../component/designer/joinsDesigner/strategy/CreateDraftJoinTreeStrategy"),ae=e("../../../component/designer/joinsDesigner/strategy/ReorderJoinTreeStrategy"),ce=e("../../../component/designer/joinsDesigner/strategy/ReorderDraftJoinTreeStrategy"),ge=e("../../../component/designer/joinsDesigner/controller/JoinsDesignerDraftJoinTreeController"),pe=e("../../../component/designer/joinsDesigner/controller/JoinsDesignerInitialDropZoneController"),le=e("../../../component/designer/joinsDesigner/controller/JoinsDesignerJoinTreePlaceholderController"),De=e("../../../component/designer/joinsDesigner/component/initialDropZone/factory/joinsDesignerInitialDropZoneVueConfigFactory"),me=e("../../../component/designer/joinsDesigner/component/main/factory/joinsDesignerVueConfigFactory"),de=e("../../../component/designer/joinsDesigner/component/joinConsturctor/factory/joinConstructorVueConfigFactory"),ue=e("../../../component/designer/joinsDesigner/component/joinConsturctor/factory/droppableAreaVueConfigFactory"),je=e("../../../component/designer/joinsDesigner/component/joinConsturctor/mixin/leftDropAreaComputedMixin"),fe=e("../../../component/designer/joinsDesigner/component/joinConsturctor/mixin/rightDropAreaComputedMixin"),Je=e("../../../component/designer/joinsDesigner/component/joinTree/factory/joinTreeVueConfigFactory"),ve=e("../../../component/designer/joinsDesigner/component/joinTreePlaceholder/factory/joinTreePlaceholderVueConfigFactory"),Ce=e("../../../component/designer/joinsDesigner/component/join/factory/joinVueConfigFactory"),Se=e("../../../component/designer/joinsDesigner/factory/joinMenuOptionsFactory"),ye=e("../../../component/designer/joinsDesigner/component/join/mixin/joinVueComputedMixin"),Ee=e("../../../component/designer/joinsDesigner/component/join/mixin/joinVueMethodsMixinFactory"),xe=e("../../../component/designer/joinsDesigner/factory/joinTreeMenuOptionsFactory"),Te=e("../../../component/designer/joinsDesigner/factory/draftJoinTreeMenuOptionsFactory"),he=e("../../../component/designer/joinsDesigner/component/joinExpression/factory/joinExpressionVueConfigFactory"),Fe=e("../../../component/designer/joinsDesigner/component/constantJoinExpression/factory/constantJoinExpressionVueConfigFactory"),Be=e("../../../component/designer/joinsDesigner/factory/constantJoinExpressionMenuOptionsFactory"),Me=e("../../../common/component/tooltip/directive/tooltipDirectiveFactory"),Ve=e("../../../common/vue/directive/lazyDroppableDirective"),Ie=e("../../../common/vue/directive/lazyDraggableDirective"),Ae=e("../../../component/designer/joinsDesigner/component/joinTree/mixin/droppableJoinTreeMixinFactory"),be=e("../../../component/designer/joinsDesigner/component/joinTree/mixin/joinTreeMethodsMixinFactory"),we=e("../../../component/designer/joinsDesigner/component/joinTree/mixin/droppableDraftJoinTreeMixin"),Re=e("../../../component/designer/joinsDesigner/component/joinTree/mixin/draftJoinTreeMethodsMixinFactory"),Oe=e("../../../component/designer/joinsDesigner/component/joinTree/mixin/draftJoinTreeJoinMethodsMixinFactory"),Ne=e("../../../component/designer/joinsDesigner/component/complexJoinHeader/factory/complexJoinHeaderVueConfigFactory"),Pe=e("../../../component/designer/joinsDesigner/component/complexJoinExpression/factory/complexJoinExpressionVueConfigFactory"),We=e("../../../component/designer/joinsDesigner/component/joinAlias/factory/joinAliasVueConfigFactory"),He=e("../../../common/component/search/factory/searchVueConfigFactory"),Ue=e("../../../common/component/virtualData/virtualDataVueConfigFactory"),ke=e("../../../common/controller/VirtualDataAutoScrollController"),ze=e("./joinsDesignerJoinsGenerationContextConfiguration"),Ze=e("../../../component/dialog/attentionDialog/store/AttentionDialogStore"),Le=e("../../../component/dialog/attentionDialog/factory/attentionDialogVueConfigFactory"),_e=e("../../../component/dialog/genericNotificationDialog/factory/genericNotificationDialogVueConfigFactory"),Ge=e("../../../component/designer/joinsDesigner/controller/CannotCreateJoinAttentionDialogController"),Ke=e("../../../component/designer/joinsDesigner/specification/JoinsDesignerIsFieldUsedInSingleTableDataIslandSpecification"),$e=e("../../../component/designer/joinsDesigner/strategy/OpenCannotCreateJoinAttentionDialogStrategy"),qe=e("../../../component/designer/joinsDesigner/factory/cannotCreateJoinAttentionDialogMessageFactory");o.exports=function(e,n){i(e,n),t(e,n),r(e,n),s(e,n),a(e,n),ze(e,n)}});