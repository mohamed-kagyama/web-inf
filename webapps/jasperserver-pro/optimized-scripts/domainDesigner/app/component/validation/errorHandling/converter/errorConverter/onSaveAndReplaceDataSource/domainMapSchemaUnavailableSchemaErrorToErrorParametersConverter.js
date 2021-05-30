/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,r){var s=e("underscore"),a=e("bundle!DomainDesignerBundle"),i=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),o=i.create(a);r.exports={convert:function(e){var n=e.parameters.unavailableSchemas,r=e.parameters.dataSourceName,a=s.map(n,function(e){return o("domain.designer.error.dialog.schema.message",e,r)});return a.push(o("domain.designer.error.dialog.schema.message.generic")),a}}});