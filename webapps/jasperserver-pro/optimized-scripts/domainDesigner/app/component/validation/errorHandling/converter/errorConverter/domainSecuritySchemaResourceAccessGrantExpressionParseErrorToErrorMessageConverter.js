/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../enum/errorParametersKeysEnum","../../util/extractPropertyByKeyUtil"],function(e,r,n){var t=e("bundle!DomainDesignerBundle"),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),a=e("../../enum/errorParametersKeysEnum"),i=e("../../util/extractPropertyByKeyUtil"),o=s.create(t);n.exports={convert:function(e){var r=i.extract(e.parameters,a.EXPRESSION),n=i.extract(e.parameters,a.RESOURCE_PATH);return o("domain.designer.error.dialog.domain.security.schema.resource.access.grant.expression.parse.error.template",r.value,n.value)}}});