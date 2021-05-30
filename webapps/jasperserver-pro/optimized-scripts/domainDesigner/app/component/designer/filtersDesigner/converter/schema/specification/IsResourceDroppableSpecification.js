/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../../model/schema/util/entityUtil"],function(e,i,t){var r=e("underscore"),n=e("../../../../../../../model/schema/util/entityUtil"),o=function(e){this.initialize(e)};r.extend(o.prototype,{initialize:function(e){},isSatisfiedBy:function(e){var i=e.filter,t=i.expression.left.sourceType,r=i.expression.right.sourceType,o=t||r,s=e.sidebarCurrentResource,u=n.isField(s.type);return n.isConstantGroup(s.sourceType)?!n.isConstantGroup(o):u}}),t.exports=o});