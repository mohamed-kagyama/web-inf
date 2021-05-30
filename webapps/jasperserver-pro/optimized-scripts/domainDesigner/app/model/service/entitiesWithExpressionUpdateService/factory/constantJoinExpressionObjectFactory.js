/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/constantVariableEnum","../../../enum/clientExpressionsEnum"],function(n,e,a){function r(n,e){return{expression:{object:n},variables:e}}function t(n){return[{name:m.CONSTANT,type:n.type}]}function o(n){var e={},a={};return a[c.variable.name]={},a[c.variable.name][c.name.name]=m.CONSTANT,e[c.in.name]={},e[c.in.name][c.operands.name]=[a,n.value],e}function u(n,e){return r(o(n),t(e))}function i(n,e){var a=o(n),u=t(e),i={};return i[c.not.name]={},i[c.not.name][c.operands.name]=[a],r(i,u)}var m=n("../enum/constantVariableEnum"),s=n("../../../enum/clientExpressionsEnum"),c=s.operators,p={};p[c.in.name]=u,p[c.notIn.name]=i,a.exports={create:function(n,e){var a=n.operator,r=n.value,t={expression:{object:r}},o=p[a];return o&&(t=o(n,e)),t}}});