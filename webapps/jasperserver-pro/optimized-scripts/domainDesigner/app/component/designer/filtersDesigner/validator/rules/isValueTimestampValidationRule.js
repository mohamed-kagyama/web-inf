/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","runtime_dependencies/js-sdk/src/common/util/parse/date"],function(e,n,i){var s=e("bundle!DomainDesignerBundle"),d=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),r=e("runtime_dependencies/js-sdk/src/common/util/parse/date"),t=d.create(s);i.exports={validate:function(e){if(e&&!r.isTimestamp(e))return t("domain.designer.filters.validation.rightOperand.isNotTimestamp",e)}}});