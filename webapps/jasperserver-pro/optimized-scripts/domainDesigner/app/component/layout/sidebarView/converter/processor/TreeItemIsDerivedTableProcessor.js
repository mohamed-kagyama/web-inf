/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../model/schema/util/entityUtil"],function(e,i,t){var r=e("underscore"),n=e("../../../../../../model/schema/util/entityUtil"),a=function(e){this.initialize(e)};r.extend(a.prototype,{initialize:function(e){r.bindAll(this,"process"),this.domainSchemaService=e.domainSchemaService},process:function(e,i){var t;return t=n.isDerivedTable(e.type)||n.isTableReference(e.type)||n.isJoinAlias(e.type),t&&n.isDerivedTable(i.table)&&(e.isDerivedTable=!0,e.derivedTableId=i.table.id,e.derivedTableParentId=i.table.parentId),e}}),t.exports=a});