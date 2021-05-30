/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","./default.service"],function(e,r,t){var i=e("jquery"),s=e("./default.service"),o={perform:function(e,r){var t=this.getYAxis(e,r.axisIndex);i.each(r.props,function(e,r){r&&s.setProperty(t,r.prop,r.val,r.isFunction)})},getYAxis:function(e,r){var t=null;if("[object Array]"===Object.prototype.toString.call(e.yAxis)?t=e.yAxis[r]:0==r&&(t=e.yAxis),t)return t;var i={};if("[object Array]"===Object.prototype.toString.call(e.yAxis))e.yAxis[r]=i;else if(0==r)e.yAxis=i;else{var s=[];s[0]=e.yAxis||{},s[r]=i,e.yAxis=s}return i}};t.exports=o});