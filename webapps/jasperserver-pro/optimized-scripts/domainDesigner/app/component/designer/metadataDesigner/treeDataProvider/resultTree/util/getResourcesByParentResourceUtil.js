/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../../model/schema/util/schemaModelUtil","../../../../../../../model/schema/util/entityUtil"],function(e,t,i){function l(e){var t,i,l=e.parentId,o=e.parentType,s=e.isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute,c=e.collections,a=r.getResourceByIdAndType(l,o,c);return s?(i=a.getChildren().first(),t=i.getChildren()):t=a.getChildren(),t.chain().filter(function(e){return!n.isDerivedTable(e)})}var r=e("../../../../../../../model/schema/util/schemaModelUtil"),n=e("../../../../../../../model/schema/util/entityUtil");i.exports={getResources:l}});