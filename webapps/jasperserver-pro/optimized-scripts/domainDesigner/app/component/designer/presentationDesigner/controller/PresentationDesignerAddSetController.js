/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","../../../../dispatcher/enum/applicationStateEventsEnum"],function(e,t,n){var i=e("underscore"),s=e("backbone"),a=e("../../../../dispatcher/enum/applicationStateEventsEnum"),o=function(e){this.initialize(e)};i.extend(o.prototype,s.Events,{initialize:function(e){this.presentationNewSetFactory=e.presentationNewSetFactory,this.store=e.store,this.presentationDesignerViewStateModelService=e.presentationDesignerViewStateModelService,this.presentationDesignerEventBus=e.presentationDesignerEventBus,this.applicationDispatcherEventBus=e.applicationDispatcherEventBus,this.storeChangeEventBus=e.storeChangeEventBus,this._initEvents()},_initEvents:function(){this.listenTo(this.storeChangeEventBus,"change",this._onPresentationSetSelection),this.listenTo(this.presentationDesignerEventBus,"addSet",this._addPresentationSet)},_onPresentationSetSelection:function(){this.store.set("isAddSetButtonActive",this.presentationDesignerViewStateModelService.canEnableAddPresentationSetButton())},_addPresentationSet:function(){var e=this.presentationDesignerViewStateModelService.getPresentationCanvasSelectedItems(),t=i.values(e)[0],n=this.presentationNewSetFactory.create({parentId:t.id});this.applicationDispatcherEventBus.trigger(a.PRESENTATION_DESIGNER_ADD_SET,{presentationSet:n,parent:{id:t.id,type:t.type}})}}),n.exports=o});