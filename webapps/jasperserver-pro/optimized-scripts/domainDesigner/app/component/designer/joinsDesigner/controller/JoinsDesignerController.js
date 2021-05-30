/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone"],function(e,t,i){var s=e("underscore"),n=e("backbone"),o=function(e){this.initialize(e)};s.extend(o.prototype,{initialize:function(e){this.joinsDesignerEventBus=e.joinsDesignerEventBus,this.storeChangeEventBus=e.storeChangeEventBus,this.joinsDesignerViewModelToStoreConverter=e.joinsDesignerViewModelToStoreConverter,this.joinsDesignerSchemaToViewModelConverter=e.joinsDesignerSchemaToViewModelConverter,this.isResourceDroppableFieldSpecification=e.isResourceDroppableFieldSpecification,this.notEmptyTablesSpecification=e.notEmptyTablesSpecification,this.store=e.store,this.cache=e.cache,this._initEvents()},_initEvents:function(){this.listenTo(this.storeChangeEventBus,"change",this._onChangeState),this.listenTo(this.joinsDesignerEventBus,"canvas:scroll",this._onCanvasScroll),this.listenTo(this.joinsDesignerEventBus,"window:resize",this._onWindowResize)},_onChangeState:function(e){var t=e.viewState,i=t.getCurrentDesigner(),s=t.getCurrentResource(i),n=this.notEmptyTablesSpecification.isSatisfied();this.store.set({currentDesigner:i,isEmptyDataStructure:n}),this._isDesignerVisible()&&(this.store.set({isInitialDroppableZoneActive:this.isResourceDroppableFieldSpecification.isSatisfiedBy({id:s.resourceId,type:s.type})}),this._updateStoreFromState(e),this._updateStore())},_updateStoreFromState:function(e){this.cache.add("collection",this.joinsDesignerSchemaToViewModelConverter.convert(e))},_updateStore:function(e){var t=this.joinsDesignerViewModelToStoreConverter.convert(s.extend({store:this.store,collection:this.cache.get("collection")||[]},e));this.store.set(t)},_onCanvasScroll:function(e){this._updateStore({scrollPos:e})},_onWindowResize:function(e){this._updateStore({canvasHeight:e})},_isDesignerVisible:function(){return this.store.get("currentDesigner")===this.store.get("ownDesigner")}},n.Events),i.exports=o});