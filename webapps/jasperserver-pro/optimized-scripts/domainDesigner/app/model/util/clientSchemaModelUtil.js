/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../model/schema/util/schemaModelUtil","../../../model/schema/util/entityUtil","../../component/layout/sidebarView/util/artificialTreeResourceEntityUtil"],function(e,t,i){function o(e,t,i){var o={id:e,type:t};return s.isDerivedTableGroup(o)?Boolean(i.tables.find(function(e){return r.isDerivedTable(e)})):s.isConstantGroup(o)?Boolean(i.constantGroups.size()):Boolean(l.getResourceByIdAndType(e,t,i))}var n=e("underscore"),l=e("../../../model/schema/util/schemaModelUtil"),r=e("../../../model/schema/util/entityUtil"),s=e("../../component/layout/sidebarView/util/artificialTreeResourceEntityUtil");i.exports=n.extend({},l,{checkIfResourceExistsInSchemaByIdAndType:o})});