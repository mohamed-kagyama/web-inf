/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./enum/validationStateNameEnum","../../../../rest/enum/restErrorCodesEnum","../../../../app/component/validation/errorHandling/enum/errorParametersKeysEnum","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,r,n){function t(e){return o(e)||a(e)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function a(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function o(e){if(Array.isArray(e)){for(var r=0,n=new Array(e.length);r<e.length;r++)n[r]=e[r];return n}}var s=e("underscore"),u=e("./enum/validationStateNameEnum"),l=e("../../../../rest/enum/restErrorCodesEnum"),c=e("../../../../app/component/validation/errorHandling/enum/errorParametersKeysEnum"),m=e("bundle!DomainDesignerBundle"),d=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),v=d.create(m),f=function(e){this.initialize(e)};s.extend(f.prototype,{initialize:function(e){this.domainValidationMutations=e.domainValidationMutations,this.clientCurrentDesignerStateService=e.clientCurrentDesignerStateService},enter:function(e,r){var n=this.clientCurrentDesignerStateService.getDesignerState();this.domainValidationMutations.setDesignerState(n),e.useSaveMethod=!0;var t=n.resourceProperties,i=t.securityFile;if(null!=i&&void 0!==i.uri&&null!==i.uri){if(i.uri.substring(0,i.uri.lastIndexOf("/"))==="".concat(t.uri,"_files")){var a=this.validateModel(i,n.schema);if(a){var o={errorCode:l.DOMAIN_SECURITY_SCHEMA_CLIENT_VALIDATION_ERROR,properties:[{key:c.EXPRESSION,value:a}]};return void r.enter(u.SAVE_DOMAIN_SECURITY_FILE_ERROR_STATE,{xhr:{responseJSON:o},errors:[o]})}}}r.enter(u.SAVE_DOMAIN_WITH_SAVE_DIALOG_STATE,e)},validateModel:function(e,r){var n=(new DOMParser).parseFromString(e.content.raw,"text/xml");if(n.getElementsByTagName("parsererror").length>0)return n.getElementsByTagName("parsererror")[0].getElementsByTagName("div")[0].innerHTML;var t=this.xml2json(n),i=t.securityDefinition;if(i){var a=this.validateResourceAccessGrants(i.resourceAccessGrants,r);return a||this.validateItemGroupAccessGrants(i.itemGroupAccessGrants,r)}return null},validateResourceAccessGrants:function(e,r){return e&&!e.A_resourceId?v("domain.designer.error.dialog.domain.security.schema.resource.access.grant.missing.resourceid"):null},validateItemGroupAccessGrants:function(e,r){return null},xml2json:function(e){var r=this,n=t(e.children);if(!n)return{};if(!n.length)return e.innerHTML;var i={},a=!0,o=!1,s=void 0;try{for(var u,l=n[Symbol.iterator]();!(a=(u=l.next()).done);a=!0)!function(){var e=u.value;if(e.attributes.length>0){var t=!0,a=!1,o=void 0;try{for(var s,l=e.attributes[Symbol.iterator]();!(t=(s=l.next()).done);t=!0){var c=s.value;i["A_"+c.name]=c.value}}catch(e){a=!0,o=e}finally{try{t||null==l.return||l.return()}finally{if(a)throw o}}}n.filter(function(r){return r.nodeName===e.nodeName}).length>1?void 0===i[e.nodeName]?i[e.nodeName]=[r.xml2json(e)]:i[e.nodeName].push(r.xml2json(e)):i[e.nodeName]=r.xml2json(e)}()}catch(e){o=!0,s=e}finally{try{a||null==l.return||l.return()}finally{if(o)throw s}}return i}}),n.exports=f});