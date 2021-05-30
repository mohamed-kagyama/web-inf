/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../util/utils.common","requirejs-domready","jquery","../core/core.layout"],function(e,r,o){var u=e("../util/utils.common"),t=u.centerElement,i=e("requirejs-domready"),n=e("jquery"),l=e("../core/core.layout");i(function(){var e=n("#nothingToDisplay");e.removeClass(l.HIDDEN_CLASS),t(e,{horz:!0,vert:!0})})});