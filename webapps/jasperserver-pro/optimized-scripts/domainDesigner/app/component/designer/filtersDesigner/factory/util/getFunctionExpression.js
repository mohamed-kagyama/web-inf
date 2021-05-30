/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../model/enum/clientExpressionsEnum"],function(n,e,o){function r(n){var e=n.functionName,o=n.leftOperand,r=n.rightOperand,i={},u={};u[t.functions.functionName.name]=e;var a=[];return a[0]=o,a[1]=r,u[t.operators.operands.name]=a,i[t.functions.function.name]=u,i}var t=n("../../../../../model/enum/clientExpressionsEnum");o.exports=r});