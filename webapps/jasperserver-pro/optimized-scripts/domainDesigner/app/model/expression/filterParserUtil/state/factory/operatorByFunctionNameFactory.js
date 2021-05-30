/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../enum/clientExpressionsEnum"],function(n,e,t){var s=n("../../../../enum/clientExpressionsEnum"),a=s.operators,i=s.functions,m={},o={};m[i.contains.name]=i.contains.name,o[i.contains.name]=i.notContains.name,m[i.startsWith.name]=i.startsWith.name,o[i.startsWith.name]=i.notStartsWith.name,m[i.endsWith.name]=i.endsWith.name,o[i.endsWith.name]=i.notEndsWith.name,m[i.isAnyValue.name]=a.in.name,t.exports={create:function(n,e){return e=e||{},e.isNot?o[n]:m[n]}}});