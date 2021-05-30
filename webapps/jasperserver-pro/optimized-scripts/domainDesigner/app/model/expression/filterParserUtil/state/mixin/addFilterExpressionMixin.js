/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,i){var n=e("underscore");i.exports={_addFilterExpression:function(){var e=n.cloneDeep(this.context.currentFilterExpression);this.context.filterExpressions.push(e),this._clearContext()},_clearContext:function(){this.context.currentFilterExpression={},delete this.context.profileAttribute,delete this.context.listSize,delete this.context.isNot,delete this.context.isAnyValue}}});