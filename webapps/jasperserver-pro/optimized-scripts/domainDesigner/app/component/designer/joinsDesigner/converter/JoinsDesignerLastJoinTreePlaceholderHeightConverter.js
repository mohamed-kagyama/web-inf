/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,n){var o=e("underscore"),r=function(){};o.extend(r.prototype,{convert:function(e){var t=e.models.slice(0,e.models.length-1),n=this._getModelsHeight(t),r=o.last(e.models),i=r&&r.isLastJoinTreePlaceholder,s=e.canvasHeight>n;return i&&s&&(r=o.extend({},r,{height:e.canvasHeight-n}),e=o.extend({},e,{models:t.concat(r)})),e},_getModelsHeight:function(e){return o.reduce(e,function(e,t){return e+t.height},0)}}),n.exports=r});