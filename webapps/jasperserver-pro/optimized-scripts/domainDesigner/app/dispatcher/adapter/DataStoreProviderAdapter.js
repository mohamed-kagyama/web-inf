/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,o){var r=e("underscore"),n=function(e){this.dataStore=e.dataStore};r.extend(n.prototype,{getDataStore:function(){return this.dataStore.getCollections()}}),o.exports=n});