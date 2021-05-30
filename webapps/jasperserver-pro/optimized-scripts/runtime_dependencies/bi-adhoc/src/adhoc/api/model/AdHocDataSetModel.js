/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","runtime_dependencies/js-sdk/src/common/bi/error/biComponentErrorFactory","./query/AdHocQueryModel","backbone","runtime_dependencies/js-sdk/src/common/logging/logger"],function(t,e,a){function s(t,e,a){this.dataUrl=a.getResponseHeader("Content-Location")?this.contextPath+"/"+a.getResponseHeader("Content-Location"):this.dataUrl,this.adHocModel.trigger("data:available","query",this.query);var s=r(a,this.query);this._data[s]&&this._data[s].resolve(this.attributes).promise()}function r(t,e){var a;return t.getResponseHeader&&t.getResponseHeader("Content-Type")&&!d.isEmpty(e.get("select"))?(a=t.getResponseHeader("Content-Type").replace("application/","").replace("Data+json",""),a=-1!=a.indexOf("error")?e.type():a):a=e.type(),a}function i(t){var e=function(t,e){return e.isMeasure()?t+1:t},a=t.rows.axis.reduce(e,0),s=t.cols.axis.reduce(e,0);return[s||1,a||1]}function n(t){var e=t[1]?d.map(new Array(t[1]),function(){return""}):"";return d.map(new Array(t[0]),function(){return e})}function o(t){for(var e=t.axis.toQueryMultiaxisAxisItems(),a=d.map(e,function(e){var a={};return e.level?a.level={members:[]}:a.aggregation={fields:t.axis.reduce(function(t,e){return e.isMeasure()&&t.push({reference:e.get("id")}),t},[])},a}),s=d.map(e,function(t){return[{all:!!t.level}]}),r=0;r<a.length;r++)if(a[r].aggregation)for(var i=0;i<a[r].aggregation.fields.length;i++)s[r][i]||s[r].push(d.cloneDeep(s[r][0])),s[r][i].memberIdx=i;return{levels:a,axisNode:function t(e,r){return a[r]&&(e.children=d.map(s[r],function(e){return t(e,r+1)})),e}({all:!0},0)}}var d=t("underscore"),u=t("jquery"),l=t("runtime_dependencies/js-sdk/src/common/bi/error/biComponentErrorFactory"),h=t("./query/AdHocQueryModel"),c=t("backbone"),p=t("runtime_dependencies/js-sdk/src/common/logging/logger"),f=p.register("AdHocDataSetModel"),g=c.Model.extend({defaults:{dataSourceUri:"",params:{offset:[0,0],pageSize:[50,50]}},url:function(){var t;return t=this.isNew()?this.contextPath+"/rest_v2/queryExecutions":this.dataUrl+"?"+d.map(this.get("params").offset,function(t){return"offset="+t}).concat(d.map(this.get("params").pageSize,function(t){return"pageSize="+t})).join("&"),t},initialize:function(t,e){this.adHocModel=e.adHocModel,this.contextPath=e.server,this._lastData=d.cloneDeep(this.defaults),this._data={},this.query=new h({},e),this.on("change:params",this.clearDataset,this),this.on("change:dataSourceUri",this.resetDataset,this),this.listenTo(this.query,"query:changed",this.resetDataset,this),this._scheduleDataUpdate()},sync:function(t,e,a){return"read"==t&&(this.isNew()&&(a.data=JSON.stringify(this.toJSON()),a.type="POST",a.processData=!1),a.headers=this.query.headers()),"delete"!=t||this.isNew()||(a.url=this.dataUrl.split("/data")[0]),c.Model.prototype.sync.call(this,t,e,a)},parse:function(t){if(this.get("params")){for(var e=t.params.offset,a=this.get("params").offset,s=0;s<e.length;s++)for(var r=0;r<e[s].length;r++)e[s][r]!==a[s][r]&&f.info("offsets does not match!");delete t.params}return t&&t.dataset&&!t.dataset.data&&!t.dataset.levels&&(t.dataset.counts=i(this.query),t.dataset.data=n(t.dataset.counts),t.dataset.axes=[o(this.query.cols),o(this.query.rows)],t.dataset.empty=!0),t},isNew:function(){return!this.dataUrl},data:function(){var t=this.query.type();return this._data[t]||(this._data[t]=new u.Deferred,this.fetch().done(d.bind(s,this)).fail(d.bind(function(e){var a=l.requestError(e);this._data[t]&&(this._data[t].reject(a),this.trigger("error:dataset",a))},this))),this._data[t].promise()},toJSON:function(){var t=c.Model.prototype.toJSON.apply(this,arguments);return t.dataSource||(t.dataSource={reference:this.get("dataSourceUri")}),t.dataSourceUri=void 0,this.query.type()!==h.type.PROVIDED&&(t.query=this.query.toJSON(!0)),this.query.type()===h.type.MULTILEVEL&&(t.params={offset:[t.params.offset[0]],pageSize:[t.params.pageSize[0]]}),t},toDataComponent:function(){var t={_dataset_internal_:d.cloneDeep(this.get("dataset"))};return this.query.type()===h.type.MULTILEVEL?t._dataset_internal_.params={offset:[this.get("params").offset[0]],pageSize:[this.get("params").pageSize[0]]}:t._dataset_internal_.params=d.cloneDeep(this.get("params")),t._dataset_internal_.totalCounts=d.isArray(this.get("totalCounts"))?d.cloneDeep(this.get("totalCounts")):[this.get("totalCounts")],this.get("truncated")&&(t._dataset_internal_.truncated=!0),this._cleanupDatasetFromTemporaryProperties(t._dataset_internal_),t},_cleanupDatasetFromTemporaryProperties:function(t){delete t.empty},updateFromDataComponent:function(t){var e,a;if(t.params){if(t.params.offset)for(a=0;a<t.params.offset.length;a++)(t.params.offset[a]<0||this._lastData._dataset_internal_&&this._lastData._dataset_internal_.totalCounts&&this._lastData._dataset_internal_.totalCounts[a]&&t.params.offset[a]>=this._lastData._dataset_internal_.totalCounts[a])&&(e=(new u.Deferred).reject({message:"Invalid offset specified. Offset should be bounded by [0, 0] and ["+this._lastData._dataset_internal_.totalCounts.join()+"]",errorCode:"paging.offset.out.of.range",parameters:[[0,0],this._lastData._dataset_internal_.totalCounts.slice()]}));if(t.params.pageSize)for(a=0;a<t.params.pageSize.length;a++)t.params.pageSize[a]<=0&&(e=(new u.Deferred).reject({errorCode:"page.size.out.of.boundaries",message:"The pageSize parameter value must be greater than 0",parameters:[a,0]}));this._lastData.params=d.defaults(t.params,this._lastData.params),this.set("params",this._lastData.params)}return e||(this._scheduleDataUpdate(),e=this.data()),e},resetDataset:function(){this.clearDataset(),this.destroy(),this.dataUrl=void 0,this.unset("totalCounts",{silent:!0}),this.adHocModel.trigger("dataset:reset")},clearDataset:function(){this.unset("dataset",{silent:!0}),this._data={},this.adHocModel.trigger("dataset:clear")},_scheduleDataUpdate:function(){this.once("change:dataset",function(){this._lastData._dataset_internal_={totalCounts:d.isArray(this.get("totalCounts"))?d.cloneDeep(this.get("totalCounts")):[this.get("totalCounts")]},this.adHocModel.trigger("data:available","_dataset_internal_",this)},this)}});a.exports=g});