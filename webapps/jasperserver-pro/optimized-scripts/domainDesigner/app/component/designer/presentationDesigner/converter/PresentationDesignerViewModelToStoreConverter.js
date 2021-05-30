/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,t){var n=e("underscore"),i=function(e){this.initialize(e)};n.extend(i.prototype,{initialize:function(e){this.converters=e.converters},convert:function(e){var r=e.dataStore;return n.reduce(this.converters,function(e,t){return e=t.convert(e,r)},e)}}),t.exports=i});