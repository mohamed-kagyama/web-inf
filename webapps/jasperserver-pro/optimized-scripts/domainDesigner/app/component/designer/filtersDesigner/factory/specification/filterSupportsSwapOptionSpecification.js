/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../util/filterTypeUtil"],function(e,i,t){var r=e("../../util/filterTypeUtil");t.exports={isSatisfiedBy:function(e){return r.isFieldToFieldFilter(e.leftOperand.type,e.rightOperand.type)}}});