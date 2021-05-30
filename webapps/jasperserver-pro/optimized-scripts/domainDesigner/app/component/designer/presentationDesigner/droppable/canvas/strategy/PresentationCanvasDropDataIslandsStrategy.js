/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../dispatcher/enum/applicationStateEventsEnum"],function(t,i,e){var n=t("underscore"),a=t("../../../../../../dispatcher/enum/applicationStateEventsEnum"),s=function(t){this.initialize(t)};n.extend(s.prototype,{initialize:function(t){n.bindAll(this,"execute"),this.applicationDispatcherEventBus=t.applicationDispatcherEventBus},execute:function(t){this.applicationDispatcherEventBus.trigger(a.PRESENTATION_DESIGNER_REORDER_DATA_ISLANDS,{dataIslandIds:t.dataIslandsIds,position:t.position})}}),e.exports=s});