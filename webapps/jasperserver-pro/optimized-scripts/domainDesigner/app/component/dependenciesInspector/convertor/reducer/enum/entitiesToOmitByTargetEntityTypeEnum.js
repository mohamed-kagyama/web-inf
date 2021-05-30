/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../model/schema/enum/schemaEntitiesEnum"],function(E,O,N){var I=E("../../../../../../model/schema/enum/schemaEntitiesEnum"),_=[I.JOIN,I.JOIN_ALIAS,I.JOIN_EXPRESSION,I.CONSTANT_JOIN_EXPRESSION,I.COMPLEX_JOIN],T={};T[I.CONSTANT_GROUP]=[],T[I.DATA_SOURCE]=_,T[I.DATA_SOURCE_GROUP]=_,T[I.TABLE]=_,T[I.DERIVED_TABLE]=_,T[I.TABLE_GROUP]=_,T[I.FIELD]=_,T[I.CALC_FIELD]=_,T[I.FILTER_EXPRESSION]=[],T[I.COMPLEX_FILTER]=[],T[I.TABLE_REFERENCE]=_,T[I.JOIN_TREE]=_;var A=_.concat(I.JOIN_TREE);T[I.JOIN_ALIAS]=A,T[I.JOIN]=A,T[I.COMPLEX_JOIN]=A,T[I.JOIN_EXPRESSION]=A,T[I.CONSTANT_JOIN_EXPRESSION]=[],T[I.DATA_ISLAND]=[],T[I.PRESENTATION_SET]=[],T[I.PRESENTATION_FIELD]=[],N.exports=T});