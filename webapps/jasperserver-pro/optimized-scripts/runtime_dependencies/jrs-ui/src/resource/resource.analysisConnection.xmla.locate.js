/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","prototype","./resource.locate"],function(e,o,r){var t=e("prototype"),i=t.$,n=e("./resource.locate"),s={FRAME_ID:"frame",TYPE_ID:"type",messages:[],initialize:function(){var e=i(this.TYPE_ID);n.initialize({resourceInput:"resourceUri",browseButton:"browser_button",treeId:"OLAPTreeRepoLocation",providerId:"XMLATreeDataProvider",dialogTitle:s.messages["resource.AnalysisConnectionXmlaLocate.Title"],selectLeavesOnly:!0}),e.observe("change",function(){i("chooseType").click()})}};void 0===e&&document.observe("dom:loaded",function(){s.initialize()}),r.exports=s});