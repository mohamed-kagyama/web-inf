/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./getHCConfigPropertyKey"],function(e,r,a){var n=e("underscore"),o=e("./getHCConfigPropertyKey"),t=function(e){var r=100;n.isUndefined(e.gaugesMaxValue)||(r=e.gaugesMaxValue);var a=o(e,"yAxis.max");return a&&(r=a),"string"==typeof r&&(r=parseFloat(r),n.isNaN(r)&&(r=100)),r};a.exports=t});