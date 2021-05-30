/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../../rest/enum/requestCanceledEnum","./enum/validationStateNameEnum"],function(e,n,r){var i=e("underscore"),t=e("backbone"),o=e("bundle!DomainDesignerBundle"),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),a=e("../../../rest/enum/requestCanceledEnum"),u=e("./enum/validationStateNameEnum"),m=s.create(o),d=function(e){this.initialize(e)};i.extend(d.prototype,t.Events,{initialize:function(e){},enter:function(e,n){e.error!==a.CANCELED&&(e.errors=[{category:{label:m("domain.designer.error.dialog.schema.xml.import.generic.error.category"),isBold:!1},errorParameters:[]}],n.enter(u.UPLOAD_SCHEMA_SHOW_ERROR_DIALOG_STATE,e))}}),r.exports=d});