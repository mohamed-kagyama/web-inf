/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../enum/clientExpressionsEnum"],function(n,e,i){var t=n("../../../../enum/clientExpressionsEnum"),u=t.functions,o=t.castFunctions;i.exports={isSatisfiedBy:function(n){var e=o[n.functionName],i=1===n.operands.length,t=n.operands[0];if(e&&i)return t.function&&t.function.functionName===u.attribute.name}}});