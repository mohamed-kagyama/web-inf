/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/schemaEntitiesEnum"],function(e,n,t){var m=e("../enum/schemaEntitiesEnum");t.exports=Object.freeze({name:m.CALC_FIELD,collections:Object.freeze([{name:"fieldReferences"}]),properties:Object.freeze([{name:"sourceId",toJSON:!1},{name:"sourceType",toJSON:!1},{name:"type",toJSON:!0},{name:"name",toJSON:!0},{name:"expression",toJSON:!0}])})});