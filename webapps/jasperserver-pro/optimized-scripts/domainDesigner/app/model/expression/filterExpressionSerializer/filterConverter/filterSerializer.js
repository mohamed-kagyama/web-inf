/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../factory/filterOperandFactory","../factory/filterObjectByOperatorFactory"],function(r,t,e){var a=r("../factory/filterOperandFactory"),o=r("../factory/filterObjectByOperatorFactory");e.exports={convert:function(r){var t=r.right.isAll,e=a.create(r.left),c=a.create(r.right);return o.create(r.operator,{leftOperand:e,rightOperand:c,isAll:t})}}});