/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,r,n){var o=e("underscore"),i=e("bundle!DomainDesignerBundle"),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),t=s.create(i),u=function(e){this.initialize(e)};o.extend(u.prototype,{initialize:function(e){this.genericResourceNotFoundErrorToErrorMessageConverter=e.genericResourceNotFoundErrorToErrorMessageConverter},convert:function(e,r){return r=r||{},1===o.size(e)&&o.first(e).parameters[0]===r.domainUri?{category:"",errorParameters:[t("domain.designer.error.domain.not.found")]}:this.genericResourceNotFoundErrorToErrorMessageConverter.convert(e,r)}}),n.exports=u});