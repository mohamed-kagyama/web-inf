/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./designer","runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator"],function(e,n,o){var t=e("./designer"),i=e("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator");t.showDynamicMenu=function(e,n,o,t){var d=window.selObjects.length;if(d>0){var l=window.selObjects[d-1];l&&l.menuLevel&&(l.menuLevel=n)}i.showDynamicMenu(n,e,null,o,window.localContext.state.actionmodel,t)},t.contextMenuHandler=function(e){var n=(e.memo.node,e.memo.targetEvent);window.localContext.contextMenuHandler&&window.localContext.contextMenuHandler(n)},o.exports=t});