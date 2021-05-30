/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./mixin/addFilterExpressionMixin","../../../../../model/schema/enum/filterOperandTypesEnum","../enum/filterParserStateNamesEnum"],function(e,t,i){var n=e("underscore"),r=e("./mixin/addFilterExpressionMixin"),s=e("../../../../../model/schema/enum/filterOperandTypesEnum"),o=e("../enum/filterParserStateNamesEnum"),a=function(e){this.initialize(e)};n.extend(a.prototype,{initialize:function(e){this.factory=e.factory,this.context=e.context},variable:function(){return this.context.currentFilterExpression.left={type:s.VARIABLE},this.factory.create(o.SET_FILTER_EXPRESSION_LEFT_OPERAND_STATE,this.context)},name:function(e){return this.context.currentFilterExpression.left.name=e,this.context.isAnyValue?(this._addIsAnyValueFilterExpression(),this.factory.create(o.SET_FILTER_EXPRESSION_OPERATOR_STATE,this.context)):this.factory.create(o.SET_FILTER_EXPRESSION_RIGHT_OPERAND_STATE,this.context)},_addIsAnyValueFilterExpression:function(){this.context.currentFilterExpression.right={type:s.LIST,items:[],isAll:!0},this._addFilterExpression()}},r),i.exports=a});