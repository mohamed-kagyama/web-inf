/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/schema/util/entityUtil"],function(e,t,n){var i=e("underscore"),o=e("../../../../../model/schema/util/entityUtil"),r=function(){};i.extend(r.prototype,{getEntities:function(e){return e.joinExpressions.filter(o.isConstantJoinExpression)}}),n.exports=r});