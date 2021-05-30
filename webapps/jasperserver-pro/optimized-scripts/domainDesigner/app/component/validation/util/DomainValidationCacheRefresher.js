/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,i){var t=e("underscore"),s=function(e){this.initialize(e)};t.extend(s.prototype,{initialize:function(e){this.dataStore=e.dataStore,this.restServicesCompositeCacheCleaner=e.restServicesCompositeCacheCleaner,this.parametrizedSchemaResolvingService=e.parametrizedSchemaResolvingService},refresh:function(){return this.restServicesCompositeCacheCleaner.clean(),this.parametrizedSchemaResolvingService.resolve(this.dataStore.getCollections(),{refresh:!0})}}),i.exports=s});