/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/menuOptionsEventsEnum"],function(e,n,t){var r=e("../enum/menuOptionsEventsEnum");t.exports={create:function(e){var n=e.getTableReferenceIdByItem,t=e.applicationDispatcherEventBus,i={};return i[r.COPY_TABLE_REFERENCE.eventWithPrefix]=function(e,r,i,u){var E=e.resource,o=n(E);t.trigger(u.get("triggerEvent"),o)},i}}});