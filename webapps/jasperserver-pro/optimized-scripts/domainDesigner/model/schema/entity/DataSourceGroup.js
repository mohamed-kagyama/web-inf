/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/schemaEntitiesEnum"],function(e,n,t){var m=e("../enum/schemaEntitiesEnum");t.exports=Object.freeze({name:m.DATA_SOURCE_GROUP,collections:Object.freeze([{name:"children",entityName:"child"}]),properties:Object.freeze([{name:"parentId",toJSON:!1},{name:"dataSourceId",toJSON:!1},{name:"sourceName",toJSON:!0},{name:"name",toJSON:!0}])})});