/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery"],function(e,t,a){var i=e("underscore"),r=e("jquery"),s=function(e){i.bindAll(this,"getData"),e=e||{},this.dataCache=[],this.dataCacheTotal=null,this.dataCachePages=[],this.pageSize=e.pageSize||999,this.criteriaKey=e.searchKey||"criteria",this.maxSearchCacheSize=e.maxSearchCacheSize||50,this.getDataByCriteriaHolder={},this.controlGetTotal=void 0!==e.controlGetTotal&&e.controlGetTotal,this.dataConverter=e.dataConverter,this.saveLastCriteria=void 0!==e.saveLastCriteria&&e.saveLastCriteria,this.lastCriteria=null,this.serialRequestsDelay=void 0!==e.serialRequestsDelay?e.serialRequestsDelay:50,this._setSerialRequestsDelayedPromise(null),this.request=e.request,this.maxLimit=e.maxLimit||2147483647};i.extend(s.prototype,{getData:function(e){if(e=e||{},e[this.criteriaKey])return this._getDataByCriteria(e[this.criteriaKey])(e);if(void 0===e[this.criteriaKey]&&this.saveLastCriteria&&this.lastCriteria)return this._getDataByCriteria(this.lastCriteria)(e);this.lastCriteria=null;var t=r.Deferred(),a=this._getPagesToLoad(e);return a?this._requestData(e,a,t):this._resolveDeferredUsingDataFromCache(t,e),t.promise()},clear:function(){this.dataCache=[],this.dataCacheTotal=null,this.dataCachePages=[],this.getDataByCriteriaHolder={},this.lastCriteria=null},_requestData:function(e,t,a){var r=(t[t.length-1]-t[0]+1)*this.pageSize,s=i.extend({},e,{offset:t[0]*this.pageSize,limit:r});this.controlGetTotal&&(s.skipGetTotal=!0),r>=this.maxLimit/this.pageSize*this.pageSize&&delete s.limit,this.controlGetTotal&&"number"!=typeof this.dataCacheTotal&&delete s.skipGetTotal,this.serialRequestsDelay>0?(clearTimeout(this.deferredTimeout),this.deferredTimeout=setTimeout(i.bind(this._requestDataDeferred,this,e,s,a),this.serialRequestsDelay)):this._requestDataDeferred(e,s,a)},_requestDataDeferred:function(e,t,a){this._getPagesToLoad(e)?this.serialRequestsDelayedPromise&&i.isEqual(t,this.serialRequestsDelayedPromise.query)?this.serialRequestsDelayedPromise.promise.done(a.resolve).fail(a.reject):(this._setSerialRequestsDelayedPromise({promise:a.promise(),query:t}),this.request(t).done(i.bind(this._requestDone,this,e,t,a)).fail(i.bind(this._requestFailed,this,a))):this._resolveDeferredUsingDataFromCache(a,e)},_requestDone:function(e,t,a,i){this._putDataToCache(t,i),this._setSerialRequestsDelayedPromise(null),this._resolveDeferredUsingDataFromCache(a,e)},_requestFailed:function(e,t,a,i){e.reject(t,a,i),this._setSerialRequestsDelayedPromise(null)},_setSerialRequestsDelayedPromise:function(e){this.serialRequestsDelayedPromise=e},_resolveDeferredUsingDataFromCache:function(e,t){var a=this._getDataFromCache(t);e.resolve({total:this.dataCacheTotal,data:a})},_getPagesToLoad:function(e){var t,a=this._convertLimitOffsetToFirstLast(e),i=this._findPageIndex(a.first),r=this._findPageIndex(a.last),s=[];for(t=i;t<=r;t++)if(!this.dataCachePages[t]){s.push(t);break}for(t=r;t>=i;t--)if(!this.dataCachePages[t]){s.push(t);break}return s.length>0?s:null},_findPageIndex:function(e){return Math.floor(e/this.pageSize)},_convertLimitOffsetToFirstLast:function(e){var t=e&&e.offset?e.offset:0,a=e&&e.limit?t+e.limit-1:this.dataCacheTotal?this.dataCacheTotal-1:this.maxLimit;return this.dataCacheTotal&&a>this.dataCacheTotal-1&&(a=this.dataCacheTotal-1),{first:t,last:a}},_getDataFromCache:function(e){e=i.defaults(e,{offset:0,limit:this.maxLimit});var t=Math.max(0,e.offset),a=Math.min(t+e.limit,this.dataCacheTotal);return this.dataCache.slice(t,a)},_putDataToCache:function(e,t){var a;for(void 0!==t.total&&(this.dataCacheTotal=t.total),e.limit=e.limit||this.maxLimit,a=0;a<t.data.length;a++)this.dataCache[a+e.offset]=this.dataConverter?this.dataConverter(t.data[a]):t.data[a];var i=e.offset/this.pageSize,r=Math.floor((Math.min(e.limit,t.data.length)+e.offset-1)/this.pageSize);for(a=i;a<=r;a++)this.dataCachePages[a]=!0},_getDataByCriteria:function(e){if(!this.getDataByCriteriaHolder[e]){var t,a=Number.MAX_VALUE,i=0,r=0;for(var s in this.getDataByCriteriaHolder)if(this.getDataByCriteriaHolder.hasOwnProperty(s)){r+=1;var h=this.getDataByCriteriaHolder[s];h.index<a&&(a=h.index,t=s),h.index>i&&(i=h.index)}r>=this.maxSearchCacheSize&&delete this.getDataByCriteriaHolder[t],this.getDataByCriteriaHolder[e]={getData:this._createDataProviderForCriteria(e),index:i+1}}return this.lastCriteria=e,this.getDataByCriteriaHolder[e].getData},_createDataProviderForCriteria:function(e){var t=this.request,a=this,r=new s({pageSize:this.pageSize,dataConverter:this.dataConverter,serialRequestsDelay:this.serialRequestsDelay,searchKey:this.criteriaKey,controlGetTotal:this.controlGetTotal,request:function(r){var s=i.extend({},r);return s[a.criteriaKey]=e,t(s)}}),h=r.getData;return r.getData=function(e){var t=i.extend({},e);return delete t[a.criteriaKey],h.call(r,t)},r.getData}}),a.exports=s});