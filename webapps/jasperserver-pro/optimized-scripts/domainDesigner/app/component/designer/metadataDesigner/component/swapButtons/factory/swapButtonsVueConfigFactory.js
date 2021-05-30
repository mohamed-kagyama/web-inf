/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","text!../template/swapButtonsVueTemplate.htm","../../../../../../common/vue/computed/i18nComputed"],function(t,e,o){var u=t("underscore"),n=t("text!../template/swapButtonsVueTemplate.htm"),r=t("../../../../../../common/vue/computed/i18nComputed");o.exports={create:function(t){return{template:n,data:function(){return t.data},computed:r,methods:{onMoveToResultButtonClick:u.throttle(function(){t.metadataDesignerEventBus.trigger("moveToResult")},t.throttleTime),onMoveToSourceButtonClick:u.throttle(function(){t.metadataDesignerEventBus.trigger("moveToSource")},t.throttleTime)}}}}});