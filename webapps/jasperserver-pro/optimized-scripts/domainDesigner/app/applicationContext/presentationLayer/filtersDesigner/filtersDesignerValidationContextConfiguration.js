/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../common/factory/compositeAndValidationRuleFactory","../../../common/factory/compositeOrValidationRuleFactory","../../../component/designer/filtersDesigner/validator/rules/isRangeNotEmptyValidationRule","../../../component/designer/filtersDesigner/validator/rules/isValueInsideBoundariesValidationRule","../../../component/designer/filtersDesigner/validator/rules/isValueDecimalValidationRule","../../../component/designer/filtersDesigner/validator/rules/isValueIntegerValidationRule","../../../component/designer/filtersDesigner/validator/rules/isValueDateValidationRule","../../../component/designer/filtersDesigner/validator/rules/isValueTimeValidationRule","../../../component/designer/filtersDesigner/validator/rules/isValueTimestampValidationRule","../../../component/designer/filtersDesigner/validator/rules/isValueBooleanValidationRule","../../../component/designer/filtersDesigner/validator/rules/isNumberRangeCorrectValidationRule","../../../component/designer/filtersDesigner/validator/rules/isDateRangeCorrectValidationRule","../../../component/designer/filtersDesigner/validator/rules/isTimeRangeCorrectValidationRule","../../../component/designer/filtersDesigner/validator/rules/isTimestampRangeCorrectValidationRule","../../../component/designer/filtersDesigner/validator/rules/isValueCanBeEmptyValidationRule","../../../component/designer/filtersDesigner/validator/rules/isValueProfileAttributeValidationRule","../../../component/designer/filtersDesigner/validator/rules/isRangeProfileAttributeValidationRule","../../../component/designer/filtersDesigner/validator/config/draftFilterValidatorConfigFactory","../../../component/designer/filtersDesigner/validator/FiltersDesignerDraftFilterValidator"],function(e,i,a){function r(e,i){var a=l.create([v,t.create([D,d,o])]),r=l.create([v,t.create([D,s,o])]),b=l.create([v,t.create([D,u])]),T=l.create([v,t.create([D,g])]),A=l.create([v,t.create([D,c])]),B=l.create([v,m]),L=t.create([n,l.create([C,V])]),E=t.create([n,l.create([C,f])]),I=t.create([n,l.create([C,R])]),N=t.create([n,l.create([C,p])]),P=F.create({integerLiteralValidationRule:a,decimalLiteralValidationRule:r,dateLiteralValidationRule:b,timeLiteralValidationRule:T,timestampLiteralValidationRule:A,booleanLiteralValidationRule:B,numberRangeValidationRule:L,dateRangeValidationRule:E,timeRangeValidationRule:I,timestampRangeValidationRule:N});e.register("draftFilterValidatorConfig",P),e.register("filtersDesignerDraftFilterValidator",new y({clientDomainSchemaService:e.get("clientDomainSchemaService"),validatorConfig:e.get("draftFilterValidatorConfig")}))}var t=e("../../../common/factory/compositeAndValidationRuleFactory"),l=e("../../../common/factory/compositeOrValidationRuleFactory"),n=e("../../../component/designer/filtersDesigner/validator/rules/isRangeNotEmptyValidationRule"),o=e("../../../component/designer/filtersDesigner/validator/rules/isValueInsideBoundariesValidationRule"),s=e("../../../component/designer/filtersDesigner/validator/rules/isValueDecimalValidationRule"),d=e("../../../component/designer/filtersDesigner/validator/rules/isValueIntegerValidationRule"),u=e("../../../component/designer/filtersDesigner/validator/rules/isValueDateValidationRule"),g=e("../../../component/designer/filtersDesigner/validator/rules/isValueTimeValidationRule"),c=e("../../../component/designer/filtersDesigner/validator/rules/isValueTimestampValidationRule"),m=e("../../../component/designer/filtersDesigner/validator/rules/isValueBooleanValidationRule"),V=e("../../../component/designer/filtersDesigner/validator/rules/isNumberRangeCorrectValidationRule"),f=e("../../../component/designer/filtersDesigner/validator/rules/isDateRangeCorrectValidationRule"),R=e("../../../component/designer/filtersDesigner/validator/rules/isTimeRangeCorrectValidationRule"),p=e("../../../component/designer/filtersDesigner/validator/rules/isTimestampRangeCorrectValidationRule"),D=e("../../../component/designer/filtersDesigner/validator/rules/isValueCanBeEmptyValidationRule"),v=e("../../../component/designer/filtersDesigner/validator/rules/isValueProfileAttributeValidationRule"),C=e("../../../component/designer/filtersDesigner/validator/rules/isRangeProfileAttributeValidationRule"),F=e("../../../component/designer/filtersDesigner/validator/config/draftFilterValidatorConfigFactory"),y=e("../../../component/designer/filtersDesigner/validator/FiltersDesignerDraftFilterValidator");a.exports=function(e,i){r(e,i)}});