/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../model/schema/util/entityUtil"],function(e,i,t){var n=e("underscore"),s=e("../../../../../../model/schema/util/entityUtil"),o=function(e){this.initialize(e)};n.extend(o.prototype,{initialize:function(e){n.bindAll(this,"isSatisfiedBy"),this.nestedTreeModel=e.nestedTreeModel},isSatisfiedBy:function(e){e=this.nestedTreeModel.getNode(e.id);var i=e.type,t=e.resource.sourceType,n=s.isConstantGroup(i),o=s.isCalcField(i)&&s.isConstantGroup(t);return n||o}}),t.exports=o});