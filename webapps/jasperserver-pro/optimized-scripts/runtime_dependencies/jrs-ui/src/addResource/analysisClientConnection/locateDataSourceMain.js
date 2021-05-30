/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","../../resource/resource.analysisConnection.dataSource.locate","underscore","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../util/utils.common"],function(e,o,r){var s=e("requirejs-domready"),c=e("../../resource/resource.analysisConnection.dataSource.locate"),n=e("underscore"),i=e("runtime_dependencies/js-sdk/src/jrs.configs"),t=e("../../resource/resource.base"),a=e("../../util/utils.common"),u=a.isIPad;s(function(){var e=i.locateDataSource.localContext.initOptions;n.extend(window.localContext,i.locateDataSource.localContext),c.initialize(e),u()&&t.initSwipeScroll()})});