/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./mixin/profileAttributeOperandMixin","./mixin/addRangeFilterExpressionMixin","./specification/isProfileAttributeOperandSpecification","../enum/filterParserStateNamesEnum"],function(t,i,e){var n=t("underscore"),r=t("./mixin/profileAttributeOperandMixin"),E=t("./mixin/addRangeFilterExpressionMixin"),o=t("./specification/isProfileAttributeOperandSpecification"),c=t("../enum/filterParserStateNamesEnum"),s=function(t){this.initialize(t)};n.extend(s.prototype,{initialize:function(t){this.context=t.context,this.factory=t.factory},start:function(){return this.context.currentFilterExpression.right.start={},this.factory.create(c.SET_FILTER_EXPRESSION_RANGE_RIGHT_OPERAND_STATE,this.context)},end:function(){return this.context.currentFilterExpression.right.end={},this.factory.create(c.SET_FILTER_EXPRESSION_RANGE_RIGHT_OPERAND_STATE,this.context)},number:function(){return this.factory.create(c.SET_FILTER_EXPRESSION_RANGE_RIGHT_OPERAND_STATE,this.context)},date:function(){return this.factory.create(c.SET_FILTER_EXPRESSION_RANGE_RIGHT_OPERAND_STATE,this.context)},time:function(){return this.factory.create(c.SET_FILTER_EXPRESSION_RANGE_RIGHT_OPERAND_STATE,this.context)},timestamp:function(){return this.factory.create(c.SET_FILTER_EXPRESSION_RANGE_RIGHT_OPERAND_STATE,this.context)},function:function(t){if(o.isSatisfiedBy(t))return this._addProfileAttributeObjectToContext(t),this.factory.create(c.SET_FILTER_EXPRESSION_RANGE_PROFILE_ATTRIBUTE_RIGHT_OPERAND_STATE,this.context)},value:function(t){return this._addRangeFilterExpression(t)}},E,r),e.exports=s});