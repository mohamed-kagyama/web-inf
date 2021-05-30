/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","../../resource/resource.analysisView","underscore","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../util/utils.common"],function(e,s,r){var i=e("requirejs-domready"),o=e("../../resource/resource.analysisView"),n=e("underscore"),c=e("runtime_dependencies/js-sdk/src/jrs.configs"),d=e("../../resource/resource.base"),u=e("../../util/utils.common"),t=u.isIPad;i(function(){var e=c.addOLAPView.localContext.initOptions;n.extend(window.localContext,c.addOLAPView.localContext),n.extend(d.messages,c.addOLAPView.resource.messages),o.initialize(e),t()&&d.initSwipeScroll()})});