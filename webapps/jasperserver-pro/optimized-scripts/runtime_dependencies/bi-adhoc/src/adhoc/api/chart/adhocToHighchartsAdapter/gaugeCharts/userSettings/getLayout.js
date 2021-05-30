/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./getHCConfigPropertyKey"],function(e,r,t){var o=e("underscore"),n=e("./getHCConfigPropertyKey"),u=function(e){var r="bestFit";o.isUndefined(e.gaugesLayout)||(r=e.gaugesLayout);var t=n(e,"plotOptions.item.layout");return t&&(r=t),r};t.exports=u});