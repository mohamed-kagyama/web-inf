/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../util/serverSchemaResourceTypeUtil","../../enum/dataSourceTypeEnum","../../enum/dataSourceLevelEnum"],function(e,r,u){var t=e("underscore"),a=e("../../util/serverSchemaResourceTypeUtil"),n=e("../../enum/dataSourceTypeEnum"),o=e("../../enum/dataSourceLevelEnum");u.exports={getDataSourceType:function(e){var r,u=t.first(e),c=a.getMetadataResourceType(u);return c===o.DATA_SOURCE_GROUP?r=n.DATA_SOURCE_WITH_SCHEMAS:c===o.TABLE&&(r=n.DATA_SOURCE_WITHOUT_SCHEMAS),r}}});