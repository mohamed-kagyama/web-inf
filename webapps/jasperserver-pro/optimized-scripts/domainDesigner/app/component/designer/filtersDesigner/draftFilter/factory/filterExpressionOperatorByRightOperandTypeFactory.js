/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../util/designer/filters/enum/availableOperatorsForFilterExpressionEnum","../../../../../model/enum/clientExpressionsEnum"],function(e,r,n){function o(e,r){return t.some(r,function(r){return r.operator===e})}var t=e("underscore"),s=e("../../../../../util/designer/filters/enum/availableOperatorsForFilterExpressionEnum"),i=e("../../../../../model/enum/clientExpressionsEnum");n.exports={create:function(e){var r=e.operator,n=e.operandType,t=e.dataType,u=i.operators.equals.name;return o(r,t?s[t][n]:s.EQUALS_OPERATOR_ONLY)?r:u}}});