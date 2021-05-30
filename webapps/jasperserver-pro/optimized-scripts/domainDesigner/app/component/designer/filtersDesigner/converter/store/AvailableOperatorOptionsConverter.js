/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../util/designer/filters/enum/availableOperatorsForFilterExpressionEnum"],function(e,r,t){var n=e("underscore"),o=e("../../../../../util/designer/filters/enum/availableOperatorsForFilterExpressionEnum"),a=function(e){this.valueConverter=e.valueConverter};n.extend(a.prototype,{convert:function(e){var r=e.dataType,t=e.rightOperand,n=r?o[r][t.type]:o.EQUALS_OPERATOR_ONLY;return this._formatValue(n)},_formatValue:function(e){return e.map(function(e){return{label:e.label,value:this.valueConverter.convert(e)}},this)}}),t.exports=a});