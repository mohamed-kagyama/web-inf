/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../singleSelect/dataprovider/CacheableDataProvider"],function(a,e,t){var r=a("underscore"),s=a("../../singleSelect/dataprovider/CacheableDataProvider"),o=function(){s.apply(this,arguments)};r.extend(o.prototype,s.prototype),r.extend(o.prototype,{setData:function(a){s.prototype.setData.call(this,a),this.dataLabelsHash={};for(var e=0;e<this.data.length;e++)this.dataLabelsHash[this.data[e].value]=this.data[e].label},getDataLabelHash:function(){return this.dataLabelsHash}}),t.exports=o});