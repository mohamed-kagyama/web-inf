/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/js-sdk/src/common/util/parse/date","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,s){var i=e("runtime_dependencies/js-sdk/src/common/util/parse/date"),t=e("bundle!DomainDesignerBundle"),d=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),r=d.create(t);s.exports={validate:function(e){if(-1!==i.compareTimestamps(e.start.value,e.end.value))return{end:r("domain.designer.filters.validation.range.endTimestampMustBeAfterStartTimestamp")}}}});