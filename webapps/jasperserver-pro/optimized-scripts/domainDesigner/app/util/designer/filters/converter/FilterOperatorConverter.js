/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/availableOperatorsForFilterExpressionEnum"],function(e,r,n){var a=e("underscore"),i=e("../enum/availableOperatorsForFilterExpressionEnum"),t=function(e){this.initialize(e)};a.extend(t.prototype,{initialize:function(e){this.availableOperatorsEnum=e.availableOperatorsEnum||i},convert:function(e,r){var n=r.dataType,i=r.rightOperandType,t=this.availableOperatorsEnum[n][i];return(a.find(t,function(r){return r.operator===e&&r.rightOperand===i})||{}).label}}),n.exports=t});