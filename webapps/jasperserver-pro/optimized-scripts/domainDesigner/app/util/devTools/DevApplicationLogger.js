/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,n,t){var o=e("underscore"),r=function(){this.logEntries=[]};o.extend(r.prototype,{create:function(e){var n=this;return function(t,o){n._log(e,t,o)}},_log:function(e,n,t){this.logEntries.push({area:e,action:t,args:n}),console.log(e,t,n)},getLogEntries:function(){return this.logEntries}}),t.exports=r});