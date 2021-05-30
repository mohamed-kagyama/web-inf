/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/filterParserStateNamesEnum","../state/SetFilterExpressionOperatorState","../state/SetFilterExpressionLeftOperandState","../state/SetFilterExpressionRightOperandState","../state/SetFilterExpressionLiteralProfileAttributeRightOperandState","../state/SetFilterExpressionRangeProfileAttributeRightOperandState","../state/SetFilterExpressionLiteralRightOperandState","../state/SetFilterExpressionRangeRightOperandState","../state/SetFilterExpressionListRightOperandState","../state/SetFilterExpressionVariableRightOperandState","../state/ParseComplexFilterExpressionState"],function(t,e,r){function E(t,e){var r=o[t];if(r)return new r({context:e,factory:{create:E}})}var a=t("../enum/filterParserStateNamesEnum"),S=t("../state/SetFilterExpressionOperatorState"),i=t("../state/SetFilterExpressionLeftOperandState"),s=t("../state/SetFilterExpressionRightOperandState"),R=t("../state/SetFilterExpressionLiteralProfileAttributeRightOperandState"),_=t("../state/SetFilterExpressionRangeProfileAttributeRightOperandState"),T=t("../state/SetFilterExpressionLiteralRightOperandState"),n=t("../state/SetFilterExpressionRangeRightOperandState"),p=t("../state/SetFilterExpressionListRightOperandState"),O=t("../state/SetFilterExpressionVariableRightOperandState"),l=t("../state/ParseComplexFilterExpressionState"),o={};o[a.SET_FILTER_EXPRESSION_OPERATOR_STATE]=S,o[a.SET_FILTER_EXPRESSION_LEFT_OPERAND_STATE]=i,o[a.SET_FILTER_EXPRESSION_RIGHT_OPERAND_STATE]=s,o[a.SET_FILTER_EXPRESSION_LITERAL_PROFILE_ATTRIBUTE_RIGHT_OPERAND_STATE]=R,o[a.SET_FILTER_EXPRESSION_RANGE_PROFILE_ATTRIBUTE_RIGHT_OPERAND_STATE]=_,o[a.SET_FILTER_EXPRESSION_LITERAL_RIGHT_OPERAND_STATE]=T,o[a.SET_FILTER_EXPRESSION_RANGE_RIGHT_OPERAND_STATE]=n,o[a.SET_FILTER_EXPRESSION_LIST_RIGHT_OPERAND_STATE]=p,o[a.SET_FILTER_EXPRESSION_VARIABLE_RIGHT_OPERAND_STATE]=O,o[a.PARSE_COMPLEX_FILTER_EXPRESSION_STATE]=l,r.exports={create:E}});