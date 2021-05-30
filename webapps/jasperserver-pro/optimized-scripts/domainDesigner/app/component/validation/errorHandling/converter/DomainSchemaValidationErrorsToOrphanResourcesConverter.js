/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,t){var n=e("underscore"),o=function(e){this.initialize(e)};n.extend(o.prototype,{initialize:function(e){this.specsAndConverters=e.specsAndConverters,this.dataSourceInfoService=e.dataSourceInfoService},convert:function(e,r){var t=this;return this.dataSourceInfoService.getDataSourceInfo(r.dataSourceUri).then(function(r){return n.reduce(e,function(e,o){return n.reduce(t.specsAndConverters,function(e,t){return t.spec.isSatisfiedBy(o)&&e.push(t.converter.convert(o,{dataSourceType:r.type})),e},e,t)},[],t)})}}),t.exports=o});