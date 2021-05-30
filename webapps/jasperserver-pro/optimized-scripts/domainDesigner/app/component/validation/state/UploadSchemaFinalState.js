/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../dispatcher/enum/applicationStateEventsEnum"],function(t,e,i){var n=t("underscore"),a=t("../../../dispatcher/enum/applicationStateEventsEnum"),r=function(t){this.initialize(t)};n.extend(r.prototype,{initialize:function(t){this.applicationDispatcherEventBus=t.applicationDispatcherEventBus},enter:function(t,e){var i=t.designerState;this.applicationDispatcherEventBus.trigger(a.OPTIONS_DESIGNER_UPLOAD_SCHEMA,i)}}),i.exports=r});