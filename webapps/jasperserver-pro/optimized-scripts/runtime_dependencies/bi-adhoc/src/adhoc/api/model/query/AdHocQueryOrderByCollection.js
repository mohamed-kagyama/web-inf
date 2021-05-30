/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone"],function(e,t,l){var i=e("underscore"),n=e("backbone");l.exports=n.Collection.extend({initialize:function(){this.measures={},this.multiAxisItems={}},reset:function(e,t){return n.Collection.prototype.reset.call(this,i.map(e,function(e){return e.member||e.level||e.bottomN||e.topN?e:{level:e}}),t)},toJSON:function(e){if(this.length){if(e)return this.reduce(function(e,t){return t.has("level")&&!t.get("level").aggregation&&e.push(i.clone(t.get("level"))),e},[]);var t=this.measures,l=this.multiAxisItems;return i.filter(n.Collection.prototype.toJSON.apply(this,arguments),function(e){return!e.level||e.level.aggregation||!(t[e.level.fieldRef]||!l[e.level.fieldRef])})}}})});