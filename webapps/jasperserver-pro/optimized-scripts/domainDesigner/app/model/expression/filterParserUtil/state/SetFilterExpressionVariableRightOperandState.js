/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/schema/enum/filterOperandTypesEnum","../enum/filterParserStateNamesEnum","./mixin/addFilterExpressionMixin"],function(e,t,i){var n=e("underscore"),r=e("../../../../../model/schema/enum/filterOperandTypesEnum"),s=e("../enum/filterParserStateNamesEnum"),o=e("./mixin/addFilterExpressionMixin"),a=function(e){this.initialize(e)};n.extend(a.prototype,{initialize:function(e){this.context=e.context,this.factory=e.factory},name:function(e){return this.context.currentFilterExpression.right={type:r.VARIABLE,name:e},this._addFilterExpression(),this.factory.create(s.SET_FILTER_EXPRESSION_OPERATOR_STATE,this.context)}},o),i.exports=a});