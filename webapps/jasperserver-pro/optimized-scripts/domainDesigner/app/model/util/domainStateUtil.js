/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../model/schema/util/schemaModelUtil"],function(e,t,r){function u(e,t){var r=t.viewState.getCurrentResource(e),u=r&&r.resourceId,o=r&&r.type,a=t.dataStore;return n.getResourceByIdAndType(u,o,a)}function o(e,t){var r=u(e,t),o=t.dataStore;return n.getDataSourceByChildResource(r,o)}function a(e,t){var r=o(e,t),u=t.viewState.getDataSource(r.getName());return u&&u.type}var n=(e("underscore"),e("../../../model/schema/util/schemaModelUtil"));r.exports={getCurrentResourceEntity:u,getCurrentDataSource:o,getCurrentDataSourceType:a}});