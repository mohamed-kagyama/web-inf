/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../enum/errorParametersKeysEnum","../../util/extractPropertyByKeyUtil"],function(e,r,n){var i=e("bundle!DomainDesignerBundle"),t=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),a=e("../../enum/errorParametersKeysEnum"),o=e("../../util/extractPropertyByKeyUtil"),d=t.create(i);n.exports={convert:function(e){var r=o.extract(e.parameters,a.LOCALE),n=r.value;return n?d("domain.designer.error.dialog.domain.bundle.file.invalid.error.template",n):d("domain.designer.error.dialog.domain.bundle.file.invalid.error.default.locale.template")}}});