/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../enum/clientExpressionsEnum"],function(n,e,r){function o(n){return Boolean(n[a.variable.name])}function i(n){return n!=a.in.name&&n!=a.notIn.name}var t=n("../../../../enum/clientExpressionsEnum"),a=t.operators;r.exports={isSatisfiedBy:function(n){var e=n.operator,r=n.firstOperand,t=n.secondOperand;return i(e)&&o(r)&&o(t)}}});