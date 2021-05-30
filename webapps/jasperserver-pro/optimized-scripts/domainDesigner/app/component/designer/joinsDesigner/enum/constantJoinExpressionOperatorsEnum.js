/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../model/schema/enum/genericTypesEnum","../../../../model/enum/clientExpressionsEnum"],function(e,n,s){var r=e("../../../../../model/schema/enum/genericTypesEnum"),u=e("../../../../model/enum/clientExpressionsEnum"),E=u.operators,o=[E.equals,E.notEqual,E.greater,E.less,E.greaterOrEqual,E.lessOrEqual,E.in,E.notIn],l=[E.equals,E.notEqual,E.in,E.notIn],m={};m[r.INTEGER]=o,m[r.DECIMAL]=o,m[r.STRING]=l,m[r.BOOLEAN]=l,m[r.DATE]=o,m[r.TIMESTAMP]=o,m[r.TIME]=o,s.exports=m});