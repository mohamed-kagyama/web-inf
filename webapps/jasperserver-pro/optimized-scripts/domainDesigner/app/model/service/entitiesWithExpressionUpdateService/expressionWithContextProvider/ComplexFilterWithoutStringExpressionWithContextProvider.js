/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,t){var r=e("underscore"),n=function(e){this.initialize(e)};r.extend(n.prototype,{initialize:function(e){this.complexFilterExpressionVariableMapper=e.complexFilterExpressionVariableMapper},getExpressionsWithContext:function(e,i){return this._getComplexFiltersExpressionsWithContext(e,i)},_getComplexFiltersExpressionsWithContext:function(e,i){return r.map(e,function(e){return{expression:{object:e.getExpression().object},variables:e.getFieldReferences().map(r.partial(this.complexFilterExpressionVariableMapper,i))}},this)}}),t.exports=n});