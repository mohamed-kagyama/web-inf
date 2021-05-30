/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BasePresentationItem","../enum/schemaEntitiesEnum"],function(e,t,n){var a=e("./BasePresentationItem"),r=e("../enum/schemaEntitiesEnum");n.exports=Object.freeze({name:r.PRESENTATION_SET,collections:Object.freeze([{name:"children",entityName:"child"}]),properties:Object.freeze(a.properties.concat([{name:"dataIslandId",toJSON:!1},{name:"parentId",toJSON:!1}]))})});