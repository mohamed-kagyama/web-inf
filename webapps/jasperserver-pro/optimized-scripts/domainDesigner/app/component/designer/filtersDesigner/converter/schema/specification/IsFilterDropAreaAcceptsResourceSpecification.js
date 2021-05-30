/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,s){var a=e("underscore"),t=function(e){this.initialize(e)};a.extend(t.prototype,{initialize:function(e){this.isResourcesHaveTheSameTypeSpecification=e.isResourcesHaveTheSameTypeSpecification,this.isResourcesHaveTheSameSourceSpecification=e.isResourcesHaveTheSameSourceSpecification,this.isResourcesHaveRelatedTypesSpecification=e.isResourcesHaveRelatedTypesSpecification},isSatisfiedBy:function(e){var i=e.filter,s=e.currentOperandSide,a=i.dataType,t=i.expression[s].fieldId;return!a||!t&&((this.isResourcesHaveTheSameTypeSpecification.isSatisfiedBy(e)||this.isResourcesHaveRelatedTypesSpecification.isSatisfiedBy(e))&&this.isResourcesHaveTheSameSourceSpecification.isSatisfiedBy(e))}}),s.exports=t});