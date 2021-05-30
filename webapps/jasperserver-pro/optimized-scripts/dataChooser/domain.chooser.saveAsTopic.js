/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","prototype","underscore","jquery","./domain.chooser","./domain.components","runtime_dependencies/jrs-ui/src/components/components.dialogs","runtime_dependencies/jrs-ui/src/core/core.events.bis","runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils","runtime_dependencies/jrs-ui/src/util/utils.common"],function(e,t,i){var s=e("prototype"),a=s.$,n=s.$H,o=s.$$,r=s.$break,u=s.$F,c=e("underscore"),l=e("jquery"),d=e("./domain.chooser"),m=e("./domain.components"),h=e("runtime_dependencies/jrs-ui/src/components/components.dialogs"),p=e("runtime_dependencies/jrs-ui/src/core/core.events.bis"),T=e("runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils"),g=e("runtime_dependencies/jrs-ui/src/util/utils.common"),I=g.ValidationModule;d.saveAsTopic={RESOURCE_DOESNT_EXISTS_RESPONSE:"resource doesnt exist",RESOURCE_ALREADY_EXISTS_RESPONSE:"resource already exists",RESOURCE_OF_OTHER_TYPE_EXISTS_RESPONSE:"resource of other type already exists",ID_TOPIC_NAME:"topicName",ID_TOPIC_LOCATION:"topicLocation",ID_TOPIC_DESCRIPTION:"topicDesc",ID_DATA_LIFETIME:"dataStrategy_dataLifetimeMinutes",ID_STAGED:"dataStrategy_staged",ID_MAX_ROWS:"dataStrategy_maxRows",ID_HIDDEN_TOPIC_NAME:"slTopicLabel",ID_HIDDEN_TOPIC_LOCATION:"slTopicLocation",ID_HIDDEN_TOPIC_DESCRIPTION:"slTopicDesc",ID_SAVE_AS_TOPIC_CONFIRM:"standardConfirm",SAVE_TOPIC_BUTTONS:["#goToDesigner"],ID_ENABLE_STAGING:"#dataStrategy_staged",ID_STAGING_QUERY_TIMEOUT:"#dataStrategy_dataLifetimeMinutes",ID_SAVE_AS_TOPIC_INPUTS:"#saveAsTopicInputs",EDIT_MODE:"editMode",CREATE_MODE:"createMode",ID_MIN_MAX_STAGING_QUERY_TIMEOUT_CHANGED:"#minMaxTimeNote",CLASS_LIFETIME_INFO:".lifeTimeInfo",idToAttrMap:{dataStrategy_dataLifetimeMinutes:"stagingQueryTimeOut",topicDesc:"description",topicName:"name",topicLocation:"location"},defaultStagingTimeout:{min:10,max:10080},minutesIn:{day:1440,hour:60},fillForm:function(){a("slTopicLabel").writeAttribute("value",this.saveAsTopicModel.get("name")),a("slTopicLocation").writeAttribute("value",this.saveAsTopicModel.get("location")),a("slTopicDesc").writeAttribute("value",this.saveAsTopicModel.get("description")),"true"===this.params.stagingEnabled&&(a("slDataStrategy_staged").writeAttribute("value",this.saveAsTopicModel.get("stagingEnabled").toString()),a("slDataStrategy_dataLifetimeMinutes").writeAttribute("value",this.saveAsTopicModel.get("stagingQueryTimeOut")))},getFlowControlsClickEventHandler:function(){return this._flowControlsClickEventHandlerWrapper.bind(this)},init:function(e){var t=this;this.params=e,this.organizationId=e.organizationId,this.storedTopicLocationPath=e.folderURI,this.ORGANIZATIONS_FOLDER_URI=e.organizationsFolderUri,this.ORGANIZATION_MATCHER="^#{org}(/[^/]+#{org})*$".interpolate({org:d.saveAsTopic.ORGANIZATIONS_FOLDER_URI});var i=e.maxTopicDescription,s=e.maxTopicName;this.minStagingQueryTimeOut=e.minStagingTopicMinutes||this.defaultStagingTimeout.min,this.maxStagingQueryTimeOut=e.maxStagingTopicMinutes||this.defaultStagingTimeout.max,this.topicStagingEnabled=JSON.parse(""!==e.topicStagingEnabled&&e.topicStagingEnabled),this.enableStaging=l(this.ID_ENABLE_STAGING),this.stagingQueryTimeOut=l(this.ID_STAGING_QUERY_TIMEOUT),this.minMaxQueryTimeoutNote=l(this.ID_MIN_MAX_STAGING_QUERY_TIMEOUT_CHANGED),this.lifeTimeInfo=l(this.CLASS_LIFETIME_INFO),this.goToDesignerButton=l("#goToDesigner"),this.saveAsTopicInputs=l(this.ID_SAVE_AS_TOPIC_INPUTS),this.name=l("#"+this.ID_TOPIC_NAME),this.description=l("#"+this.ID_TOPIC_DESCRIPTION),this.topicLocation=a(this.ID_TOPIC_LOCATION),this.saveTopicBtn=null,this.saveAsTopicConfirm=a(this.ID_SAVE_AS_TOPIC_CONFIRM),this._clickHandlersHash=this._clickHandlersFactory(),m.registerClickHandlers([this._flowControlsClickEventHandlerWrapper.bind(this),this._clickHandler.bind(this)]),this.setUpStagingQueryTimeOutValue(this.params.topicStagingQueryCacheTimeout||this.minStagingQueryTimeOut),this.initDataLifetimeInputs(),this.initSaveAsTopicModel({name:t.params.topicName||"",description:t.params.topicDescription||"",location:t.params.folderURI,stagingQueryTimeOut:t.stagingQueryTimeOutValue,stagingEnabled:t.topicStagingEnabled},{customValidationValues:{maxNameLength:s,maxDescLength:i,minStagingQueryTimeOut:t.minStagingQueryTimeOut,maxStagingQueryTimeOut:t.maxStagingQueryTimeOut,i18n:{maxStagingQueryTimeOut:t.stagingQueryTimeOutDDHHMM.max,minStagingQueryTimeOut:t.stagingQueryTimeOutDDHHMM.min}}}),this.initEvents()},initEvents:function(){var e=this;this.enableStaging.change(function(){e.toggleStaging()}),this.saveAsTopicModel.bind("attr:invalid",function(e,t,i,s){var a=l(s.el),n=!c.isUndefined(s.silent)&&s.silent;i&&!n&&(a.is("input")||a.is("textarea")?(a.parent().addClass("error"),a.siblings(".message.warning").text(i)):(a.addClass("error"),a.find(".message.warning").text(i)))}),this.saveAsTopicModel.bind("attr:valid",function(e,t,i,s){var a=l(s.el);a.is("input")||a.is("textarea")?(a.parent().removeClass("error"),a.siblings(".message.warning").text("")):(a.removeClass("error"),a.find(".message.warning").text(""))}),this.saveAsTopicInputs.on("keyup","input, textarea",function(t){var i=e.idToAttrMap[this.id],s=this;i&&(e.saveAsTopicModel.set(i,s.value),e.saveAsTopicModel.validateAttr(i,s.value,{el:s,silent:!0}))})},setUpStagingQueryTimeOutValue:function(e){this.stagingQueryTimeOutValue=e,e>this.maxStagingQueryTimeOut&&(this.stagingQueryTimeOutValue=this.maxStagingQueryTimeOut,this.minMaxQueryTimeoutNote.find("span").text(m._messages["page.saveAsTopic.dataLifetime.max.was.changed"]),this.minMaxQueryTimeoutNote.show()),e<this.minStagingQueryTimeOut&&(this.stagingQueryTimeOutValue=this.minStagingQueryTimeOut,this.minMaxQueryTimeoutNote.find("span").text(m._messages["page.saveAsTopic.dataLifetime.min.was.changed"]),this.minMaxQueryTimeoutNote.show())},initSaveAsTopicModel:function(e,t){this.saveAsTopicModel=new this.params.model(e,t)},initDataLifetimeInputs:function(){var e=this;this.stagingQueryTimeOutDDHHMM={max:this.convertToDDHHMM(e.maxStagingQueryTimeOut).stringFormat,min:this.convertToDDHHMM(e.minStagingQueryTimeOut).stringFormat},this.daysInput=this.stagingQueryTimeOut.find("input.days"),this.hoursInput=this.stagingQueryTimeOut.find("input.hours"),this.minutesInput=this.stagingQueryTimeOut.find("input.minutes"),this.setDataLifetimeInfo(),this.setDataLifetimeInputsValues(this.convertToDDHHMM(this.stagingQueryTimeOutValue).values),this.stagingQueryTimeOut.on("keydown","input",function(e){var t=e.which?e.which:event.keyCode;46!=t&&t>31&&(t<48||t>57)&&(t<96||t>105)&&!e.ctrlKey&&!e.shiftKey&&37!=t&&39!=t&&e.preventDefault()}),this.stagingQueryTimeOut.on("keyup","input",function(t){e.validateDataLifetimeInputs(this);var i=e.convertToMinutes(e.daysInput.val()||0,e.hoursInput.val()||0,e.minutesInput.val()||0);e.saveAsTopicModel.set("stagingQueryTimeOut",i),e.saveAsTopicModel.validateAttr("stagingQueryTimeOut",i,{el:e.stagingQueryTimeOut,silent:!0})})},setDataLifetimeInputsValues:function(e){this.daysInput.val(e.days.value),this.hoursInput.val(e.hours.value),this.minutesInput.val(e.minutes.value)},setDataLifetimeInfo:function(){this.lifeTimeInfo.find(".minimumLifetime").text(m._messages["page.saveAsTopic.dataLifetime.minimum"].replace("{0}",this.stagingQueryTimeOutDDHHMM.min)),this.lifeTimeInfo.find(".maximumLifetime").text(m._messages["page.saveAsTopic.dataLifetime.maximum"].replace("{0}",this.stagingQueryTimeOutDDHHMM.max))},validateDataLifetimeInputs:function(e){var t=parseInt(e.getAttribute("max"))>=0?parseInt(e.getAttribute("max")):"",i=parseInt(e.value,10)||0;e.value!=i&&(e.value=i),i>t&&(e.value=t)},convertToMinutes:function(e,t,i){return e*this.minutesIn.day+t*this.minutesIn.hour+1*i},convertToDDHHMM:function(e){var t=e,i=Math.floor(e/this.minutesIn.day);e%=this.minutesIn.day;var s=Math.floor(e/this.minutesIn.hour);e%=this.minutesIn.hour;var a=e,n=function(e){return e.value?e.value+" "+e.units+" ":""},o={days:{value:i||"",units:1!==i?m._messages["page.saveAsTopic.dataLifetime.units.days"]:m._messages["page.saveAsTopic.dataLifetime.units.day"]},hours:{value:s||"",units:1!==s?m._messages["page.saveAsTopic.dataLifetime.units.hours"]:m._messages["page.saveAsTopic.dataLifetime.units.hour"]},minutes:{value:a||"",units:1!==a?m._messages["page.saveAsTopic.dataLifetime.units.minutes"]:m._messages["page.saveAsTopic.dataLifetime.units.minute"]},originalValue:t};return{stringFormat:l.trim(n(o.days)+n(o.hours)+n(o.minutes)),values:o}},toggleStaging:function(){this.enableStaging.prop("checked")?(this.saveAsTopicModel.set("stagingEnabled",!0),this.stagingQueryTimeOut.find("input").removeAttr("disabled")):(this.saveAsTopicModel.set("stagingEnabled",!1),this.stagingQueryTimeOut.find("input").attr("disabled","disabled"),this.saveAsTopicModel.set("stagingQueryTimeOut",this.minStagingQueryTimeOut),this.saveAsTopicModel.validateAttr("stagingQueryTimeOut",this.minStagingQueryTimeOut,{el:this.stagingQueryTimeOut}),this.saveAsTopicModel.validateAttr("name",this.saveAsTopicModel.get("name"),{el:this.name}))},_changeEventIdForSaveButtons:function(){this.SAVE_TOPIC_BUTTONS.each(function(e){d.flowControlsEventMap.get(e).eventId="save"})},_isDataValid:function(){var e=this;return c.each(this.saveAsTopicModel.attributes,function(t,i){e.saveAsTopicModel.validateAttr(i,t,{el:e[i]})}),this.saveAsTopicModel.isValid(!0)},_flowControlsClickEventHandlerWrapper:function(e){function t(e,t){if(!e)return!0;var i=!0;return c.each(e,function(e,s){e?(i=!1,I.showError(t[s],e)):I.hideError(t[s])}),i}var i=!1;return this.SAVE_TOPIC_BUTTONS.each(function(s){if(m.elementClicked(e,s)){if(i=!0,this.saveTopicBtn=o(s).first(),!d.saveAsTopic._isDataValid())throw r;var n=this._formToParams();if(!n[this.ID_HIDDEN_TOPIC_NAME])throw d.flowControlsClickEventHandler(e),r;throw this.checkIfTopicExists(n,function(e){if(I.hideError(a(this.ID_TOPIC_NAME)),!e)throw"malformed server response";t(e.validation,{topicLocation:this.topicLocation})&&(e.topicExists&&"no"!=e.topicExists?"nameBusy"==e.topicExists?I.showError(a(this.ID_TOPIC_NAME),m._messages.resource_of_other_type_exists):"yes"==e.topicExists&&this.showConfirmDialog().then(function(){this.saveTopic()}.bind(this)):this.saveTopic())}.bind(this)),r}},this),i||d.flowControlsClickEventHandler(e)},_clickHandler:function(e){m.basicClickHandler(e,this._clickHandlersHash)},_clickHandlersFactory:function(){return n({"#browser_button":function(){var e=this.repositoryBrowser;return e.isInitialized?(h.popup.show(e.browseRepositoryDialog),e.saveAsTree.selectFolder(a("topicLocation").getValue())):(e.init(this.params,this.saveAsTopicModel),h.popup.show(e.browseRepositoryDialog)),!0}.bind(this)})},checkIfTopicExists:function(e,t){m.sendAjaxRequest({flowExecutionKey:d.flowExecutionKey,eventId:"checkIfExists"},e,t)},saveTopic:function(){this._changeEventIdForSaveButtons(),d.flowControlsClickEventHandler(this.saveTopicBtn)},showConfirmDialog:function(){return h.popupConfirm.show(this.saveAsTopicConfirm,null,{okButtonSelector:"#saveAsTopicOverwriteButtonId",cancelButtonSelector:"#saveAsTopicOverwriteCancelButtonId"})},_formToParams:function(){var e={};return e[this.ID_HIDDEN_TOPIC_NAME]=u(this.ID_TOPIC_NAME)||this.params.topicName,e[this.ID_HIDDEN_TOPIC_LOCATION]=u(this.ID_TOPIC_LOCATION)||this.params.topicLocation,e[this.ID_HIDDEN_TOPIC_DESCRIPTION]=u(this.ID_TOPIC_DESCRIPTION)||this.params.topicDescription,void 0!==a(this.ID_DATA_LIFETIME)&&null!=a(this.ID_DATA_LIFETIME)&&(e[this.ID_DATA_LIFETIME]=this.saveAsTopicModel.get("stagingQueryTimeOut"),e[this.ID_STAGED]=a(this.ID_STAGED).checked),e}},d.saveAsTopic.repositoryBrowser={isInitialized:!1,init:function(e,t){this.browseRepositoryDialog=a("selectFromRepository"),this.selectFromRepoButton=a("selectFromRepoBtnSelect"),this.saveAsTree=this.createRepositoryTree(e),this.saveAsTopicModel=t,this._clickHandlersHash=this._createClickHandlersFactory(),m.registerClickHandlers([function(e){m.basicClickHandler(e,this._clickHandlersHash)}.bind(this)]),this.isInitialized=!0},createRepositoryTree:function(e){var t=e.folderURI?e.folderURI:"/",i=new T.createRepositoryTree("addFileTreeRepoLocation",{providerId:"repositoryTreeFoldersProvider",organizationId:e.organizationId,publicFolderUri:e.publicFolderUri});return i.getTreeId=function(){return"addFileTreeRepoLocation"},i.selectFolder=function(e){i.openAndSelectNode(e)},i.getSelectedFolderUri=function(){var e=i.getSelectedNode();return e&&e.param.uri},i.observe("server:error",function(){window.console&&console.log("Server internal error occurred on repo tree loading.")}),i.observe("childredPrefetched:loaded",function(){i.openAndSelectNode(t)}),i.observe("tree:loaded",function(){i.openAndSelectNode(t)}),i.observe("node:selected",function(e){this._refreshSelectButtonState(e.memo.node)}.bind(this)),i.showTreePrefetchNodes(t),i},_refreshSelectButtonState:function(e){if(e){var t=!!e.param.uri.match(d.saveAsTopic.ORGANIZATION_MATCHER);e.param.extra.isWritable&&!t?p.enable(this.selectFromRepoButton):p.disable(this.selectFromRepoButton)}},_createClickHandlersFactory:function(){return n({"#selectFromRepoBtnCancel":function(){h.popup.hide(this.browseRepositoryDialog)}.bind(this),"#selectFromRepoBtnSelect":function(){var e=this.saveAsTree.getSelectedFolderUri();this.saveAsTopicModel.set("location",e),a("topicLocation").value=e,h.popup.hide(this.browseRepositoryDialog)}.bind(this)})}},void 0===e&&document.observe("dom:loaded",d.initialize.bind(d)),i.exports=m});