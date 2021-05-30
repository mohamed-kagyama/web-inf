/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BasePresentationItem","../enum/schemaEntitiesEnum"],function(e,t,n){var a=e("./BasePresentationItem"),o=e("../enum/schemaEntitiesEnum");n.exports=Object.freeze({name:o.PRESENTATION_FIELD,properties:Object.freeze(a.properties.concat([{name:"dataIslandId",toJSON:!1},{name:"parentId",toJSON:!1},{name:"sourceId",toJSON:!0},{name:"sourceType",toJSON:!0},{name:"fieldId",toJSON:!0},{name:"fieldType",toJSON:!0},{name:"mask",toJSON:!0},{name:"aggregation",toJSON:!0},{name:"kind",toJSON:!0}]))})});