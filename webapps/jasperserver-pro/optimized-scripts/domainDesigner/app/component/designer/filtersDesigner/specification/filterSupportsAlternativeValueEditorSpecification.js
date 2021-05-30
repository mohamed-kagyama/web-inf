/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../model/enum/clientExpressionsEnum","../../../../../model/schema/enum/genericTypesEnum"],function(e,n,o){var r=e("../../../../model/enum/clientExpressionsEnum"),m=e("../../../../../model/schema/enum/genericTypesEnum"),a=r.operators;o.exports={isSatisfiedBy:function(e){var n=e.operator===a.equals.name||e.operator===a.notEqual.name,o=e.dataType===m.BOOLEAN||e.dataType===m.STRING;return n&&o}}});