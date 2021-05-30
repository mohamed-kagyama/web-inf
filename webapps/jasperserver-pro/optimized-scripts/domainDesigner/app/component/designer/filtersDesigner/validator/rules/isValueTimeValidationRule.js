/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","runtime_dependencies/js-sdk/src/common/util/parse/time"],function(e,i,n){var s=e("bundle!DomainDesignerBundle"),r=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),d=e("runtime_dependencies/js-sdk/src/common/util/parse/time"),t=r.create(s);n.exports={validate:function(e){if(e&&!d.isTime(e))return t("domain.designer.filters.validation.rightOperand.isNotTime",e)}}});