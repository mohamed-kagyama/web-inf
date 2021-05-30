/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/schemaEntitiesEnum"],function(e,t,n){var i=e("../enum/schemaEntitiesEnum");n.exports=Object.freeze({name:i.JOIN_EXPRESSION,properties:Object.freeze([{name:"joinId",toJSON:!1},{name:"rightJoinAliasId",toJSON:!0},{name:"leftJoinAliasId",toJSON:!0},{name:"leftFieldId",toJSON:!0},{name:"rightFieldId",toJSON:!0},{name:"operator",toJSON:!0}])})});