/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../../../../util/designer/filters/enum/booleanStringEquivalentEnum"],function(e,n,i){function r(e){return e===o.TRUE}function t(e){return e===o.FALSE}var u=e("bundle!DomainDesignerBundle"),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),o=e("../../../../../util/designer/filters/enum/booleanStringEquivalentEnum"),d=s.create(u);i.exports={validate:function(e){if(e&&!r(e)&&!t(e))return d("domain.designer.filters.validation.rightOperand.isNotAValidBoolean")}}});