/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../model/schema/enum/filterOperandTypesEnum"],function(e,n,r){function i(e){return e===o.VARIABLE}function t(e){return e===o.LITERAL}function u(e){return e===o.RANGE}function s(e){return e===o.LIST}var o=e("../../../../../model/schema/enum/filterOperandTypesEnum");r.exports={isVariable:i,isLiteral:t,isRange:u,isList:s}});