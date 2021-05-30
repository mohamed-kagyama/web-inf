/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../../model/schema/enum/schemaEntitiesEnum","../../../enum/errorParametersKeysEnum","../../../util/extractPropertyByKeyUtil"],function(e,r,t){var n=e("underscore"),m=e("../../../../../../../model/schema/enum/schemaEntitiesEnum"),a=e("../../../enum/errorParametersKeysEnum"),u=e("../../../util/extractPropertyByKeyUtil");t.exports={convert:function(e){var r=u.extract(e.parameters,a.RESOURCE_PATH);return r=n.last(r.value.split(".")),[{name:r,type:m.DATA_SOURCE_GROUP}]}}});