/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../model/schema/util/entityUtil"],function(e,t,i){function o(e,t){return r.isDataSource(e.type)&&(e.isEmptyDataSource=!Boolean(t.schema.dataSources.byId(e.resourceId).children.size())),e}var r=e("../../../../../../model/schema/util/entityUtil");i.exports=o});