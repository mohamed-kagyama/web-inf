/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/constantVariableEnum","../../../enum/clientExpressionsEnum"],function(n,e,r){function t(n){var e=n.match(m);if(e)return e[1]}var i=n("../enum/constantVariableEnum"),a=n("../../../enum/clientExpressionsEnum"),u=a.operators,m=new RegExp(i.CONSTANT+" "+u.in.name+" (\\(.+?\\))"),o={};o[u.in.name]=t,o[u.notIn.name]=t,r.exports={create:function(n,e){var r=o[n];return r?r(e.string):e.string}}});