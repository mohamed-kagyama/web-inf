/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/schema/util/entityUtil"],function(e,i,r){var t=e("underscore"),n=e("../../../../../model/schema/util/entityUtil"),o=function(e){this.initialize(e)};t.extend(o.prototype,{initialize:function(e){this.isResourceDroppableFieldSpecification=e.isResourceDroppableFieldSpecification},isSatisfiedBy:function(e){var i=e.resource,r=i.id,t=i.type,o=i.calcFieldSourceType;if(n.isJoinTree(o)||n.isConstantGroup(o))return!1;var s=!1;e.joinTreeId&&i.parentJoinTreeId&&(s=e.joinTreeId===i.parentJoinTreeId);var a=!i.parentJoinTreeId;return this.isResourceDroppableFieldSpecification.isSatisfiedBy({id:r,type:t})&&(a||s)}}),r.exports=o});