/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,i){var s=e("underscore"),r=e("bundle!DomainDesignerBundle"),d=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),u=d.create(r);i.exports={validate:function(e){if(s.isEmpty(e.value))return u("domain.validation.name.empty")}}});