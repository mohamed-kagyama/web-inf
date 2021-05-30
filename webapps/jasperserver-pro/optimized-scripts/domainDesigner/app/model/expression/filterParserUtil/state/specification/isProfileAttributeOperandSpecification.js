/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../enum/clientExpressionsEnum","./isProfileAttributeOperandCastedSpecification"],function(e,i,t){var n=e("../../../../enum/clientExpressionsEnum"),s=e("./isProfileAttributeOperandCastedSpecification"),r=n.functions;t.exports={isSatisfiedBy:function(e){return e.functionName===r.attribute.name||s.isSatisfiedBy(e)}}});