/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./pathUtil"],function(e,t,n){function r(e,t){return e=h.split(e.replace(/^\//,""),"\\",a(),!1),a()+e.slice(t).join(a())}function i(e,t){return t=t||1,e=h.split(e.replace(/^\//,""),"\\",a(),!1),a()+e.slice(0,e.length-t).join("/")}function o(e){return h.escape(e,"\\",a())}function u(e){return e&&e.indexOf(a())===e.length-1}function c(){var e=Array.prototype.slice.call(arguments,0);return d.reduce(e,function(e,t){return t&&(s(t)||u(e)||!e?e+=t:e=e+a()+o(t)),e},"")}function l(){return a()+c.apply(null,arguments)}function p(){return a()}function a(){return"/"}function s(e){return e===a()}function f(e){return e?h.split(e.replace(/^\//,""),"\\","/",!1):e}function g(e,t,n){return e?h.split(e.replace(new RegExp("^\\"+t),""),"\\",t,!1).join(n):e}function U(e){var t=e.split(a());return d.last(t)}var d=e("underscore"),h=e("./pathUtil");n.exports={getSeparator:a,getRootUri:p,getAbsoluteUri:l,joinUriComponents:c,splitUri:f,escapeUriComponent:o,getRelativeUri:r,getParentUri:i,replaceSeparator:g,getLastSegment:U}});