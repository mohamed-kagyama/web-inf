/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/menuOptionsEventsEnum"],function(e,n,r){var t=e("../enum/menuOptionsEventsEnum");r.exports={create:function(e){var n=e.applicationDispatcherEventBus,r=e.clientDomainSchemaService,i={};return i[t.ALWAYS_INCLUDE_TABLE.eventWithPrefix]=function(e,t,i,u){var a=e.resource,c=r.getAlwaysIncludeTableByJoinAliasId(a.resourceId);n.trigger(u.get("triggerEvent"),a.resourceId,{alwaysIncludeTable:!c})},i}}});