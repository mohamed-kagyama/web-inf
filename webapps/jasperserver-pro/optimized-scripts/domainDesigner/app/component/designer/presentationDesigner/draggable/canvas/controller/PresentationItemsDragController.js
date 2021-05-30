/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","../../../../../../dispatcher/enum/applicationStateEventsEnum"],function(t,e,n){var i=t("underscore"),a=t("backbone"),s=t("../../../../../../dispatcher/enum/applicationStateEventsEnum"),r=function(t){this.initialize(t)};i.extend(r.prototype,a.Events,{initialize:function(t){this.presentationDesignerEventBus=t.presentationDesignerEventBus,this.applicationDispatcherEventBus=t.applicationDispatcherEventBus,this.presentationItemsOnDragStartSelectionFactory=t.presentationItemsOnDragStartSelectionFactory,this._initEvents()},_initEvents:function(){this.listenTo(this.presentationDesignerEventBus,"canvas:dragStart",this._selectItemOnDragStartIfNeeded)},_selectItemOnDragStartIfNeeded:function(t){var e=this.presentationItemsOnDragStartSelectionFactory.getSelection(t);e&&this.applicationDispatcherEventBus.trigger(s.PRESENTATION_DESIGNER_SET_SELECTION,e)}}),n.exports=r});