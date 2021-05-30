/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../common/util/virtualDataUtil"],function(i,t,e){var o=i("underscore"),s=i("../../../../common/util/virtualDataUtil"),n=function(i){this.initialize(i)};o.extend(n.prototype,{initialize:function(i){this.fieldHeight=i.fieldHeight},convert:function(i){var t=i.scrollPos,e=i.queryResultSetHeight,n=i.fields||[];n=n.map(function(i,t){return o.extend({},i,{index:t,height:this.fieldHeight})},this);var l=s.getVisibleDataOptions({collection:n,scrollPos:t,canvasHeight:e});return{visibleFields:this._getVisibleData({fields:n,visibleDataOptions:l}),top:l.top,height:l.height,scrollPos:t,queryResultSetHeight:e}},_getVisibleData:function(i){var t=i.fields,e=i.visibleDataOptions;return t.slice(e.startPosition,e.endPosition)}}),e.exports=n});