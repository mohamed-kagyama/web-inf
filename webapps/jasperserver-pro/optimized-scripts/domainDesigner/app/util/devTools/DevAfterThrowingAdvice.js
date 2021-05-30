/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(r,e,t){var o=r("underscore"),n=function(r){o.bindAll(this,"afterThrowing"),this.devTools=r.devTools};o.extend(n.prototype,{afterThrowing:function(r,e,t,o){var n=r.stack+this._removeFirstEntryFromStack(e),s={message:r.toString(),stack:n,action:o,arguments:t};return this.devTools.setError(s),console.error(n),!1},_removeFirstEntryFromStack:function(r){var e=r.indexOf("\n");return r.substring(e,r.length)}}),t.exports=n});