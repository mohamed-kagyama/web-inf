/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/joinParserStateNamesEnum","../state/ParseJoinExpressionOperatorState","../state/ParseJoinExpressionState","../state/ParseConstantJoinExpressionState"],function(e,t,a){function s(e,t){var a=S[e];if(a)return new a({context:t,factory:{create:s}})}var r=e("../enum/joinParserStateNamesEnum"),n=e("../state/ParseJoinExpressionOperatorState"),o=e("../state/ParseJoinExpressionState"),E=e("../state/ParseConstantJoinExpressionState"),S={};S[r.PARSE_JOIN_EXPRESSION_OPERATOR_STATE]=n,S[r.PARSE_JOIN_EXPRESSION_STATE]=o,S[r.PARSE_CONSTANT_JOIN_EXPRESSION_STATE]=E,a.exports={create:s}});