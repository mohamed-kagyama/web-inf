/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../model/schema/util/entityUtil"],function(e,i,t){var n=e("underscore"),c=e("../../../../../../model/schema/util/entityUtil"),o=function(e){this.initialize(e)};n.extend(o.prototype,{initialize:function(e){n.bindAll(this,"process"),this.domainSchemaSpecification=e.domainSchemaSpecification},process:function(e,i){var t;return c.isTableReference(e.type)?t=e.resourceId:c.isJoinAlias(e.type)&&(t=i.tableReference.getId()),t&&(e.canDeleteTableReference=this.domainSchemaSpecification.canRemoveTableReference(t)),e}}),t.exports=o});