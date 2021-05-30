/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../dispatcher/enum/applicationStateEventsEnum"],function(e,t,i){var n=e("underscore"),a=e("../../../../../dispatcher/enum/applicationStateEventsEnum"),r=function(e){this.initialize(e)};n.extend(r.prototype,{initialize:function(e){this.applicationDispatcherEventBus=e.applicationDispatcherEventBus,this.presentationDesignerViewStateModelService=e.presentationDesignerViewStateModelService},execute:function(){var e=this._getDataIslandsToRemoveBySelection();this.applicationDispatcherEventBus.trigger(a.PRESENTATION_DESIGNER_REMOVE_DATA_ISLANDS,e)},_getDataIslandsToRemoveBySelection:function(){var e=this.presentationDesignerViewStateModelService.getPresentationCanvasSelectedItems();return n.map(e,function(e){return e.id})}}),i.exports=r});