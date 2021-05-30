/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/schema/util/entityUtil","../../../../../model/schema/enum/schemaEntitiesEnum"],function(e,t,n){function a(e,t){var n=e.toJSON();return r.extend({name:n.name,label:n.name,sourceId:t.constantGroupId,sourceType:c.CONSTANT_GROUP,fieldId:n.id,fieldType:s.getEntityName(e),entityType:c.PRESENTATION_FIELD})}function o(e,t){var n=t.constantGroupId,a=t.constantDataIslandName,o=t.constantDataIslandLabel;return r.extend({name:a,label:o,sourceType:c.CONSTANT_GROUP,sourceId:n},t.properties)}var r=e("underscore"),s=e("../../../../../model/schema/util/entityUtil"),c=e("../../../../../model/schema/enum/schemaEntitiesEnum");n.exports={convertCalcField:a,convertConstantGroup:o}});