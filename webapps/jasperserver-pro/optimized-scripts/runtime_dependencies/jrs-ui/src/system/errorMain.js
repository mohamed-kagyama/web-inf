/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery"],function(e,r,o){var c=e("jquery");c("#closeErrorPage").on("click",function(){c(document).trigger("errorPage:close",{})})});