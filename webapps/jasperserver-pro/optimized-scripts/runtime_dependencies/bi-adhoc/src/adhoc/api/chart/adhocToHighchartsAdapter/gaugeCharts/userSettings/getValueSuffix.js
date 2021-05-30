/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./getHCConfigPropertyKey"],function(e,r,o){var i=e("underscore"),u=e("./getHCConfigPropertyKey"),n=function(e){var r="";i.isUndefined(e.gaugesSuffixLabel)||(r=e.gaugesSuffixLabel);var o=u(e,"plotOptions.solidgauge.tooltip.valueSuffix");return o&&(r=o),r};o.exports=n});