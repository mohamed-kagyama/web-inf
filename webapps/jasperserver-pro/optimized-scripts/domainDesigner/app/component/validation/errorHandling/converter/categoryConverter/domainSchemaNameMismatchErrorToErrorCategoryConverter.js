/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../enum/errorParametersKeysEnum","../../util/extractPropertyByKeyUtil"],function(e,r,n){var t=e("underscore"),s=e("bundle!DomainDesignerBundle"),i=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),a=e("../../enum/errorParametersKeysEnum"),m=e("../../util/extractPropertyByKeyUtil"),o=i.create(s);n.exports={convert:function(e){var r=t.first(e),n=m.extract(r.parameters,a.DOMAIN_SCHEMA_NAME);return t.isEmpty(n)?"":o("domain.designer.error.dialog.schema.name.mismatch.category")}}});