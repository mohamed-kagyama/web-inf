/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../model/enum/expressionsEnum","../../../../../model/enum/nullExpressionOperatorEnum","settings!domainSettings","./getOperatorExpression","./getVariableOperand"],function(e,r,n){function o(e,r){return i({operator:s.operators.or.name,operands:[i({operator:s.operators.equals.name,operands:[p(e),t]}),r]})}var s=e("../../../../../model/enum/expressionsEnum"),t=e("../../../../../model/enum/nullExpressionOperatorEnum"),a=e("settings!domainSettings"),i=e("./getOperatorExpression"),p=e("./getVariableOperand");n.exports=function(e){var r=e.criteria,n=e.fieldName,s=e.originalExpression;return a.nullLabel.toLowerCase().indexOf(r.toLowerCase())>-1?o(n,s):s}});