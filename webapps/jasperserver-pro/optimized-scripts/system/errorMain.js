/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define("runtime_dependencies/jrs-ui/src/system/errorMain",["require","exports","module","jquery"],function(e,r,n){var i=e("jquery");i("#closeErrorPage").on("click",function(){i(document).trigger("errorPage:close",{})})}),define("system/errorMain",["require","exports","module","runtime_dependencies/jrs-ui/src/system/errorMain"],function(e,r,n){e("runtime_dependencies/jrs-ui/src/system/errorMain")});