/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../util/filterOperandTypeUtil","../../../../../model/enum/clientExpressionsEnum"],function(e,r,n){var i=e("underscore"),t=e("../../util/filterOperandTypeUtil"),o=e("../../../../../model/enum/clientExpressionsEnum");n.exports={isSatisfiedBy:function(e){var r=[o.operators.equals.name,o.operators.notEqual.name],n=t.isLiteral(e.rightOperandType),s=i.indexOf(r,e.operator)>=0;return n&&s}}});