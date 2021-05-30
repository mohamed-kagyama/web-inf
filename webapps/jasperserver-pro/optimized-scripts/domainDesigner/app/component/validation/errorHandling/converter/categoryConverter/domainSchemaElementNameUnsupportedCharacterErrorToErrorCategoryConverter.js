/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../enum/errorParametersKeysEnum","../../util/extractPropertyByKeyUtil"],function(e,r,n){var t=e("underscore"),s=e("bundle!DomainDesignerBundle"),a=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),i=e("../../enum/errorParametersKeysEnum"),u=e("../../util/extractPropertyByKeyUtil"),o=a.create(s);n.exports={convert:function(e){var r=t.first(e),n=u.extract(r.parameters,i.UNSUPPORTED_CHARACTERS);return o("domain.designer.error.dialog.schema.element.name.unsupported.character.category",n.value)}}});