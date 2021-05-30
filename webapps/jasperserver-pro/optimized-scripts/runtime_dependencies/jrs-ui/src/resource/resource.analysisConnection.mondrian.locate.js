/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","prototype","./resource.locate"],function(e,i,t){var o=e("prototype"),n=o.$,r=e("./resource.locate"),s={FRAME_ID:"frame",TYPE_ID:"type",TYPE_SUBMIT_ID:"chooseType",messages:{},initialize:function(){this.typeSubmit=n(this.TYPE_SUBMIT_ID),r.initialize({resourceInput:"resourceUri",browseButton:"browser_button",treeId:"OLAPTreeRepoLocation",providerId:"MondrianTreeDataProvider",dialogTitle:s.messages["resource.AnalysisConnectionMmondrianLocate.Title"],selectLeavesOnly:!0}),this._initEventHandlers()},_initEventHandlers:function(){n(this.TYPE_ID).observe("change",function(){this.typeSubmit.click()}.bind(this))}};void 0===e&&document.observe("dom:loaded",function(){s.initialize()}),t.exports=s});