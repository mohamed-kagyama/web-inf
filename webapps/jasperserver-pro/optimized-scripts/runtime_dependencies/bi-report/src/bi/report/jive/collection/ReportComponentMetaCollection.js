/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","underscore","../model/BaseComponentMetaModel"],function(e,t,r){var o=e("backbone"),n=e("underscore"),i=e("../model/BaseComponentMetaModel");r.exports=o.Collection.extend({initialize:function(e,t){this.report=t.report},model:function(e,t){return new i(e,t)},url:function(){var e=this.report.contextPath;return"/"!==e[e.length-1]&&(e+="/"),e+="rest_v2/reportExecutions/"+this.report.get("requestId")+"/info",e},fetch:function(){if(!this.report.has("requestId"))throw new Error("You must run report first before fetching components.");return o.Collection.prototype.fetch.call(this,{type:"GET",reset:!0,headers:{Accept:"application/json"}})},parse:function(e){return e.errorCode?this.toJSON():n.values(e)}})});