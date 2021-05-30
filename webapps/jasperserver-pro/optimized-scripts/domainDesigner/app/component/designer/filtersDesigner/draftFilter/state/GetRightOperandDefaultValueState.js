/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/draftFilterStateEnum"],function(e,i,t){var a=e("underscore"),n=e("../enum/draftFilterStateEnum"),u=function(e){this.initialize(e)};a.extend(u.prototype,{initialize:function(e){this.shouldUseDefaultValueForRightOperandSpecification=e.shouldUseDefaultValueForRightOperandSpecification},enter:function(e,i){var t=e.availableValues;this.shouldUseDefaultValueForRightOperandSpecification.isSatisfiedBy(e)&&(e.newFilterOptions.availableValues=t.map(function(e){return e.value})),delete e.availableValues,i.enter(n.GET_RIGHT_OPERAND_STATE,e)}}),t.exports=u});