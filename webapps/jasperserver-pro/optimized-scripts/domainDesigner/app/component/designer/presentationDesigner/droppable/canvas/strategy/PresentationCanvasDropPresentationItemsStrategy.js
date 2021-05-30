/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../dispatcher/enum/applicationStateEventsEnum"],function(t,e,i){var n=t("underscore"),s=t("../../../../../../dispatcher/enum/applicationStateEventsEnum"),a=function(t){this.initialize(t)};n.extend(a.prototype,{initialize:function(t){n.bindAll(this,"execute"),this.applicationDispatcherEventBus=t.applicationDispatcherEventBus},execute:function(t){var e=this._getEventOptions(t);this.applicationDispatcherEventBus.trigger(s.PRESENTATION_DESIGNER_REORDER_PRESENTATION_ITEMS,e)},_getEventOptions:function(t){var e={targetParentId:t.targetParentId,presentationItemIds:t.presentationItemIds};return n.isUndefined(t.position)||(e.position=t.position),e}}),i.exports=a});