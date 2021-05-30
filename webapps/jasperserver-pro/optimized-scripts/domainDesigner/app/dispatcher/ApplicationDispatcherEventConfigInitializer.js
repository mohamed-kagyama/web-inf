/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone"],function(t,i,n){var e=t("underscore"),a=t("backbone"),c=function(t){this.initialize(t)};e.extend(c.prototype,a.Events,{initialize:function(t){t=t||{},this.applicationDispatcherEventBus=t.applicationDispatcherEventBus,this.applicationDispatcher=t.applicationDispatcher,this.applicationStateActionsEnum=t.applicationStateActionsEnum},initEvents:function(){var t=this;e.each(this.applicationStateActionsEnum,function(i,n){var e=i.event;this.listenTo(this.applicationDispatcherEventBus,e,function(){var i=[n].concat(Array.prototype.slice.call(arguments,0));t.applicationDispatcher.execute.apply(null,i)})},this)},remove:function(){this.stopListening()}}),n.exports=c});