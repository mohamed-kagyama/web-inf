/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../enum/errorParametersKeysEnum","../../util/extractPropertyByKeyUtil"],function(e,r,n){var t=e("bundle!DomainDesignerBundle"),i=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),s=e("../../enum/errorParametersKeysEnum"),a=e("../../util/extractPropertyByKeyUtil"),o=i.create(t);n.exports={convert:function(e){var r=a.extract(e.parameters,s.INVALID_VALUE);return o("domain.designer.error.dialog.schema.invalid.join.type.error.template",r.value)}}});