/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,n){var t=e("underscore"),c=function(e){this.initialize(e)};t.extend(c.prototype,{initialize:function(e){this.caches=e.caches},clean:function(){t.each(this.caches,function(e){e.reset&&e.reset()})}}),n.exports=c});