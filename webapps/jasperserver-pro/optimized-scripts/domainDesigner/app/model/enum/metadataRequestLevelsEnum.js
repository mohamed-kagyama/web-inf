/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./dataSourceTypeEnum"],function(e,a,r){var u=e("./dataSourceTypeEnum"),T={};T[u.DATA_SOURCE_WITH_SCHEMAS]=["schemaName","datasourceTableName"],T[u.DATA_SOURCE_WITHOUT_SCHEMAS]=["datasourceTableName"],r.exports=T});