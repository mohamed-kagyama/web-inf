/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","underscore","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../resource/resource.report","../../util/utils.common"],function(e,r,s){var o=e("requirejs-domready"),i=e("underscore"),t=e("runtime_dependencies/js-sdk/src/jrs.configs"),n=e("../../resource/resource.base"),d=e("../../resource/resource.report"),c=e("../../util/utils.common"),u=c.isIPad;o(function(){var e;void 0!==t.addJasperReport.localContext&&(e=t.addJasperReport.localContext.initOptions,i.extend(window.localContext,t.addJasperReport.localContext)),i.extend(n.messages,t.addJasperReport.resource.messages),d.initialize(e),u()&&n.initSwipeScroll()})});