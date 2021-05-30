/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../model/schema/mixin/allCollectionsMixin"],function(i,e,t){var n=i("underscore"),o=i("../../../model/schema/mixin/allCollectionsMixin"),l=function(i){this.initialize(i)};n.extend(l.prototype,{initialize:function(i){this.dataStore=i.dataStore,this.mixInAllCollections(this.dataStore)},isSatisfied:function(){return this.tables.size()>0}}),n.extend(l.prototype,o),t.exports=l});