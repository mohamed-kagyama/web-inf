/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","underscore","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../util/utils.common","../../resource/resource.listOfValues.locate"],function(e,s,r){var i=e("requirejs-domready"),o=e("underscore"),u=e("runtime_dependencies/js-sdk/src/jrs.configs"),c=e("../../resource/resource.base"),n=e("../../util/utils.common"),t=n.isIPad,d=e("../../resource/resource.listOfValues.locate");i(function(){o.extend(c.messages,u.resourceListOfValuesLocate.messages),d.initialize(),t()&&c.initSwipeScroll()})});