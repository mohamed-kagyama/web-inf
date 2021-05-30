/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/menuOptionsEventsEnum"],function(e,n,r){var t=e("../enum/menuOptionsEventsEnum");r.exports={create:function(e){var n=e.eventBus,r={};return r[t.GENERATE_JOINS.eventWithPrefix]=function(e,r,t,u){var i=e.resource;n.trigger(u.get("triggerEvent"),i.resourceId)},r}}});