/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,n,r){var t=e("underscore"),i=function(e){this.initialize(e)};t.extend(i.prototype,{initialize:function(e){this.converters=e.converters||[]},convert:function(e){return t.reduce(this.converters,function(e,n){return e=n.convert(e)},e,this)}}),r.exports=i});