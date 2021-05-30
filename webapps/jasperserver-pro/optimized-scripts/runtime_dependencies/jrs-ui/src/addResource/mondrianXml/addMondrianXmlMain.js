/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","underscore","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../resource/resource.add.mondrianxmla","../../util/utils.common"],function(e,r,s){var n=e("requirejs-domready"),o=e("underscore"),d=e("runtime_dependencies/js-sdk/src/jrs.configs"),i=e("../../resource/resource.base"),a=e("../../resource/resource.add.mondrianxmla"),c=e("../../util/utils.common"),u=c.isIPad;n(function(){var e=d.addMondrianXML.localContext.initOptions;o.extend(window.localContext,d.addMondrianXML.localContext),o.extend(i.messages,d.addMondrianXML.resource.messages),a.initialize(e),u()&&i.initSwipeScroll()})});