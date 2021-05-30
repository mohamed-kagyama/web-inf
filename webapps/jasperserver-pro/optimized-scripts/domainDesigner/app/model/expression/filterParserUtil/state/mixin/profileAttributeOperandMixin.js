/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../model/util/profileAttributeUtil","../specification/isProfileAttributeOperandCastedSpecification"],function(t,e,i){var r=t("../../../../../../model/util/profileAttributeUtil"),o=t("../specification/isProfileAttributeOperandCastedSpecification");i.exports={_addProfileAttributeObjectToContext:function(t){var e=t.operands;o.isSatisfiedBy(t)&&(e=e[0].function.operands),this.context.profileAttribute={operandsQuantity:e.length,operands:[]}},_addProfileAttributeFnOperand:function(t){this.context.profileAttribute.operands.push(t)},_getProfileAttributeString:function(){var t=this.context.profileAttribute.operands,e=this.context.profileAttribute.operandsQuantity;if(t.length===e)return r.createProfileAttributeFunctionWithArgs(t)}}});