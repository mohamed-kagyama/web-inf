/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./Table","../enum/schemaEntitiesEnum"],function(e,t,n){var c=e("./Table"),o=e("../enum/schemaEntitiesEnum");n.exports=Object.freeze({name:o.DERIVED_TABLE,collections:Object.freeze(c.collections.concat([])),properties:Object.freeze(c.properties.concat([{name:"query",toJSON:!0}]))})});