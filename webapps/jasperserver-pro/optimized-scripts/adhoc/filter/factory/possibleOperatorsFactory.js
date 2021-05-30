/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/filterDataTypes","../enum/filterOperators"],function(E,T,N){var A=E("../enum/filterDataTypes"),_=E("../enum/filterOperators"),S={};S[A.STRING]=[_.IN,_.NOT_IN,_.EQUALS,_.NOT_EQUAL,_.CONTAINS,_.NOT_CONTAINS,_.STARTS_WITH,_.NOT_STARTS_WITH,_.ENDS_WITH,_.NOT_ENDS_WITH],S[A.NUMERIC]=[_.IN,_.NOT_IN,_.EQUALS,_.NOT_EQUAL,_.LESS,_.GREATER,_.GREATER_OR_EQUAL,_.LESS_OR_EQUAL,_.BETWEEN,_.NOT_BETWEEN],S[A.BOOLEAN]=[_.IN,_.NOT_IN,_.EQUALS,_.NOT_EQUAL],S[A.TIMESTAMP]=[_.EQUALS,_.NOT_EQUAL,_.LESS,_.GREATER,_.GREATER_OR_EQUAL,_.LESS_OR_EQUAL,_.BETWEEN_DATES,_.NOT_BETWEEN_DATES],S[A.TIME]=[_.EQUALS,_.NOT_EQUAL,_.LESS,_.GREATER,_.GREATER_OR_EQUAL,_.LESS_OR_EQUAL,_.BETWEEN,_.NOT_BETWEEN],S[A.INTEGER]=S[A.NUMERIC],S[A.LONG]=S[A.NUMERIC],S[A.DECIMAL]=S[A.NUMERIC],S[A.DATE]=S[A.TIMESTAMP];var O=[_.IN,_.NOT_IN,_.EQUALS,_.NOT_EQUAL];N.exports=function(E,T){return T?O:S.hasOwnProperty(E)?S[E]:[]}});