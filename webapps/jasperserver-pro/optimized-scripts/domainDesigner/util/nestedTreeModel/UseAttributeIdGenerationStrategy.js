/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,n){var o=e("underscore"),t=function(){};o.extend(t.prototype,{getId:function(e,r,n){var t=e[r];if(o.isUndefined(t))throw new Error("["+r+"] property of the node should be defined");return t}}),n.exports=t});