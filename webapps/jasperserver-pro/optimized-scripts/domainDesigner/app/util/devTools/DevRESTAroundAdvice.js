/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,s){var o=e("underscore"),t=function(e){o.bindAll(this,"around","_onError"),this.devTools=e.devTools};o.extend(t.prototype,{around:function(e,r){var s=Array.prototype.slice.call(arguments,2),t=r.apply(null,s),n=o.isObject(t)&&o.isFunction(t.fail),i=0===e.indexOf("_");return n&&!i&&(t=t.fail(this._onError)),t},_onError:function(e,r,s){this.devTools.setError({statusCode:e.status,statusMessage:r,response:this._parseResponse(e.responseText),message:s})},_parseResponse:function(e){try{return JSON.parse(e)}catch(r){return e}}}),s.exports=t});