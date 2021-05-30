/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../util/resourcePropertiesUtil","../enum/subResourceTypesEnum"],function(e,r,t){var u=e("underscore"),i=e("../util/resourcePropertiesUtil"),n=e("../enum/subResourceTypesEnum"),s=function(e){};u.extend(s.prototype,{parse:function(e,r){r=r||{};var t={version:e.version,permissionMask:e.permissionMask,creationDate:e.creationDate,updateDate:e.updateDate,label:e.label,description:e.description,uri:e.uri};return u.extend(t,this._parseDataSources(e)),u.extend(t,this._parseSecurityFile(e,r)),u.extend(t,this._parseBundles(e,r)),t},_parseBundles:function(e,r){var t={};if(e.bundles){var u=e.bundles,s=r.bundlesContent;u=u.map(function(e,r){var t=e.file,u=i.getFirstKeyValue(t),a={locale:e.locale,label:i.parseBundleLabelFromUrl(u.uri,e.locale),type:n.FILE_REFERENCE,uri:u.uri};return s&&s.length>0&&s[r]&&(a.content=s[r]),a}),t={bundles:u}}return t},_parseSecurityFile:function(e,r){var t=e.securityFile,u={};return t&&(t=i.getFirstKeyValue(t),u={securityFile:{type:n.FILE_REFERENCE,uri:t.uri,label:t.label}},r.securityFileContent&&(u.securityFile.content=r.securityFileContent)),u},_parseDataSources:function(e){var r={};if(e.schema){var t=u.chain(e.schema.resources).pluck("group").compact().first().value();t&&(r={dataSources:{}},r.dataSources[t.name]=i.getEmbeddedResourceUri(e.dataSource))}return r}}),t.exports=s});