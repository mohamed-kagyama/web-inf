/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../model/util/resourcePropertiesUtil"],function(e,r,o){function i(e,r){e.dataSourceUri=r,e.domainResource&&(e.domainResource.dataSource.dataSourceReference.uri=r)}function a(e,r){var o=n.getEmbeddedResourceUri(r.dataSource);e.dataSourceUri=o,e.domainResource=r}function u(e){return e.dataSourceUri&&!e.domainResource&&!e.domainUri}function c(e){var r=t.isUndefined(e.schemaPairs),o=t.isNull(e.schemaPairs);return!(r||o)}var t=e("underscore"),n=e("../../../../model/util/resourcePropertiesUtil");o.exports={setDataSource:i,setDomainResource:a,shouldInitializeNewDomainByDataSourceUri:u,isSchemasMapped:c}});