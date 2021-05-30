/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../dispatcher/enum/applicationStateEventsEnum"],function(e,t,i){var n=e("underscore"),a=e("../../../../dispatcher/enum/applicationStateEventsEnum"),r=function(e){this.initialize(e)};n.extend(r.prototype,{initialize:function(e){this.applicationDispatcherEventBus=e.applicationDispatcherEventBus},execute:function(e,t){var i=e.resource.id;this.applicationDispatcherEventBus.trigger(a.JOINS_DESIGNER_REORDER_JOIN_TREE,i,t)}}),i.exports=r});