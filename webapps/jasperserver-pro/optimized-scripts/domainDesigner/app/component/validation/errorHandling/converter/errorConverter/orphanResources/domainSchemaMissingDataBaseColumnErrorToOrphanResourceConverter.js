/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../../model/schema/enum/schemaEntitiesEnum","../../../enum/errorParametersKeysEnum","../../../util/extractPropertyByKeyUtil"],function(e,r,t){var a=(e("underscore"),e("../../../../../../../model/schema/enum/schemaEntitiesEnum")),m=e("../../../enum/errorParametersKeysEnum"),n=e("../../../util/extractPropertyByKeyUtil");t.exports={convert:function(e){var r=n.extract(e.parameters,m.DATA_SOURCE_ELEMENT_NAME).value,t=n.extract(e.parameters,m.SCHEMA_ELEMENT_NAME).value,E=n.extract(e.parameters,m.DB_TABLE_NAME).value,u=n.extract(e.parameters,m.DB_COLUMN_NAME).value;return[{name:r,type:a.DATA_SOURCE},{name:t,type:a.DATA_SOURCE_GROUP},{name:E,type:a.TABLE},{name:u,type:a.FIELD}]}}});