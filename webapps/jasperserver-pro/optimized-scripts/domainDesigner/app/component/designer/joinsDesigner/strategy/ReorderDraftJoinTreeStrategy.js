/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../dispatcher/enum/applicationStateEventsEnum"],function(e,i,t){var n=e("underscore"),r=e("../../../../dispatcher/enum/applicationStateEventsEnum"),a=function(e){this.initialize(e)};n.extend(a.prototype,{initialize:function(e){this.applicationDispatcherEventBus=e.applicationDispatcherEventBus,this.joinsDesignerViewStateModelService=e.joinsDesignerViewStateModelService},execute:function(e,i){var t=this.joinsDesignerViewStateModelService.getDraftJoinTree();t=n.extend({},t,{index:i}),this.applicationDispatcherEventBus.trigger(r.JOINS_DESIGNER_SET_DRAFT_JOIN_TREE_STATE,t)}}),t.exports=a});