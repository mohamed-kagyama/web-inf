/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../model/enum/canvasViewDesignersEnum","../../../../../model/schema/util/entityUtil","../../../../model/util/domainStateUtil","../../../../util/uriUtil"],function(e,t,r){function u(e,t){var r=t.getCurrentResource(D),u=r&&r.id;return t.getSearchKeyword(D)[e][u]}function n(e){return o(f.getCurrentResourceEntity(D,e))}function o(e){var t=null;if(S.isUndefined(e))return t;if(m.isDataSourceGroup(e))t=e.getSourceName()||e.getName();else{if(!m.isDataSource(e))throw new Error("Only resources of type DataSource and DataSourceGroup are supported");t=C.getRootUri()}return t}function i(e){var t=e.viewState.getCurrentResource(D);return e.viewState.getCurrentSelection(D).resultTree[t.resourceId]||[]}function c(e){return e.viewState.getCurrentSelection(D)}function a(e){return e.viewState.getCurrentResource(D)}function s(e){return f.getCurrentResourceEntity(D,e)}function l(e){return f.getCurrentDataSource(D,e)}function g(e){return f.getCurrentDataSourceType(D,e)}var S=e("underscore"),d=e("../../../../model/enum/canvasViewDesignersEnum"),m=e("../../../../../model/schema/util/entityUtil"),f=e("../../../../model/util/domainStateUtil"),C=e("../../../../util/uriUtil"),D=d.METADATA_DESIGNER;r.exports={getTreeSearchKeyword:u,getCurrentResourceUri:n,getResultTreeSelection:i,getCurrentSelection:c,getCurrentResource:a,getCurrentResourceEntity:s,getCurrentDataSource:l,getCurrentDataSourceType:g}});