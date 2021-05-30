/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../enum/errorParametersKeysEnum","../../util/extractPropertyByKeyUtil"],function(e,r,n){var t=e("underscore"),s=e("bundle!DomainDesignerBundle"),a=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),i=e("../../enum/errorParametersKeysEnum"),u=e("../../util/extractPropertyByKeyUtil"),o=a.create(s);n.exports={convert:function(e){var r,n=u.extract(e.parameters,i.EXPRESSION),s=u.extract(e.parameters,i.INVALID_FIELD);return r=t.isArray(s)?t.map(s,function(e){return e.value}).join(", "):s.value,o("domain.designer.error.dialog.domain.security.schema.resource.access.grant.expression.invalid.fields.error.template",n.value,r)}}});