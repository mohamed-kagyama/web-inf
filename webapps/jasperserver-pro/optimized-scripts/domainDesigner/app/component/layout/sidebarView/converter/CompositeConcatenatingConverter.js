/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(t,r,e){var o=t("underscore"),n=function(t){this.initialize(t)};o.extend(n.prototype,{initialize:function(t){this.converters=t.converters,this.comparator=t.comparator,this.postProcess=t.postProcess},convert:function(t){var r=this,e=this.converters.reduce(function(r,e){var o=e.convert(t);return r.concat(o)},[]);return this.comparator&&e.sort(this.comparator),this.postProcess&&(e=o.map(e,function(e,n){return r.postProcess(e,o.extend({},t,{index:n}))})),e}}),e.exports=n});