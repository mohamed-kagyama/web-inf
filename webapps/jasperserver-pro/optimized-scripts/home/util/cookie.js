/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,t,r){function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(r,!0).forEach(function(t){c(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(){return new Date}function u(e,t){function r(t){var r=t.replace(/([.$?*|{}()[\]\\\/+^])/g,"\\$1"),n="(?:^|; )".concat(r,"=([^;]*)"),o=e.cookie.match(new RegExp(n));return o?decodeURIComponent(o[1]):void 0}function n(r,n){var c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=o({},c);if(i.expires&&i.expires.toUTCString)i.expires=i.expires.toUTCString();else{var u=t();u.setDate(u.getDate()+30),i.expires=u}e.cookie=Object.keys(i).reduce(function(e,t){var r="".concat(e,"; ").concat(t),n=i[t];return!0!==n&&(r+="=".concat(n)),r},"".concat(r,"=").concat(encodeURIComponent(n)))}function c(e){n(e,"null",{expires:new Date(1970,0,1)})}return{get:r,set:n,remove:c}}t.getCookie=u;t.cookie=u(document,i)});