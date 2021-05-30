/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","../../resource/resource.analysisConnection.xmla.locate","underscore","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../util/utils.common"],function(e,s,r){var o=e("requirejs-domready"),n=e("../../resource/resource.analysisConnection.xmla.locate"),c=e("underscore"),i=e("runtime_dependencies/js-sdk/src/jrs.configs"),u=e("../../resource/resource.base"),a=e("../../util/utils.common"),t=a.isIPad;o(function(){c.extend(n.messages,i.locateConnectionSource.resourceOLAPLocate.messages),n.initialize(),t()&&u.initSwipeScroll()})});