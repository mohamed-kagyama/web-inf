/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./resource.locate"],function(e,o,r){var t=e("./resource.locate"),i={messages:[],initialize:function(){t.initialize({resourceInput:"resourceUri",browseButton:"browser_button",treeId:"dataTypeTreeRepoLocation",providerId:"dataTypeTreeDataProvider",dialogTitle:i.messages["resource.DataTypeLocate.Title"],selectLeavesOnly:!0})}};void 0===e&&document.observe("dom:loaded",function(){i.initialize()}),r.exports=i});