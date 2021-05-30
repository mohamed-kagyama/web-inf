/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/menuOptionsEventsEnum"],function(e,r,n){var u=e("../enum/menuOptionsEventsEnum");n.exports={create:function(e){var r=e.applicationDispatcherEventBus,n={};return n[u.REMOVE_CALC_FIELD.eventWithPrefix]=function(e,n,u,t){r.trigger(t.get("triggerEvent"),{id:e.resource.resourceId,sourceId:e.resource.calcFieldSourceId,sourceType:e.resource.calcFieldSourceType})},n}}});