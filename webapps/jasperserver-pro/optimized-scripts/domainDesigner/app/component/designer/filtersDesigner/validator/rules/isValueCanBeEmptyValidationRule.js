/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../../../../model/enum/clientExpressionsEnum"],function(e,n,r){var s=e("underscore"),i=e("bundle!DomainDesignerBundle"),a=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),o=e("../../../../../model/enum/clientExpressionsEnum"),d=a.create(i),u=o.operators,m=[u.greater.name,u.less.name,u.greaterOrEqual.name,u.lessOrEqual.name];r.exports={validate:function(e,n){if(""===e&&s.indexOf(m,n.operator)>-1)return d("domain.designer.filters.validation.rightOperand.emptyValue",e)}}});