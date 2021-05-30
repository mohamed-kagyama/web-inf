/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./BaseJoin","../enum/schemaEntitiesEnum"],function(e,n,r){var s=(e("underscore"),e("./BaseJoin")),o=e("../enum/schemaEntitiesEnum");r.exports=Object.freeze({name:o.COMPLEX_JOIN,collections:Object.freeze([{name:"fieldReferences"}]),properties:Object.freeze(s.properties.concat([{name:"expression",toJSON:!0}]))})});