/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,i){function r(e){return""===e}var t=e("bundle!DomainDesignerBundle"),a=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),d=a.create(t);i.exports={validate:function(e){var n={};if(r(e.start.value)&&(n.start=d("domain.designer.filters.validation.rightOperand.emptyValue")),r(e.end.value)&&(n.end=d("domain.designer.filters.validation.rightOperand.emptyValue")),n.start||n.end)return n}}});