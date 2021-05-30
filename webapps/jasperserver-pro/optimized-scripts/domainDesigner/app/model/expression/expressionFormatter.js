/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/expressionFormatEnum"],function(r,e,n){function o(r){var e=r.leftOperand,n=r.rightOperand,o=r.operator;return(0,t[o])({leftOperand:e,rightOperand:n})}var t=(r("underscore"),r("../enum/expressionFormatEnum"));n.exports={formatOperatorWithTwoOperands:o}});