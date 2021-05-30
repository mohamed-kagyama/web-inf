/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","./defaultSettingService"],function(e,t,r){var i=e("jquery"),o=e("./defaultSettingService"),n={perform:function(e,t){var r=this.getYAxis(e,t.axisIndex);i.each(t.props,function(e,t){t&&o.setProperty(r,t.prop,t.val,t.isFunction)})},getYAxis:function(e,t){var r=null;if("[object Array]"===Object.prototype.toString.call(e.yAxis)?r=e.yAxis[t]:0===t&&(r=e.yAxis),r)return r;var i={};if("[object Array]"===Object.prototype.toString.call(e.yAxis))e.yAxis[t]=i;else if(0===t)e.yAxis=i;else{var o=[];o[0]=e.yAxis||{},o[t]=i,e.yAxis=o}return i}};r.exports=n});