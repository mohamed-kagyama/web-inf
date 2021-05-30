/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","../../../../../common/util/numberUtil","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,i){var r=e("bundle!DomainDesignerBundle"),t=e("../../../../../common/util/numberUtil"),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),o=s.create(r);i.exports={validate:function(e){if(e&&!t.isInteger(e))return o("domain.designer.filters.validation.rightOperand.incorrectType",e)}}});