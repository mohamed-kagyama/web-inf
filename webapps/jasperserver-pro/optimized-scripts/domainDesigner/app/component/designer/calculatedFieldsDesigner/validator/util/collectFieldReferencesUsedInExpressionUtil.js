/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/expression/expressionVariables"],function(e,r,n){function o(e){return s.indexBy(e.allowed,"name")}function i(e,r){e=e.object;var n=o(r);return c(e).map(function(e){return s.pick(n[e],["fieldId","fieldType","sourceId","sourceType"])})}var s=e("underscore"),u=e("../../../../../model/expression/expressionVariables"),c=u.collect;n.exports=i});