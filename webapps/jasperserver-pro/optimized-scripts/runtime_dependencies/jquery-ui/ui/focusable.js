/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

!function(e){"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}(function(e){function i(e){for(var i=e.css("visibility");"inherit"===i;)e=e.parent(),i=e.css("visibility");return"hidden"!==i}return e.ui.focusable=function(t,n){var a,r,s,o,u,f=t.nodeName.toLowerCase();return"area"===f?(a=t.parentNode,r=a.name,!(!t.href||!r||"map"!==a.nodeName.toLowerCase())&&(s=e("img[usemap='#"+r+"']"),s.length>0&&s.is(":visible"))):(/^(input|select|textarea|button|object)$/.test(f)?(o=!t.disabled)&&(u=e(t).closest("fieldset")[0])&&(o=!u.disabled):o="a"===f?t.href||n:n,o&&e(t).is(":visible")&&i(e(t)))},e.extend(e.expr[":"],{focusable:function(i){return e.ui.focusable(i,null!=e.attr(i,"tabindex"))}}),e.ui.focusable});