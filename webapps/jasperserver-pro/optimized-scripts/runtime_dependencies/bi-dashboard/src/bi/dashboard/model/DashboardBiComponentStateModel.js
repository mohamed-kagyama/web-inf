/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone"],function(e,n,a){var o=e("backbone");a.exports=o.Model.extend({defaults:{report:{chart:{},loadingOverlay:!0},_canUndo:!1,_canRedo:!1,_canvasReady:!1},initialize:function(){this.state=new o.Model}})});