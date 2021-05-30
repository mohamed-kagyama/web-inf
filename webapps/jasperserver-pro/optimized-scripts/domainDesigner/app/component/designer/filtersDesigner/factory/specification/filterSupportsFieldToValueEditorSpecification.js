/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../model/schema/util/entityUtil"],function(e,t,i){var n=e("../../../../../../model/schema/util/entityUtil");i.exports={isSatisfiedBy:function(e){var t=e.leftOperand.sourceType;return!n.isConstantGroup(t)}}});