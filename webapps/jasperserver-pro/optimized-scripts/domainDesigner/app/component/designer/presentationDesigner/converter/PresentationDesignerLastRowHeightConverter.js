/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,n){var o=e("underscore"),r=function(){};o.extend(r.prototype,{convert:function(e){var t,n=e.height,r=e.canvasHeight,i=e.models,d=o.last(i);if(d&&d.isLastRow){t=i.slice(0,i.length-1);r>n&&(n=n+d.padding-d.height,d=o.extend({},d,{height:r-n}),i=t.concat(d))}return o.extend({},e,{models:i})}}),n.exports=r});