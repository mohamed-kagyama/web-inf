/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../../../../../enum/clientValidationRegExpEnum"],function(e,n,i){var d=e("bundle!DomainDesignerBundle"),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),t=e("../../../../../../enum/clientValidationRegExpEnum"),u=s.create(d);i.exports={fn:function(e){if(e&&e.match(t.BUNDLE_KEY_BLACKLIST_REGEX_PATTERN))return u("domain.designer.presentationDesigner.validation.itemBundle.key.invalid")}}});