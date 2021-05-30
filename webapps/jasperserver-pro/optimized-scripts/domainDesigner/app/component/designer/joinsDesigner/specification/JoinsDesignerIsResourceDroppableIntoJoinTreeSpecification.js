/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(i,t,e){var n=i("underscore"),o=function(i){this.initialize(i)};n.extend(o.prototype,{initialize:function(i){this.isDraftJoinTreeOrJoinConstructorExistSpecification=i.isDraftJoinTreeOrJoinConstructorExistSpecification,this.canResourceParticipateInJoinSpecification=i.canResourceParticipateInJoinSpecification},isSatisfiedBy:function(i){return!this.isDraftJoinTreeOrJoinConstructorExistSpecification.isSatisfied()&&this.canResourceParticipateInJoinSpecification.isSatisfiedBy(i)}}),e.exports=o});