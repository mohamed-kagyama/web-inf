/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../enum/errorParametersKeysEnum","../../util/extractPropertyByKeyUtil"],function(e,r,n){var t=e("underscore"),a=e("bundle!DomainDesignerBundle"),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),i=e("../../enum/errorParametersKeysEnum"),u=e("../../util/extractPropertyByKeyUtil"),o=s.create(a);n.exports={convert:function(e){var r=u.extract(e.parameters,i.EXPRESSION),n=u.extract(e.parameters,i.INVALID_FIELD),a=u.extract(e.parameters,i.RESOURCE_PATH);return n=t.isArray(n)?n.map(function(e){return e.value}).join(", "):n.value,o("domain.designer.error.dialog.schema.expression.invalid.fields.error.template",r.value,n,a.value)}}});