/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../../model/schema/enum/genericTypesEnum","../../../../../../../model/schema/enum/filterOperandTypesEnum"],function(e,r,t){function o(e){var r={};return r[T.LITERAL]={},r[T.LIST]={},r[T.RANGE]={},r[T.LITERAL][n.INTEGER]=[e.emptyStringToNullConverter,e.profileAttributeConverter,e.stringToNumberConverter],r[T.LITERAL][n.DECIMAL]=[e.emptyStringToNullConverter,e.profileAttributeConverter,e.stringToNumberConverter],r[T.LITERAL][n.STRING]=[e.nullLabelToNullConverter,e.profileAttributeConverter,e.identityConverter],r[T.LITERAL][n.BOOLEAN]=[e.booleanStringToBooleanConverter,e.profileAttributeConverter,e.emptyStringToNullConverter],r[T.LITERAL][n.DATE]=[e.emptyStringToNullConverter,e.profileAttributeConverter,e.localizedDateToIsoDateConverter],r[T.LITERAL][n.TIME]=[e.emptyStringToNullConverter,e.profileAttributeConverter,e.localizedTimeToIsoTimeConverter],r[T.LITERAL][n.TIMESTAMP]=[e.emptyStringToNullConverter,e.profileAttributeConverter,e.localizedTimestampToIsoTimestampConverter],r[T.LIST][n.INTEGER]=[e.listNumberConverter],r[T.LIST][n.DECIMAL]=[e.listNumberConverter],r[T.LIST][n.STRING]=[e.listStringConverter],r[T.LIST][n.BOOLEAN]=[e.listBooleanConverter],r[T.RANGE][n.INTEGER]=[e.rangeNumberConverter],r[T.RANGE][n.DECIMAL]=[e.rangeNumberConverter],r[T.RANGE][n.DATE]=[e.rangeDateConverter],r[T.RANGE][n.TIME]=[e.rangeTimeConverter],r[T.RANGE][n.TIMESTAMP]=[e.rangeTimestampConverter],r}var n=e("../../../../../../../model/schema/enum/genericTypesEnum"),T=e("../../../../../../../model/schema/enum/filterOperandTypesEnum");t.exports={create:function(e){return e=e||{},o(e)}}});