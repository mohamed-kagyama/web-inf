/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BasePresentationItem","../enum/schemaEntitiesEnum"],function(e,t,n){var r=e("./BasePresentationItem"),i=e("../enum/schemaEntitiesEnum");n.exports=Object.freeze({name:i.DATA_ISLAND,collections:Object.freeze([{name:"children",entityName:"child"}]),properties:Object.freeze(r.properties.concat([{name:"sourceId",toJSON:!0},{name:"sourceType",toJSON:!0}]))})});