/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BaseJoin","../enum/schemaEntitiesEnum"],function(e,n,i){var s=e("./BaseJoin"),t=e("../enum/schemaEntitiesEnum");i.exports=Object.freeze({name:t.JOIN,collections:Object.freeze([{name:"joinExpressions"}]),properties:Object.freeze(s.properties.concat([]))})});