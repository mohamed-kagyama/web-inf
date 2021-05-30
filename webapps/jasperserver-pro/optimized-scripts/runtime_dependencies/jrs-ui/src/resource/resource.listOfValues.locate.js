/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./resource.locate"],function(e,o,i){var r=e("./resource.locate"),t={messages:[],initialize:function(){r.initialize({resourceInput:"resourceUri",browseButton:"browser_button",treeId:"listOfValuesTreeRepoLocation",providerId:"listOfValuesTreeDataProvider",dialogTitle:t.messages["resource.ListOfValuesLocate.Title"],selectLeavesOnly:!0})}};void 0===e&&document.observe("dom:loaded",function(){t.initialize()}),i.exports=t});