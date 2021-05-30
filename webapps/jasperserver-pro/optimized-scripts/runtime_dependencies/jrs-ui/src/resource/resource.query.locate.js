/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","prototype","./resource.locate"],function(e,o,r){var t=e("prototype"),i=t.$,n=e("./resource.locate"),u={messages:[],initialize:function(){n.initialize({resourceInput:"resourceUri",browseButton:"browser_button",newResourceLink:"newQueryLink",treeId:"queryTreeRepoLocation",providerId:"queryTreeDataProvider",dialogTitle:u.messages["resource.QueryLocate.Title"],selectLeavesOnly:!0});var e=i("newQueryLink");e&&e.observe("click",function(){i("LOCAL").checked&&i("next").click()})},jumpTo:function(e){return i("jumpToPage").setValue(e),i("jumpButton").click(),!1}};void 0===e&&document.observe("dom:loaded",function(){u.initialize()}),r.exports=u});