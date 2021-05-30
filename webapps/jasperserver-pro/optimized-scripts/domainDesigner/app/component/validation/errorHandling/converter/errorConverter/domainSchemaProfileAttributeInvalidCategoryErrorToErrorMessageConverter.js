/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,i){var r=e("bundle!DomainDesignerBundle"),t=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),s=t.create(r);i.exports={convert:function(e){var n=e.parameters;return s("profile.attribute.exception.substitution.category.invalid",n[0],n[1],n[2])}}});