/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../../model/schema/enum/schemaEntitiesEnum","../../../enum/errorParametersKeysEnum","../../../util/extractPropertyByKeyUtil"],function(e,r,t){var n=(e("underscore"),e("../../../../../../../model/schema/enum/schemaEntitiesEnum")),m=e("../../../enum/errorParametersKeysEnum"),u=e("../../../util/extractPropertyByKeyUtil");t.exports={convert:function(e){return[{name:u.extract(e.parameters,m.DOMAIN_SCHEMA_NAME).value,type:n.DATA_SOURCE_GROUP}]}}});