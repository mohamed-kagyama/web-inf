/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/schemaEntitiesEnum"],function(e,n,i){var a=e("../enum/schemaEntitiesEnum");i.exports=Object.freeze({name:a.JOIN_TREE,collections:Object.freeze([{name:"joins"},{name:"joinAliases",entityName:"joinAlias"},{name:"calcFields"},{name:"filters"}]),properties:Object.freeze([{name:"name",toJSON:!0},{name:"includeAllDataIslandJoins",toJSON:!0},{name:"suppressCircularJoins",toJSON:!0}])})});