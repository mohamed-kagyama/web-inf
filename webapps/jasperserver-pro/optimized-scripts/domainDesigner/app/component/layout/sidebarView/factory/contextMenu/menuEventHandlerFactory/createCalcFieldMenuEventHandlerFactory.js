/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/menuOptionsEventsEnum"],function(e,t,n){var r=e("../enum/menuOptionsEventsEnum");n.exports={create:function(e){var t=e.calcFieldContextFactory,n=e.applicationDispatcherEventBus,i={};return i[r.CREATE_CALC_FIELD.eventWithPrefix]=function(e,r,i,u){var o=t.create(e.resource);n.trigger(u.get("triggerEvent"),o)},i}}});