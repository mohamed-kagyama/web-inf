/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","underscore","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../util/utils.common","../../resource/resource.dataType.locate"],function(e,r,s){var o=e("requirejs-domready"),c=e("underscore"),i=e("runtime_dependencies/js-sdk/src/jrs.configs"),u=e("../../resource/resource.base"),n=e("../../util/utils.common"),a=n.isIPad,d=e("../../resource/resource.dataType.locate");o(function(){c.extend(u.messages,i.resourceDataTypeLocate.messages),d.initialize(),a()&&u.initSwipeScroll()})});