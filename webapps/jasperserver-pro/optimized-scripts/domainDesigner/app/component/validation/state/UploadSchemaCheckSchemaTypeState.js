/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../model/enum/fileExtensionEnum","./enum/validationStateNameEnum"],function(e,n,i){var t=e("underscore"),o=e("../../../model/enum/fileExtensionEnum"),m=e("./enum/validationStateNameEnum"),a=function(e){this.initialize(e)};t.extend(a.prototype,{initialize:function(e){},enter:function(e,n){var i=e.domainSchemaType;i===o.JSON?(e.domainSchemaAsJSONString=e.domainSchemaString,n.enter(m.UPLOAD_SCHEMA_PARSE_SCHEMA_AND_CREATE_DOMAIN_STATE,e)):i===o.XML&&n.enter(m.UPLOAD_SCHEMA_CONVERT_XML_TO_JSON_SCHEMA_STATE,e)}}),i.exports=a});