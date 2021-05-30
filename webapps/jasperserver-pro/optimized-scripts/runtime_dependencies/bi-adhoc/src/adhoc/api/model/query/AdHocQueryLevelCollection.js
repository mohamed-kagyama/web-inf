/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","./AdHocQueryLevelModel"],function(e,t,i){var n=e("underscore"),o=e("backbone"),s=e("./AdHocQueryLevelModel");i.exports=o.Collection.extend({model:s,initialize:function(e,t){this.adHocModel=t.adHocModel,this._master=t.master},multiAxisMap:function(e){for(var t=!1,i=[].concat(this.models),o=this._master?this._master.models.concat(this.models):this.models,s=i.length-1;s>=0;s--)if(i[s])if(i[s].isMeasure())t?i[s]=null:t=!0;else for(var r=o.length-(i.length-s)-1;i[s]&&r>-1;r--)i[s].get("field")!==o[r].get("field")&&i[s].get("dimension")!==o[r].get("dimension")||i[s].get("functionName")!==o[r].get("functionName")||i[s].isDateTime()||(i[s]=null);return n.map(n.compact(i),e)},hasMeasures:function(){return!!this.find(function(e){return e.isMeasure()})},allHasSummaries:function(){return!this.find(function(e){return!e.get("includeAll")})},toQueryMultiaxisAxisItems:function(){return this.multiAxisMap(function(e){return e.toQueryMultiaxisAxisItem()})}})});