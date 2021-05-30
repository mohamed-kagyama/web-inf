/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../common/util/numberUtil","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,i){var r=e("../../../../../common/util/numberUtil"),s=e("bundle!DomainDesignerBundle"),u=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),a=u.create(s);i.exports={validate:function(e){if(r.parseNumber(e.start.value)>=r.parseNumber(e.end.value))return{end:a("domain.designer.filters.validation.range.secondValueShouldBeLessThanFirstValue")}}}});