/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/js-sdk/src/common/util/parse/time","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,i){var s=e("runtime_dependencies/js-sdk/src/common/util/parse/time"),r=e("bundle!DomainDesignerBundle"),d=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),t=d.create(r);i.exports={validate:function(e){if(-1!==s.compareTimes(e.start.value,e.end.value))return{end:t("domain.designer.filters.validation.range.endTimeMustBeAfterStartTime")}}}});