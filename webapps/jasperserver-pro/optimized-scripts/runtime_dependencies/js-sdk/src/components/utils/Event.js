/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,n){var r=e("underscore"),i=function(e){e=e||{},this.name=e.name,this.data=e.data||{},this._isDefaultPrevented=!1};i.prototype=Object.create({get name(){return this._name},set name(e){if(!r.isString(e))throw new TypeError("'name' must be a 'string'");if(!e.length)throw new Error("'name' should't be an empty string");this._name=e},get data(){return this._data},set data(e){if(!r.isObject(e))throw new TypeError("'data' must be an 'object'");this._data=e},isDefaultPrevented:function(){return this._isDefaultPrevented},preventDefault:function(){this._isDefaultPrevented=!0}}),n.exports=i});