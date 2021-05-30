/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./getHCConfigPropertyKey"],function(e,r,n){var i=e("underscore"),o=e("./getHCConfigPropertyKey"),t=function(e){var r=0;i.isUndefined(e.gaugesMinValue)||(r=e.gaugesMinValue);var n=o(e,"yAxis.min");return n&&(r=n),"string"==typeof r&&(r=parseFloat(r),i.isNaN(r)&&(r=0)),r};n.exports=t});