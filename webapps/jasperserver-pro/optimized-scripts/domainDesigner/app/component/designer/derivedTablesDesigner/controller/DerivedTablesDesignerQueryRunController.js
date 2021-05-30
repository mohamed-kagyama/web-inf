/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","../util/selectedFieldsUtil","../../../../rest/enum/requestCanceledEnum"],function(e,r,i){var t=e("underscore"),s=e("jquery"),d=e("../util/selectedFieldsUtil"),n=e("../../../../rest/enum/requestCanceledEnum"),u=function(e){this.derivedTablesDesignerStore=e.derivedTablesDesignerStore,this.derivedTablesDesignerDerivedTableValidator=e.derivedTablesDesignerDerivedTableValidator,this.derivedTablesDesignerAvailableFieldsValidator=e.derivedTablesDesignerAvailableFieldsValidator,this.derivedTablesDesignerConnectionService=e.derivedTablesDesignerConnectionService,this.derivedTablesDesignerStoreQueryResultDataProvider=e.derivedTablesDesignerStoreQueryResultDataProvider};t.extend(u.prototype,{runQuery:function(){var e,r=this.derivedTablesDesignerStore.get("query"),i=this.derivedTablesDesignerStore.get("dataSourceId"),t=this.derivedTablesDesignerDerivedTableValidator.validateQuery(r),d=this;return e=t?s.Deferred().reject(t).promise():this.derivedTablesDesignerConnectionService.executeQuery(i,r).then(function(e){return d.derivedTablesDesignerAvailableFieldsValidator.validate(e)}).then(function(e){d._updateStoreAfterQueryExecution({fields:e||[],selectedFields:d._getSelectedFieldsAfterQueryExecution({fields:e,query:r}),queryAfterPreviousExecution:r,queryErrorMessage:""})}),e.fail(function(e){d._onRunQueryRejected(e)})},_getSelectedFieldsAfterQueryExecution:function(e){var r=e.fields,i=e.query,s=this.derivedTablesDesignerStore.get("queryAfterPreviousExecution"),n=this.derivedTablesDesignerStore.get("fields"),u=this.derivedTablesDesignerStore.get("selection"),a=d.getSelectedFieldsAsArray({fields:n,selection:u});if(i!==s||t.isEmpty(a))a=r;else{var l=r.reduce(function(e,r){return e[r.name]=!0,e},{});a=t.some(a,function(e){return l[e.name]})?a:r}return a},_onRunQueryRejected:function(e){if(e!==n.CANCELED){var r=e,i=e.responseJSON;i&&(i=t.isArray(i)?i:[i],r=i[0]&&i[0].message,i[0].details&&(r=i[0].details[0].message)),this._updateStoreAfterQueryExecution({fields:[],selectedFields:[],queryErrorMessage:r})}},_updateStoreAfterQueryExecution:function(e){var r=this.derivedTablesDesignerStoreQueryResultDataProvider.getQueryResultStoreData(e);this.derivedTablesDesignerStore.set(t.extend({queryAfterPreviousExecution:e.queryAfterPreviousExecution||"",queryErrorMessage:e.queryErrorMessage||""},r))}}),i.exports=u});