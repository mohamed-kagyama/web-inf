/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./getHCConfigPropertyKey"],function(e,r,o){var i=e("underscore"),t=e("./getHCConfigPropertyKey"),n=function(e){var r="1";i.isUndefined(e.gaugesDecimalPlaces)||(r=e.gaugesDecimalPlaces);var o=t(e,"plotOptions.solidgauge.tooltip.valueDecimals");return o&&(r=o),"string"==typeof r&&""!==r&&(r=parseInt(r),i.isNaN(r)&&(r=1)),r};o.exports=n});