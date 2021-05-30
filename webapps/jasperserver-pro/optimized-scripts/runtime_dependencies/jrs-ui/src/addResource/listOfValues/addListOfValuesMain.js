/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","underscore","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../resource/resource.listofvalues","../../util/utils.common"],function(e,s,r){var o=e("requirejs-domready"),i=e("underscore"),u=e("runtime_dependencies/js-sdk/src/jrs.configs"),n=e("../../resource/resource.base"),t=e("../../resource/resource.listofvalues"),c=e("../../util/utils.common"),d=c.isIPad;o(function(){var e=u.addListOfValues.localContext.initOptions;i.extend(window.localContext,u.addListOfValues.localContext),i.extend(n.messages,u.addListOfValues.resource.messages),t.initialize(e),d()&&n.initSwipeScroll()})});