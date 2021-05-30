/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(t,n,e){var i=t("underscore"),o=function(t){this.initialize(t)};i.extend(o.prototype,{initialize:function(t){this.constantJoinExpressionObjectFactory=t.constantJoinExpressionObjectFactory},getExpressionsWithContext:function(t,n){return this._getConstantJoinExpressionsWithContext(t,n)},_getConstantJoinExpressionsWithContext:function(t,n){var e=n.fields;return i.map(t,function(t){var n=t.toJSON(),i=e.byId(n.fieldId);return this.constantJoinExpressionObjectFactory.create(n,i.toJSON())},this)}}),e.exports=o});