/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,n,t){var o=e("underscore");t.exports={_addJoinExpression:function(){var e=o.cloneDeep(this.context.currentJoinExpression);this.context.joinExpressions.push(e),this._clearContext()},_clearContext:function(){this.context.currentJoinExpression={},delete this.context.isNot}}});