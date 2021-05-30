/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","../../resource/resource.analysisConnection","underscore","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../util/utils.common"],function(e,n,o){var s=e("requirejs-domready"),r=e("../../resource/resource.analysisConnection"),i=e("underscore"),c=e("runtime_dependencies/js-sdk/src/jrs.configs"),t=e("../../resource/resource.base"),u=e("../../util/utils.common"),d=u.isIPad;s(function(){var e=c.connectionType.localContext.initOptions;i.extend(window.localContext,c.connectionType.localContext),i.extend(t.messages,c.connectionType.resource.messages),r.initialize(e),d()&&t.initSwipeScroll()})});