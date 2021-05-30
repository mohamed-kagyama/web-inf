/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../model/enum/clientExpressionsEnum","./util/getIsNullOrOriginalExpression","./util/getFunctionExpression","./util/getStringValueOperand","./util/getVariableOperand"],function(e,i,n){var r=e("../../../../model/enum/clientExpressionsEnum"),t=e("./util/getIsNullOrOriginalExpression"),l=e("./util/getFunctionExpression"),a=e("./util/getStringValueOperand"),u=e("./util/getVariableOperand");n.exports={create:function(e){var i=e.criteria,n=e.fieldName;return{object:t({criteria:i,fieldName:n,originalExpression:l({functionName:r.functions.contains.name,leftOperand:u(n),rightOperand:a(i)})})}}}});