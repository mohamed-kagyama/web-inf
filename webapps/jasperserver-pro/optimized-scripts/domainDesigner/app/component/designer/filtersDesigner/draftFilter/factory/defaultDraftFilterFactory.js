/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../model/schema/enum/filterOperandTypesEnum","../enum/defaultNewFilterOptions"],function(e,r,n){var u=e("underscore"),o=e("../../../../../../model/schema/enum/filterOperandTypesEnum"),s=e("../enum/defaultNewFilterOptions");n.exports={create:function(e){e=u.cloneDeep(e||{});var r=u.defaults(e,{id:null,sourceId:null,sourceType:null,errors:{},expression:{}});return u.defaults(r.expression,{left:{},operator:s.operator}),u.defaults(r.expression.left,{type:o.VARIABLE}),r}}});