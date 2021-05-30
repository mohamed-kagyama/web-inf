/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","requirejs-domready","underscore","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../resource/resource.query","jquery","../../util/utils.common"],function(e,r,o){var n=e("requirejs-domready"),u=e("underscore"),s=e("runtime_dependencies/js-sdk/src/jrs.configs"),c=e("../../resource/resource.base"),t=e("../../resource/resource.query"),i=e("jquery"),d=e("../../util/utils.common"),a=d.isIPad;n(function(){var e=s.addQuery.localContext.initOptions;u.extend(window.localContext,s.addQuery.localContext),u.extend(c.messages,s.addQuery.resource.messages),t.initialize(e),s.addQuery.buttonFlowControls&&(i("#steps1_2").on("click",function(){return t.jumpTo("reportNaming")}),i("#step3").on("click",function(){return t.jumpTo("resources")}),i("#step4").on("click",function(){return t.jumpTo("dataSource")}),i("#step5").on("click",function(){return t.jumpTo("query")}),i("#step6").on("click",function(){return t.jumpTo("customization")})),a()&&c.initSwipeScroll()})});