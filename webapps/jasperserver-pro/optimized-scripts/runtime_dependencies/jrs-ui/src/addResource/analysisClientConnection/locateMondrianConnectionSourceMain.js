/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","../../resource/resource.analysisConnection.mondrian.locate","underscore","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../util/utils.common"],function(e,o,n){var r=e("requirejs-domready"),s=e("../../resource/resource.analysisConnection.mondrian.locate"),c=e("underscore"),i=e("runtime_dependencies/js-sdk/src/jrs.configs"),t=e("../../resource/resource.base"),u=e("../../util/utils.common"),a=u.isIPad;r(function(){c.extend(window.localContext,i.locateConnectionSource.localContext),c.extend(s.messages,i.locateConnectionSource.resourceMondrianLocate.messages),s.initialize(),a()&&t.initSwipeScroll()})});