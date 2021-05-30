/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../enum/clientExpressionsEnum","../../../expressionWalker"],function(e,n,r){function i(e){return Boolean(e[t.variable.name])}function o(e){var n=!1;return a.walk(e,{variable:function(){return n=!0}}),n}var s=e("../../../../enum/clientExpressionsEnum"),a=e("../../../expressionWalker"),t=s.operators;r.exports={isSatisfiedBy:function(e){var n=e.firstOperand,r=e.secondOperand;return i(n)&&!o(r)}}});