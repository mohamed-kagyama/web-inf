/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../model/schema/enum/filterOperandTypesEnum"],function(e,n,r){var u=e("../../../../../model/schema/enum/filterOperandTypesEnum"),t={};t[u.LIST]=function(e,n){return n=n||{},{isAll:Boolean(n.isTrueAll),items:e}},t[u.RANGE]=function(e){return{start:{value:e.start},end:{value:e.end}}},t[u.LITERAL]=function(e){return{value:e}},r.exports=t});