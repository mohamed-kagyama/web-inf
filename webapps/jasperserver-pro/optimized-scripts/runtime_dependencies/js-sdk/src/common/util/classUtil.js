/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(r,t,n){var e=r("underscore"),o={mixin:function(){var r,t,n=Array.prototype,e=n.shift.call(arguments);for(r=0;r<arguments.length;r+=1)if(arguments[r])for(t in arguments[r])arguments[r].hasOwnProperty(t)&&(e[t]=arguments[r][t]);return e},inherit:function(r,t){var n;n=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return r.apply(this,arguments)};var i=function(){};return i.prototype=r.prototype,n.prototype=new i,t&&e.extend(n.prototype,t),n.prototype.constructor=n,n.parent=r.prototype,n.extend=function(r){return o.inherit(n,r)},n},extend:function(r){return o.inherit(function(){},r)}};n.exports=o});