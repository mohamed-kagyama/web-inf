/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(t,n,e){var i=t("underscore"),o=function(t){this.initialize(t)};i.extend(o.prototype,{initialize:function(t){this.constantJoinExpressionStringFactory=t.constantJoinExpressionStringFactory},update:function(t,n){i.each(t,function(t,e){var i=n[e],o=this.constantJoinExpressionStringFactory.create(i.getOperator(),t.expression);i.setValue(o)},this)}}),e.exports=o});