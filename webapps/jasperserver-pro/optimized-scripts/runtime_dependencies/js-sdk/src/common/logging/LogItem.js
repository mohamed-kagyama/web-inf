/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(t,e,n){function i(t){var e=t.getHours().toString(),n=t.getMinutes().toString(),i=t.getSeconds().toString(),r=t.getMilliseconds();return 1===e.length&&(e="0"+e),1===n.length&&(n="0"+n),1===i.length&&(i="0"+i),e+":"+n+":"+i+"."+r}function r(t){for(var e in t)if(t.hasOwnProperty(e)){if("args"===e)for(var n=0,i=t[e].length;n<i;n++)t[e][n]instanceof Error&&(t[e][n]=t[e][n].message);this[e]=t[e]}}r.prototype.toArray=function(){var t=[];return t.push(i(this.time)),t.push("["+this.id+"]"),"unknown"!==this.file&&t.push("["+this.file+":"+this.line+"]"),t.push("["+this.level.toString()+"] -"),t=t.concat(this.args)},n.exports=r});