/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/menuOptionsEventsEnum"],function(e,n,r){var t=e("../enum/menuOptionsEventsEnum");r.exports={create:function(e){var n=e.applicationDispatcherEventBus,r={};return r[t.REMOVE_DERIVED_TABLE.eventWithPrefix]=function(e,r,t,i){var u=e.resource;n.trigger(i.get("triggerEvent"),u.derivedTableId,u.derivedTableParentId)},r}}});