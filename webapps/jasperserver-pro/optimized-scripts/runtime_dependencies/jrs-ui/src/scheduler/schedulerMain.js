/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","./view/SchedulerApp","requirejs-domready"],function(e,r,d){var u=e("jquery"),i=e("./view/SchedulerApp");e("requirejs-domready")(function(){var e=new i;u("#display").append(e.$el),u("body").addClass("jr")})});