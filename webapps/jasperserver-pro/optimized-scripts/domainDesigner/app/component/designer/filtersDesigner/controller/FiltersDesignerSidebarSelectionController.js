/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","../../../../dispatcher/enum/applicationStateEventsEnum"],function(e,t,i){var s=e("underscore"),n=e("backbone"),r=e("../../../../dispatcher/enum/applicationStateEventsEnum"),a=function(e){this.initialize(e)};s.extend(a.prototype,n.Events,{initialize:function(e){this.filtersDesignerEventBus=e.filtersDesignerEventBus,this.applicationDispatcherEventBus=e.applicationDispatcherEventBus,this._initEvents()},_initEvents:function(){this.listenTo(this.filtersDesignerEventBus,"sidebar:selectItem",this.selectItem),this.listenTo(this.filtersDesignerEventBus,"sidebarContextMenu:show",this.selectItem)},selectItem:function(e){this.applicationDispatcherEventBus.trigger(r.FILTERS_DESIGNER_SELECT_RESOURCE,{resource:e})}}),i.exports=a});