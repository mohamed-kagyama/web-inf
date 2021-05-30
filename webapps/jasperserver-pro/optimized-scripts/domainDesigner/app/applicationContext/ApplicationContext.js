/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,r){var n=e("underscore"),i=function(){this._container={}};n.extend(i.prototype,{register:function(e,t){if(void 0!==this._container[e])throw new Error("Module ["+e+"] already registered");this._container[e]=t},get:function(e){if(void 0===this._container[e])throw new Error("Module ["+e+"] is not registered");return this._container[e]},getNames:function(){return n.keys(this._container)},remove:function(e,t){var r=this.get(e);n.isFunction(t)&&t(r),delete this._container[e]}}),r.exports=i});