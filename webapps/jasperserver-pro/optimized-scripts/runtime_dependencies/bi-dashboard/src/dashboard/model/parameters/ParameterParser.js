/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./ParameterGrammar"],function(e,n,t){function r(e,n,t,o,s){var a=i(e,n);return a?(t.push(e.substring(n,a.begin)),t.push(u[a.type].resolve(e.substring(a.begin,a.end),o,s)),r(e,a.end,t,o,s)):t.push(e.substring(n)),t}function i(e,n){var t=o.reduce(s,function(t,r){var i=e.indexOf(r,n);return i>=0&&(!t||t.begin>i)&&(t={type:"{"===r[r.length-1]?r.substring(0,r.length-1):r,begin:i}),t},!1);if(t)if(u[t.type].hasDefaultResolution&&"{"!==e[t.begin+t.type.length])t.end=t.type.length+t.begin;else{var r=e.indexOf("}",t.begin);t.end=1+(r<0?e.length:r)}return t}var o=e("underscore"),u=e("./ParameterGrammar"),s=o.map(o.keys(u),function(e){return u[e].hasDefaultResolution?e:e+"{"});t.exports={substitute:function(e,n,t){return r(e,0,[],n,t).join("")},completionOptions:function(e,n,t){var r;if(0===n)r=[];else{var i=[],r=o.reduce(u,function(r,i){return r.concat(i.getSubstitutionOptions(e,n,t))},[]);r.length||(o.each(o.keys(u),function(t){var r=t.toLowerCase().indexOf(e[n-1].toLowerCase()),o=n-1-r;if(-1!==r&&o>=0){for(var u=0;u<r;u++)if(t[u].toLowerCase()!==e[o+u].toLowerCase())return;i.push({begin:n-r-1,end:n,substitution:t,label:t,action:t,newCursorPos:n-r+t.length-1,removeIfSingle:r===t.length-1})}}),1===i.length&&i[0].removeIfSingle&&(i=[]),o.each(i,function(e){i.removeIfSingle=void 0,u[e.action].hasDefaultResolution&&r.push(o.clone(e)),e.label=e.label+"{ ... }",e.substitution=e.substitution+"{}",e.action=e.action+"{}",e.newCursorPos++,e.hasOptions=!0,r.push(e)}))}return r}}});