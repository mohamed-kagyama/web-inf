/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./component/validation/state/enum/validationStateNameEnum"],function(t,i,a){var n=t("underscore"),e=t("./component/validation/state/enum/validationStateNameEnum"),o=function(t){this.initialize(t)};n.extend(o.prototype,{initialize:function(t){t=t||{},this.applicationDispatcherEventConfigInitializer=t.applicationDispatcherEventConfigInitializer,this.applicationVueStore=t.applicationVueStore,this.validationStateFactory=t.validationStateFactory,this.applicationDispatcherEventConfigInitializer.initEvents(),this.applicationVueStore.set("isVisible",!0),this.initialStartupOptions=t.initialStartupOptions},startup:function(){this.validationStateFactory.enter(e.INITIALIZE_DOMAIN_DESIGNER_STATE,this.initialStartupOptions)}}),a.exports=o});