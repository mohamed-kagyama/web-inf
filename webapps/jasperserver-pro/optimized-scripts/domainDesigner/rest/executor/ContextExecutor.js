/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/mimeTypesEnum","jquery"],function(t,e,n){var r=t("underscore"),o=t("../enum/mimeTypesEnum"),c=t("jquery"),i=function(t){this.initialize(t)};r.extend(i.prototype,{initialize:function(t){this.request=t.request,this.retryConnectionAttempts=t.retryConnectionAttempts||1,this.contextFactory=t.contextFactory,this.contextUUIDUrlProvider=t.contextUUIDUrlProvider,this.cache=t.cache},execute:function(t,e,n){n=n||{};var r=this._getContextUUIDUrl(t);return r&&!n.refresh?this._execute({contextUUIDUrl:r,context:t,contextOptions:e}):this._createAndExecuteNewContext({context:t,contextOptions:e})},_getCacheKey:function(t){return JSON.stringify(t)},_getContextUUIDUrl:function(t){var e=this._getCacheKey(t);return this.cache.get(e)},_setContextUUIDUrl:function(t,e){var n=this._getCacheKey(t);this.cache.add(n,e)},_removeContextUUIDUrl:function(t){var e=this._getCacheKey(t);this.cache.reset(e)},_execute:function(t,e){e=r.isUndefined(e)?1:e;var n=this,i=t.context,s=t.contextUUIDUrl,u=t.contextOptions,U=u.accept||o.GENERIC_JSON,x=u.url||"",a=u.type||"POST",h=r.defaults({type:a,headers:{Accept:U},processData:!1,dataType:"json",contextUUIDUrl:s,url:s+x},r.omit(u,["accept"]));return this.request(h).then(function(t){return t},function(t){return n._isConnectionDead(t)&&n._shouldRetryConnection(e)?n._createAndExecuteNewContext({context:i,contextOptions:u},e+1):(n._removeContextUUIDUrl(i),(new c.Deferred).reject(t))})},_createAndExecuteNewContext:function(t,e){e=r.isUndefined(e)?1:e;var n=this,o=t.context,c=t.contextOptions;return this._removeContextUUIDUrl(o),this.contextFactory.create(o).then(function(t,r,i){var s=n.contextUUIDUrlProvider.get(i);return n._setContextUUIDUrl(o,s),n._execute({context:o,contextOptions:c,contextUUIDUrl:s},e)})},_isConnectionDead:function(t){return 404===t.status},_shouldRetryConnection:function(t){return this.retryConnectionAttempts>=t}}),n.exports=i});