/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(n,r,e){var o=n("underscore"),t=function(n){o.bindAll(this,"around"),this.action=n.action};o.extend(t.prototype,{around:function(n,r){var e=Array.prototype.slice.call(arguments,2);return this.action.apply(null,e)}}),e.exports=t});