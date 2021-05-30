/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/schemaEntitiesEnum"],function(e,t,n){var a=e("../enum/schemaEntitiesEnum");n.exports=Object.freeze({name:a.TABLE_GROUP,collections:Object.freeze([{name:"children",entityName:"child"}]),properties:Object.freeze([{name:"tableId",toJSON:!1},{name:"parentId",toJSON:!1},{name:"dataSourceId",toJSON:!1},{name:"name",toJSON:!0}])})});