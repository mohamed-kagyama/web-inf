/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../model/enum/clientExpressionsEnum"],function(e,n,a){var r=e("underscore"),m=e("../../../../model/enum/clientExpressionsEnum"),s=m.operators,l={IN_AND_NOT_IN:[s.in.name,s.notIn.name],ALL_EXCEPT_IN_AND_NOT_IN:[s.equals.name,s.notEqual.name,s.greater.name,s.less.name,s.greaterOrEqual.name,s.lessOrEqual.name]},u={},o=r.pick(s,l.IN_AND_NOT_IN);u[s.in.name]=o,u[s.notIn.name]=o;var N=r.pick(s,l.ALL_EXCEPT_IN_AND_NOT_IN);u[s.equals.name]=N,u[s.notEqual.name]=N,u[s.less.name]=N,u[s.lessOrEqual.name]=N,u[s.greater.name]=N,u[s.greaterOrEqual.name]=N,a.exports=u});