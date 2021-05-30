/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","../../resource/resource.add.files","underscore","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../util/utils.common"],function(e,r,s){var o=e("requirejs-domready"),i=e("../../resource/resource.add.files"),c=e("underscore"),d=e("runtime_dependencies/js-sdk/src/jrs.configs"),n=e("../../resource/resource.base"),u=e("../../util/utils.common"),t=u.isIPad;o(function(){var e=d.addFileResource.localContext.initOptions;c.extend(window.localContext,d.addFileResource.localContext),c.extend(n.messages,d.addFileResource.resource.messages),i.initialize(e),t()&&n.initSwipeScroll()})});