/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone"],function(e,t,n){var i=e("underscore"),s=e("backbone"),r=function(e){i.bindAll(this,"_triggerKeyupEvent"),this.document=e.document,this.storeChangeEventBus=e.storeChangeEventBus,this.presentationDesignerEventBus=e.presentationDesignerEventBus,this.cache=e.cache,this.presentationDesignerStore=e.presentationDesignerStore,this.presentationDesignerSchemaToViewModelConverter=e.presentationDesignerSchemaToViewModelConverter,this.presentationDesignerViewModelToStoreConverter=e.presentationDesignerViewModelToStoreConverter,this.notEmptyFieldsSpecification=e.notEmptyFieldsSpecification,this._initEvents()};i.extend(r.prototype,s.Events,{_initEvents:function(){this.listenTo(this.storeChangeEventBus,"change",this._onChangeState),this.listenTo(this.presentationDesignerEventBus,"canvas:scroll",this._onCanvasScroll),this.listenTo(this.presentationDesignerEventBus,"window:resize",this._onWindowResize),this.listenTo(this.presentationDesignerEventBus,"canvas:update",this._onCanvasUpdate)},_onChangeState:function(e){var t=this.presentationDesignerStore,n=e.viewState,i=n.getCurrentDesigner()===t.get("ownDesigner"),s=this.notEmptyFieldsSpecification.isSatisfied();this.presentationDesignerStore.set({isVisible:i,isEmptyDataStructure:!s}),i?(this._initKeyupListener(),this._updateCacheFromState(e),this._updateStore()):this._deleteKeyupListener()},_initKeyupListener:function(){this._deleteKeyupListener(),this.document.on("keyup",this._triggerKeyupEvent)},_deleteKeyupListener:function(){this.document.off("keyup",this._triggerKeyupEvent)},_triggerKeyupEvent:function(e){this.presentationDesignerEventBus.trigger("keyup",e)},_updateCacheFromState:function(e){var t=this.presentationDesignerSchemaToViewModelConverter.convert(e);this.cache.add("collection",t),this.cache.add("dataStore",e.dataStore)},_updateStore:function(e){var t=this.presentationDesignerViewModelToStoreConverter.convert(i.extend({store:this.presentationDesignerStore,collection:this.cache.get("collection")||[],dataStore:this.cache.get("dataStore")},e));this.presentationDesignerStore.set(t)},_onCanvasScroll:function(e){this._updateStore({scrollPos:e})},_onCanvasUpdate:function(){var e=this.presentationDesignerStore.get("height"),t=this.presentationDesignerStore.get("isVisible"),n=this.presentationDesignerStore.get("canvasHeight"),i=this.presentationDesignerStore.get("isScrollBarPresent"),s=e>n;t&&i!==s&&this.presentationDesignerStore.set({isScrollBarPresent:s})},_onWindowResize:function(e,t){var n=this.presentationDesignerStore.get("isVisible"),i=this.presentationDesignerStore.get("height");n&&(this.presentationDesignerStore.set({canvasWidth:t,isScrollBarPresent:i>e}),this._updateStore({canvasHeight:e}))}}),n.exports=r});