/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../util/utils.common","../util/touch.controller","jquery"],function(e,n,o){var t=e("../util/utils.common"),d=t.isIPad,i=e("../util/touch.controller");e("jquery")(function(){d()&&(document.body.addEventListener("touchstart",function(e){window.calendar&&window.calendar.hide&&!window.calendar.hidden&&window.calendar.hide(),void 0!==i&&(i.element_scrolled=!1)},!1),document.body.addEventListener("touchmove",function(e){e.preventDefault()},!1))})});