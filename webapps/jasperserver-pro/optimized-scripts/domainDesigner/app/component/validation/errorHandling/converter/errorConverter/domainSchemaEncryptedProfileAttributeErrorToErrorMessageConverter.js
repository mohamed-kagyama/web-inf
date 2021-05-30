/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../../../../rest/enum/encryptedProfileAttributeErrorParamKeyEnum","../../util/extractPropertyByKeyUtil"],function(e,r,t){var n=e("bundle!DomainDesignerBundle"),i=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),u=e("../../../../../rest/enum/encryptedProfileAttributeErrorParamKeyEnum"),o=e("../../util/extractPropertyByKeyUtil"),s=i.create(n);t.exports={convert:function(e){var r=o.extract(e.parameters,u.ATTRIBUTE_NAME);return s("profile.attribute.exception.value.is.encrypted",r.value)}}});