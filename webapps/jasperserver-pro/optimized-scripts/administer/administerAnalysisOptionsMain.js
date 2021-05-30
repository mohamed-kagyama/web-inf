/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define("runtime_dependencies/jrs-ui/src/administer/administer.base",["require","exports","module","prototype","underscore","../core/core.ajax","../core/core.ajax.utils"],function(e,n,t){var i=e("prototype"),o=i.Template,s=e("underscore"),r=e("../core/core.ajax"),a=r.ajaxTargettedUpdate,u=r.AjaxRequester,l=e("../core/core.ajax.utils"),d=l.baseErrorHandler;void 0===window.Administer&&(window.Administer={}),window.Administer=s.extend({_messages:{},urlContext:null,getMessage:function(e,n){var t=this._messages[e];return t?new o(t).evaluate(n||{}):""},menuActions:{"p#navAnalysisOptions":function(){return window.Administer.urlContext+"/flow.html?_flowId=mondrianPropertiesFlow"},"p#navAnalysisOptionsCE":function(){return window.Administer.urlContext+"/olap/properties.html"},"p#navDesignerOptions":function(){return window.Administer.urlContext+"/flow.html?_flowId=designerOptionsFlow"},"p#navDesignerCache":function(){return window.Administer.urlContext+"/flow.html?_flowId=designerCacheFlow"},"p#navAwsSettings":function(){return window.Administer.urlContext+"/flow.html?_flowId=awsSettingsFlow"},"p#navLogSettings":function(){return window.Administer.urlContext+"/log_settings.html"},"p#logCollectors":function(){return window.Administer.urlContext+"/logCollectors.html"},"p#navImport":function(){return window.Administer.urlContext+"/adminImport.html"},"p#navExport":function(){return window.Administer.urlContext+"/adminExport.html"},"p#navCustomAttributes":function(){return window.Administer.urlContext+"/customAttributes.html"},"p#navResetSettings":function(){return window.Administer.urlContext+"/resetSettings.html"}},_sendRequest:function(e,n,t){a(e,{postData:n,callback:t,mode:u.prototype.EVAL_JSON,errorHandler:this._errorHandler})},_errorHandler:function(e){return e.getResponseHeader("LoginRequested")?(window.location="flow.html?_flowId=designerCacheFlow",!0):d(e)}},window.Administer),t.exports=window.Administer}),define("runtime_dependencies/jrs-ui/src/administer/administer.options",["require","exports","module","prototype","../core/core.layout","../components/components.webHelp","./administer.base","../util/utils.common","../core/core.events.bis","../components/components.dialogs","../namespace/namespace","jquery"],function(e,n,t){var i=e("prototype"),o=i.$,s=e("../core/core.layout"),r=e("../components/components.webHelp"),a=e("./administer.base"),u=e("../util/utils.common"),l=u.matchAny,d=u.matchMeOrUp,c=e("../core/core.events.bis"),m=e("../components/components.dialogs"),p=e("../namespace/namespace"),f=p.isProVersion,w=e("jquery"),_={SAVE_PFX:"save",CANCEL_PFX:"cancel",ERROR_PFX:"error_",INPUT_PFX:"input_",BUTTON_FLASH:"flushOLAPCache",initialize:function(){w("#serverSettingsMenu").length>0&&s.resizeOnClient("serverSettingsMenu","settings"),r.setCurrentContext("admin"),o("display").observe("click",function(e){var n=e.element();for(var t in a.menuActions)if(l(n,[t],!0)&&!d(n.parentNode,"li").hasClassName("selected"))return void(document.location=a.menuActions[t]());if(l(n,["#"+_.BUTTON_FLASH],!0))return Event.stop(e),void _.flushCache();var i=l(n,["#"+_.SAVE_PFX],!0);if(i){Event.stop(e);var o=i.name;return void _.saveValue(o)}i=l(n,["#"+_.CANCEL_PFX],!0),i&&(Event.stop(e),_.resetValue(i.name,i.value)),l(n,[".checkBox > input","select"])&&_.switchButtons(n,!0)}),o("display").observe("keydown",function(e){var n=e.element();n.match("input")&&_.switchButtons(n,!0)})},saveValue:function(e){var n=o(_.INPUT_PFX+e),t={name:e,value:"checkbox"==n.type?n.checked:n.value,_flowExecutionKey:a.flowExecutionKey,_eventId:"saveSingleProperty"},i="flow.html?"+Object.toQueryString(t);a._sendRequest(i,t,_._updateCallback)},resetValue:function(e,n){var t=o(_.INPUT_PFX+e);"checkbox"==t.type?t.checked="true"==String(n):t.value=n,_.switchButtons(t,!1),o(document.body).select('[for="'+_.INPUT_PFX+e+'"]')[0].removeClassName(s.ERROR_CLASS)},flushCache:function(){var e=f()?"flow.html?_flowExecutionKey="+a.flowExecutionKey+"&_eventId=flushCache":"flush.html";a._sendRequest(e,null,_._flushCallback)},switchButtons:function(e,n){"string"==typeof e&&(e=o(_.INPUT_PFX+e)),_._enableButton(o(d(e,"li")).select("button")[0],n),_._enableButton(o(d(e,"li")).select("button")[1],n)},_enableButton:function(e,n){n?c.enable(e):c.disable(e)},_updateCallback:function(e){e.error?(o(document.body).select('[for="'+_.INPUT_PFX+e.optionName+'"]')[0].addClassName(s.ERROR_CLASS),o(_.ERROR_PFX+e.optionName).update(a.getMessage(e.error))):(_.switchButtons(e.optionName,!1),m.systemConfirm.show(a.getMessage(e.result)),o(document.body).select('[for="'+_.INPUT_PFX+e.optionName+'"]')[0].removeClassName(s.ERROR_CLASS))},_flushCallback:function(e){e.error?m.systemConfirm.show(a.getMessage("JAM_018_ERROR")+": "+e.error):m.systemConfirm.show(a.getMessage(e.result))}};void 0===e&&document.observe("dom:loaded",_.initialize.bind(_)),t.exports=_}),define("runtime_dependencies/jrs-ui/src/administer/administerAnalysisOptionsMain",["require","exports","module","requirejs-domready","../administer/administer.base","../administer/administer.options","runtime_dependencies/js-sdk/src/jrs.configs","underscore"],function(e,n,t){var i=e("requirejs-domready"),o=e("../administer/administer.base"),s=e("../administer/administer.options"),r=e("runtime_dependencies/js-sdk/src/jrs.configs"),a=e("underscore");i(function(){a.extend(o._messages,r.Administer._messages),o.urlContext=r.urlContext,o.flowExecutionKey=r.Administer.flowExecutionKey,s.initialize()})}),define("administer/administerAnalysisOptionsMain",["require","exports","module","runtime_dependencies/jrs-ui/src/administer/administerAnalysisOptionsMain"],function(e,n,t){e("runtime_dependencies/jrs-ui/src/administer/administerAnalysisOptionsMain")});