/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","underscore","../model/BaseComponentMetaModel","../../enum/reportOutputFormats"],function(e,t,r){var o=e("backbone"),n=e("underscore"),s=e("../model/BaseComponentMetaModel"),u=e("../../enum/reportOutputFormats");r.exports=o.Collection.extend({initialize:function(e,t){this.report=t.report},model:function(e,t){return new s(e,t)},url:function(){return this.report.getExport(u.HTML).urlAttachments()+"reportComponents.json"},fetch:function(){if(!this.report.has("requestId"))throw new Error("You must run report first before fetching components.");return o.Collection.prototype.fetch.call(this,{type:"GET",reset:!0,headers:{Accept:"application/json","x-jrs-base-url":this.report.contextPath}})},parse:function(e){return n.values(e)}})});