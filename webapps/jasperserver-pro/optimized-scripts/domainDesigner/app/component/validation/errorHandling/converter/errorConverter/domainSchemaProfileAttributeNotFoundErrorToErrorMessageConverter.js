/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../enum/errorParametersKeysEnum","../../util/extractPropertyByKeyUtil","../../enum/profileAttributeCategoryToI18nKeyEnum"],function(e,r,t){var n=e("bundle!DomainDesignerBundle"),u=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),i=e("../../enum/errorParametersKeysEnum"),o=e("../../util/extractPropertyByKeyUtil"),a=e("../../enum/profileAttributeCategoryToI18nKeyEnum"),s=u.create(n);t.exports={convert:function(e){var r=o.extract(e.parameters,i.HIERARCHY_NAME),t=o.extract(e.parameters,i.ATTRIBUTE_NAME),n=t.value,u=a[r.value],m=s(u);return s("profile.attribute.exception.substitution.not.found",n,m)}}});