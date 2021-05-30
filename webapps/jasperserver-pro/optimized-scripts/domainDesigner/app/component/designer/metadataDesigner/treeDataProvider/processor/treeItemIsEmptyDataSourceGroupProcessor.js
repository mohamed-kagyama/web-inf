/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../model/schema/util/entityUtil"],function(e,t,o){function i(e,t){return r.isDataSourceGroup(e.type)&&(e.isEmptyDataSourceGroup=!Boolean(t.dataSourceGroup.children.size())),e}var r=e("../../../../../../model/schema/util/entityUtil");o.exports=i});