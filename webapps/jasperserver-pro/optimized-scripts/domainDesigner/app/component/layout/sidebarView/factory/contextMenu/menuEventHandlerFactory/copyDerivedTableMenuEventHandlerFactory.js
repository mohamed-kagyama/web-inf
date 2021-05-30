/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/menuOptionsEventsEnum"],function(e,n,t){var r=e("../enum/menuOptionsEventsEnum");t.exports={create:function(e){var n=e.applicationDispatcherEventBus,t={};return t[r.COPY_DERIVED_TABLE.eventWithPrefix]=function(e,t,r,i){var u=e.resource;n.trigger(i.get("triggerEvent"),u.derivedTableId)},t}}});