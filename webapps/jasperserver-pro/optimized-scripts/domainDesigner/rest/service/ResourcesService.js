/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/endpointsEnum","../enum/mimeTypesEnum","../../util/urlParamsUtil"],function(e,t,r){var a=e("underscore"),n=e("../enum/endpointsEnum"),u=e("../enum/mimeTypesEnum"),s=e("../../util/urlParamsUtil"),i=function(e){e=e||{},this.request=e.request};a.extend(i.prototype,{getResource:function(e,t){return this._getResource(e,t)},getDomain:function(e,t){return t=t||{},this._getResource(e,a.defaults(t,{type:u.DOMAIN_RESOURCE}))},saveDomain:function(e,t){t=t||{};var r=n.RESOURCES_SERVICE+e.uri,a=s.addUrlParams(r,t.urlParams);return this.request({url:a,type:"POST",dataType:"json",contentType:u.DOMAIN_RESOURCE,headers:{Accept:u.DOMAIN_RESOURCE},data:JSON.stringify(e)})},saveDomainSchemaAsJson:function(e,t){t=t||{};var r=n.RESOURCES_SERVICE+t.uri,a=s.addUrlParams(r,t.urlParams);return this.request({url:a,type:"POST",dataType:"json",contentType:u.DOMAIN_SCHEMA_RESOURCE_JSON,headers:{Accept:u.REPOSITORY_FILE},data:JSON.stringify(e)})},saveFileResourceViaDirectStreaming:function(e,t){t=t||{};var r=n.RESOURCES_SERVICE+t.uri,a=s.addUrlParams(r,t.urlParams),u=t.fileType,i=t.accept,E=t.description,o=t.name,c=t.dataType||"json";return this.request({url:a,type:"POST",dataType:c,contentType:u,headers:{Accept:i,"Content-Description":E,"Content-Disposition":"attachment; filename="+o},data:e})},deleteResource:function(e){return this.request({url:n.RESOURCES_SERVICE+e,type:"DELETE"})},updateDomain:function(e){var t=n.RESOURCES_SERVICE+e.uri;return this.request({url:t,type:"PUT",dataType:"json",contentType:u.DOMAIN_RESOURCE,headers:{Accept:u.GENERIC_JSON},data:JSON.stringify(e)})},search:function(e){return this.request({url:n.RESOURCES_SEARCH_SERVICE,type:"GET",headers:{Accept:u.GENERIC_JSON},data:e,traditional:!0}).then(function(e,t,r){return{data:e?e.resourceLookup:[],total:r.getResponseHeader("Total-Count")}})},_getResource:function(e,t){t=t||{};var r=n.RESOURCES_SERVICE+e,a=t.type||u.GENERIC_JSON,i=t.dataType,E=s.addUrlParams(r,t.urlParams),o={url:E,type:"GET",headers:{Accept:a}};return i&&(o.dataType=i),this.request(o)}}),r.exports=i});