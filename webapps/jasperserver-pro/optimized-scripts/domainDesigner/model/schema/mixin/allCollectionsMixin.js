/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/entityTypeToSchemaCollectionMap"],function(e,n,o){var i=e("underscore"),t=e("../enum/entityTypeToSchemaCollectionMap"),c=i.chain(t).values().unique().value();o.exports={mixInAllCollections:function(e){c.forEach(function(n){this[n]=e.getCollection(n)},this)}}});