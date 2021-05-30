/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(i,e,t){var n=i("underscore"),o=function(i){this.initialize(i)};n.extend(o.prototype,{initialize:function(i){this.isDraftJoinTreeOrJoinConstructorExistSpecification=i.isDraftJoinTreeOrJoinConstructorExistSpecification,this.canResourceParticipateInJoinSpecification=i.canResourceParticipateInJoinSpecification,this.canResourceBeReorderedSpecification=i.canResourceBeReorderedSpecification},isSatisfiedBy:function(i){return!!this.canResourceBeReorderedSpecification.isSatisfiedBy(i)||!this.isDraftJoinTreeOrJoinConstructorExistSpecification.isSatisfied()&&this.canResourceParticipateInJoinSpecification.isSatisfiedBy(i)}}),t.exports=o});