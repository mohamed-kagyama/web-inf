/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","underscore","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../resource/resource.inputControl.locate","../../util/utils.common"],function(e,r,s){var o=e("requirejs-domready"),i=e("underscore"),n=e("runtime_dependencies/js-sdk/src/jrs.configs"),u=e("../../resource/resource.base"),c=e("../../resource/resource.inputControl.locate"),t=e("../../util/utils.common"),d=t.isIPad;o(function(){i.extend(c.messages,n.addJasperReport.inputControl.messages),c.initialize(),d()&&u.initSwipeScroll()})});