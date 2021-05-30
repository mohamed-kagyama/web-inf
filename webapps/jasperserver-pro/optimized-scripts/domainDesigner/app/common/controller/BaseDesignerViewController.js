/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone"],function(e,t,n){var i=e("underscore"),s=e("backbone"),o=function(e){this.initialize(e)};i.extend(o.prototype,s.Events,{initialize:function(e){this.storeChangeEventBus=e.storeChangeEventBus,this.model=e.model,this._initEvents()},_initEvents:function(){this.listenTo(this.storeChangeEventBus,"change",this._onChangeViewState)},_onChangeViewState:function(e){var t=e.viewState;this.model.set({currentDesigner:t.getCurrentDesigner()})}}),n.exports=o});