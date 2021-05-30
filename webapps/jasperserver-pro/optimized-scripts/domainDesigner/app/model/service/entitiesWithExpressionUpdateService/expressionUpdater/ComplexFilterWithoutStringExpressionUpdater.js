/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,n,o){var r=e("underscore"),t=function(){};r.extend(t.prototype,{update:function(e,n){r.each(e,function(e,o){n[o].setExpression(e.expression)})}}),o.exports=t});