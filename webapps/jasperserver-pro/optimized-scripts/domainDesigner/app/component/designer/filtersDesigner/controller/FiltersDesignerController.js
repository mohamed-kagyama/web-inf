/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","../../../../../model/schema/enum/filterOperandTypesEnum","../../../../dispatcher/enum/applicationStateEventsEnum"],function(e,t,i){var n=e("underscore"),s=e("backbone"),r=e("../../../../../model/schema/enum/filterOperandTypesEnum"),o=e("../../../../dispatcher/enum/applicationStateEventsEnum"),a=function(e){this._init(e)};n.extend(a.prototype,s.Events,{_init:function(e){this.storeChangeEventBus=e.storeChangeEventBus,this.applicationDispatcherEventBus=e.applicationDispatcherEventBus,this.filtersDesignerEventBus=e.filtersDesignerEventBus,this.filtersDesignerSchemaToViewModelConverter=e.filtersDesignerSchemaToViewModelConverter,this.filtersDesignerViewModelToStoreConverter=e.filtersDesignerViewModelToStoreConverter,this.cache=e.cache,this.store=e.store,this.filtersDesignerDraftFilterFactory=e.filtersDesignerDraftFilterFactory,this.filtersDesignerOnEditFilterConverter=e.filtersDesignerOnEditFilterConverter,this.clientDomainSchemaFiltersService=e.clientDomainSchemaFiltersService,this.availableValuesCacheCleaner=e.availableValuesCacheCleaner,this.notEmptyTablesSpecification=e.notEmptyTablesSpecification,this.isResourceDroppableIntoCanvasDroppableAreaSpecification=e.isResourceDroppableIntoCanvasDroppableAreaSpecification,this._initEvents()},_initEvents:function(){this.listenTo(this.storeChangeEventBus,"change",this._onChangeState),this.listenTo(this.filtersDesignerEventBus,"canvas:scroll",this._onCanvasScroll),this.listenTo(this.filtersDesignerEventBus,"window:resize",this._onWindowResize),this.listenTo(this.filtersDesignerEventBus,"filter:edit",this._onFilterEdit),this.listenTo(this.filtersDesignerEventBus,"filter:remove",this._onFilterRemove),this.listenTo(this.filtersDesignerEventBus,"filter:addEmpty",this._onAddFilter)},_onChangeState:function(e){var t=e.viewState,i=t.getCurrentDesigner(),n=t.getCurrentResource(i),s=n&&this.isResourceDroppableIntoCanvasDroppableAreaSpecification.isSatisfiedBy(n),r=this.notEmptyTablesSpecification.isSatisfied();this.store.set({currentDesigner:i,isInitialDroppableZoneActive:s,isEmptyDataStructure:r}),this._isDesignerVisible()&&(this._updateModelFromState(e),this._updateStore())},_onCanvasScroll:function(e){this._updateStore({scrollPos:e})},_onWindowResize:function(e){this._updateStore({canvasHeight:e})},_updateModelFromState:function(e){this.cache.add("collection",this.filtersDesignerSchemaToViewModelConverter.convert(e))},_updateStore:function(e){var t=this.filtersDesignerViewModelToStoreConverter.convert(n.extend({store:this.store,collection:this.cache.get("collection")},e));this.store.set(t)},_isDesignerVisible:function(){var e=this.store;return e.get("currentDesigner")===e.get("ownDesigner")},_onFilterEdit:function(e){var t=this.clientDomainSchemaFiltersService.getFilterById(e.id),i=this;this.availableValuesCacheCleaner.clean(),this.filtersDesignerOnEditFilterConverter.convert(t).then(function(e){i.applicationDispatcherEventBus.trigger(o.FILTERS_DESIGNER_EDIT_DRAFT_FILTER,e)})},_onFilterRemove:function(e){this.applicationDispatcherEventBus.trigger(o.FILTERS_DESIGNER_REMOVE_FILTER,e)},_onAddFilter:function(){var e=this;this.availableValuesCacheCleaner.clean();var t=this._createDraftFilterStateWithoutRightOperand();return this.filtersDesignerDraftFilterFactory.create(t).then(function(t){e.applicationDispatcherEventBus.trigger(o.FILTERS_DESIGNER_SET_DRAFT_FILTER,t)})},_createDraftFilterStateWithoutRightOperand:function(){return{expression:{left:{type:r.VARIABLE}}}}}),i.exports=a});