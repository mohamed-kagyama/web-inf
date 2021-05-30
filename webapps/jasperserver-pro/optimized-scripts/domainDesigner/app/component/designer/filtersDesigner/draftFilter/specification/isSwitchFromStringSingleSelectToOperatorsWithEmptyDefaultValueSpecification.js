/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../model/schema/enum/genericTypesEnum","./list/operatorsForAvailableValuesCheck","../../util/filterOperandTypeUtil"],function(e,r,i){function t(e){var r=e.currentFilter,i=r.expression.right;return i&&o.isLiteral(i.type)&&!r.isRawValueEditor}var n=e("underscore"),a=e("../../../../../../model/schema/enum/genericTypesEnum"),l=e("./list/operatorsForAvailableValuesCheck"),o=e("../../util/filterOperandTypeUtil");i.exports={isSatisfiedBy:function(e){var r=n.indexOf(l,e.newFilterOptions.operator)>=0;return e.currentFilter.dataType===a.STRING&&t(e)&&r}}});