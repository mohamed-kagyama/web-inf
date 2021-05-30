/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../enum/errorParametersKeysEnum","../../util/extractPropertyByKeyUtil"],function(e,r,n){var t=e("underscore"),i=e("bundle!DomainDesignerBundle"),a=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),s=e("../../enum/errorParametersKeysEnum"),o=e("../../util/extractPropertyByKeyUtil"),u=a.create(i);n.exports={convert:function(e){var r=o.extract(e.parameters,s.EXPRESSION),n=o.extract(e.parameters,s.INVALID_GROUP);return n=t.isArray(n)?n.map(function(e){return e.value}).join(", "):n.value,u("domain.designer.error.dialog.schema.join.expression.invalid.group.reference.error.template",r.value,n)}}});