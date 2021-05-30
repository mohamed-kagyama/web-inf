/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone"],function(e,t,n){var s=e("underscore"),i=e("backbone"),a=function(e){this.initialize(e)};s.extend(a.prototype,i.Events,{initialize:function(e){this.store=e.store,this.storeChangeEventBus=e.storeChangeEventBus,this.designerToClassNameMap=e.designerToClassNameMap,this._initEvents()},_initEvents:function(){this.listenTo(this.storeChangeEventBus,"change",this._onStateChange)},_onStateChange:function(e){var t=e.viewState,n=t.getCurrentDesigner();this._setState(n)},_setState:function(e){this.store.set({className:this.designerToClassNameMap[e]||"",currentDesigner:e})}}),n.exports=a});