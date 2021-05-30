/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../../../../../enum/clientValidationRegExpEnum"],function(e,n,i){var r=e("bundle!DomainDesignerBundle"),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),t=e("../../../../../../enum/clientValidationRegExpEnum"),d=s.create(r);i.exports={fn:function(e){if(e&&e.match(t.STARTS_FROM_A_NUMBER))return d("domain.designer.presentationDesigner.validation.id.startFromNumber")}}});