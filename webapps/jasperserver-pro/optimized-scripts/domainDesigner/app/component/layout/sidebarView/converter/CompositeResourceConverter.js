/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,n){var t=e("underscore"),o=function(e){t.bindAll(this,"convert"),this.converters=e?t.isArray(e)?e:[e]:[]};t.extend(o.prototype,{convert:function(e,r){return t.reduce(this.converters,function(e,n){return n(e,r)},e)}}),n.exports=o});