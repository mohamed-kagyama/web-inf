/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(n,o,r){function t(n){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function e(n,o){if(null===n)return n;var r=t(n);if(f.indexOf(r)>=0)return n;var u,i,y;if("function"==typeof o&&(u=o(n)))return u;u=Array.isArray(n)?[]:{};for(y in n)n.hasOwnProperty(y)&&(i=n[y],"object"===t(i)?u[y]="function"==typeof o?o(i,y)||e(i):e(i):u[y]=i);return u}var f=["string","number","boolean","undefined"];r.exports=e});