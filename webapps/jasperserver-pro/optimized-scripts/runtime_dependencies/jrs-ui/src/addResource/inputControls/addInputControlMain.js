/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","underscore","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../resource/resource.inputControl","../../util/utils.common"],function(e,r,o){var s=e("requirejs-domready"),n=e("underscore"),t=e("runtime_dependencies/js-sdk/src/jrs.configs"),i=e("../../resource/resource.base"),u=e("../../resource/resource.inputControl"),c=e("../../util/utils.common"),d=c.isIPad;s(function(){var e=t.addInputControl.localContext.initOptions;n.extend(window.localContext,t.addInputControl.localContext),n.extend(i.messages,t.addInputControl.resource.messages),u.initialize(e),d()&&i.initSwipeScroll()})});