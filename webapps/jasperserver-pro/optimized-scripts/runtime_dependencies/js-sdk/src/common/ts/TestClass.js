/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,n,r){function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function i(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function a(e,n,r){return n&&i(e.prototype,n),r&&i(e,r),e}function o(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}var u=e("underscore"),c=function(){function e(n){t(this,e),o(this,"privateName",void 0),this.privateName=n,u.extend({},{prop:!0})}return a(e,[{key:"name",get:function(){return this.privateName},set:function(e){this.privateName=e}}]),e}();r.exports=c});