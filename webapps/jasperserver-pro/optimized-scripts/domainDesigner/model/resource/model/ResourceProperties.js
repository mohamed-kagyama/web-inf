/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../util/SimpleModel"],function(e,i,n){var o=e("underscore"),d=e("bundle!DomainDesignerBundle"),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),r=e("../../util/SimpleModel"),t=s.create(d),u=function(){r.apply(this,arguments)};o.extend(u.prototype,r.prototype,{defaults:function(){return{version:void 0,permissionMask:void 0,creationDate:void 0,updateDate:void 0,label:t("domain.designer.new_domain"),description:void 0,uri:void 0,dataSources:void 0,securityFile:void 0,bundles:[]}}}),n.exports=u});