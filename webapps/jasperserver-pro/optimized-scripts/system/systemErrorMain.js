/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define("runtime_dependencies/jrs-ui/src/system/systemErrorMain",["require","exports","module","../util/utils.common","requirejs-domready","jquery","../core/core.layout"],function(e,r,s){var i=e("../util/utils.common"),n=i.centerElement,o=e("requirejs-domready"),t=e("jquery"),u=e("../core/core.layout");o(function(){var e=t("#nothingToDisplay");e.removeClass(u.HIDDEN_CLASS),n(e,{horz:!0,vert:!0})})}),define("system/systemErrorMain",["require","exports","module","runtime_dependencies/jrs-ui/src/system/systemErrorMain"],function(e,r,s){e("runtime_dependencies/jrs-ui/src/system/systemErrorMain")});