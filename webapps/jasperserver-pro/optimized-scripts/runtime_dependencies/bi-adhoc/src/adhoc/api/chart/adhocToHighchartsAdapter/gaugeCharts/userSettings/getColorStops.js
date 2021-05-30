/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./getHCConfigPropertyKey"],function(o,r,e){var t=o("underscore"),a=o("./getHCConfigPropertyKey"),f=function(o){var r=[.2,.5,.7,1],e=[[r[0],"#33a4ff"],[r[1],"#33a4ff"],[r[2],"#33a4ff"],[r[3],"#33a4ff"]];if(t.isArray(o.gaugeStopColors)&&o.gaugeStopColors.length>0){var f=o.gaugeStopColors,n=o.color1Stop||0,g=f[0];e=[[n,g]];for(var p=1;p<f.length;p++){var s=1/(f.length-1)*p;s=Math.round(s*Math.pow(10,2))/Math.pow(10,2),n=o["color".concat(p+1,"Stop")]||r[p]||s,g=f[p]||"#33a4ff",e.push([n,g])}}var u=a(o,"yAxis.stops");return u&&(e=u),e};e.exports=f});