/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","prototype","./resource.locate","../core/core.events.bis"],function(e,t,o){var i=e("prototype"),r=i.$$,n=i.Form,s=i.$,u=e("./resource.locate"),a=e("../core/core.events.bis"),c={messages:[],initialize:function(){this.form=r("input[name=_flowExecutionKey]")[0].up("form"),this.defineRadio=s("LOCAL"),this.resourceUriInput=s("resourceUri");try{this.resourcePicker(),this.updateButtonsState()}finally{this.initEvents()}},resourcePicker:function(){u.initialize({resourceInput:"resourceUri",browseButton:"browser_button",treeId:"inputControlTreeRepoLocation",providerId:"inputControlResourceTreeDataProvider",dialogTitle:c.messages["InputControlLocate.Title"],selectLeavesOnly:!0})},initEvents:function(){this.form&&new n.Observer(this.form,.3,function(){this.updateButtonsState()}.bind(this))},updateButtonsState:function(){this.resourceUriInput.getValue().blank()&&"LOCAL"!==this.defineRadio.getValue()?a.disable("next"):a.enable("next")}};void 0===e&&document.observe("dom:loaded",function(){c.initialize(window.localContext.initOptions)}),o.exports=c});