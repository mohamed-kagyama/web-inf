/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,t){var s=e("underscore"),i=function(e){this.derivedTablesDesignerQueryResultConverter=e.derivedTablesDesignerQueryResultConverter,this.derivedTablesDesignerStore=e.derivedTablesDesignerStore};s.extend(i.prototype,{getQueryResultStoreData:function(e){var r=e.fields,t=e.selectedFields,i=e.queryResultSetHeight,n=s.reduce(r,function(e,r,t){return e[r.name]=t,e},{}),u=s.first(t)||{},d=this.derivedTablesDesignerQueryResultConverter.convert({fields:r,scrollPos:this.derivedTablesDesignerStore.get("scrollPos"),queryResultSetHeight:i||this.derivedTablesDesignerStore.get("queryResultSetHeight")}),l={rangeStart:s.isNumber(n[u.name])?n[u.name]:null,fields:t.reduce(function(e,r){return e[r.name]=n[r.name],e},{})};return s.extend({},d,{fields:r,selection:l})}}),t.exports=i});