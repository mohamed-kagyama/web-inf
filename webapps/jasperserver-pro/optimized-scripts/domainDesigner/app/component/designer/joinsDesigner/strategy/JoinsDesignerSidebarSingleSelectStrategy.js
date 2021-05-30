/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../dispatcher/enum/applicationStateEventsEnum"],function(e,t,i){var n=e("underscore"),c=e("../../../../dispatcher/enum/applicationStateEventsEnum"),a=function(e){this.initialize(e)};n.extend(a.prototype,{initialize:function(e){this.canSelectItem=e.canSelectItem,this.applicationDispatcherEventBus=e.applicationDispatcherEventBus},execute:function(e){this.canSelectItem(e)&&this.applicationDispatcherEventBus.trigger(c.JOINS_DESIGNER_SELECT_RESOURCE,{resource:e})}}),i.exports=a});