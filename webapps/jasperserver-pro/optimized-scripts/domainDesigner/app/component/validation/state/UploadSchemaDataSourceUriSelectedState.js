/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./enum/validationStateNameEnum"],function(e,r,n){var t=e("underscore"),i=e("./enum/validationStateNameEnum"),a=function(e){this.initialize(e)};t.extend(a.prototype,{initialize:function(e){},enter:function(e,r){var n=e.dataSourceUri;e.domainResource=this._replaceDataSourceUri(e.domainResource,n),r.enter(i.UPLOAD_SCHEMA_VALIDATE_DOMAIN_STATE,e)},_replaceDataSourceUri:function(e,r){return e.dataSource.dataSourceReference.uri=r,e}}),n.exports=a});