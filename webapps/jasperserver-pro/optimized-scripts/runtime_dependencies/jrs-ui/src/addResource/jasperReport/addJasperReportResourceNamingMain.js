/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","underscore","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../resource/resource.reportResourceNaming","../../util/utils.common"],function(e,r,s){var o=e("requirejs-domready"),i=e("underscore"),n=e("runtime_dependencies/js-sdk/src/jrs.configs"),t=e("../../resource/resource.base"),c=e("../../resource/resource.reportResourceNaming"),d=e("../../util/utils.common"),u=d.isIPad;o(function(){var e;void 0!==n.addJasperReport.localContext&&(e=n.addJasperReport.localContext.initOptions,i.extend(window.localContext,n.addJasperReport.localContext)),i.extend(t.messages,n.addJasperReport.resource.messages),c.initialize(e),u()&&t.initSwipeScroll()})});