/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","underscore","bundle!all","runtime_dependencies/js-sdk/src/jrs.configs","request","backbone.marionette","runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog","../enum/collectorStatusEnum","../view/LogCollectorView","runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog","text!../templates/LogCollectorsList.htm"],function(e,t,o){var i=e("jquery"),n=e("underscore"),l=e("bundle!all"),s=e("runtime_dependencies/js-sdk/src/jrs.configs"),r=e("request"),c=e("backbone.marionette"),a=e("runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog"),u=e("../enum/collectorStatusEnum"),h=e("../view/LogCollectorView"),d=e("runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog"),m=e("text!../templates/LogCollectorsList.htm");o.exports=c.CollectionView.extend({initialize:function(e,t){this.options=t,this.setElement(n.template(m,{i18n:l})),this.$collectors=this.$el.find("[name=collectors]"),this.$nothingToDisplay=this.$el.find("[name=nothingToDisplay]"),this.ui={},this.ui.createNewButton=this.$el.find("[name=createNewBtn]"),this.ui.stopAllButton=this.$el.find("[name=stopAllBtn]"),this.ui.deleteAllButton=this.$el.find("[name=deleteAllBtn]"),this.ui.createNewButton.on("click",n.bind(this.createNewLogCollector,this)),this.ui.stopAllButton.on("click",n.bind(this.confirmStopAll,this)),this.ui.deleteAllButton.on("click",n.bind(this.confirmDeleteAll,this)),this.views=[]},getErrorDialog:function(){return this.errorDialog?this.errorDialog:this.errorDialog=new a},removeOverClassOnButtons:function(){this.$el.find("button").removeClass("over")},parse:function(e){var t=e.CollectorSettingsList;return t=n.sortBy(t,function(e){return e.name})},showServerCommunicationError:function(){var e=this.getErrorDialog();e.setMessage(l["logCollectors.alert.server.communication.error"]),e.open()},appendNewlyCreatedLogCollector:function(e){var t=this._buildViewFromModel(e);this.views.push(t),t.render(),this.$collectors.append(t.$el),this._reRenderAllButtons(),this._reRenderNothingToDisplay()},refreshListOfCollectors:function(){var e=this,t=new i.Deferred;return r({type:"GET",url:s.contextPath+"/rest_v2/diagnostic/collectors",cache:!1,headers:{Accept:"application/json","Content-Type":"application/json; charset=UTF-8"}}).done(function(o){o=o?e.parse(o):[],e._refreshListOfCollectorsDone(o),t.resolve()}).fail(function(o){if(404===o.status)return e._refreshListOfCollectorsDone([]),void t.resolve();t.reject(),e.showServerCommunicationError()}),t},_refreshListOfCollectorsDone:function(e){var t=this;this.removeCollectorsFromDOM(),this.views=[],n.each(e,function(e){var o=t._buildViewFromModel(e);t.views.push(o),o.render(),t.$collectors.append(o.$el)}),this._reRenderAllButtons(),this._reRenderNothingToDisplay()},_buildViewFromModel:function(e){var t=new h({collectorModelFromServer:e});return this.listenTo(t,"removed",this.onCollectorViewRemoved),this.listenTo(t,"modelStatusChange",this._reRenderAllButtons),this.listenTo(t,"stopped",this._reRenderAllButtons),t},triggerButtons:function(e,t){"all"===t&&(t=["stopAll","deleteAll"]);for(var o,i=0;i<t.length;i++){switch(o=t[i]){case"stopAll":o=this.ui.stopAllButton;break;case"deleteAll":o=this.ui.deleteAllButton;break;default:return}e?o.removeAttr("disabled"):o.attr("disabled","true")}},createNewLogCollector:function(){this.trigger("createNewCollectorClick")},confirmStopAll:function(){if(0!==this.views.length){var e=l["logCollectors.confirm.stopAll"].replace("{newline}","<br/><br/>"),t=new d({title:l["logCollectors.confirm.title"],text:e});this.listenTo(t,"button:yes",this.stopAll),t.open()}},stopAll:function(){var e=this,t=JSON.stringify({version:0,patch:[{field:"status",value:u.STOPPED}]});n.each(this.views,function(e){e.model.isInRunningMode()&&(e.model.set({status:u.SHUTTING_DOWN},{silent:!0}),e.updateUI({status:u.SHUTTING_DOWN}))}),this.triggerButtons(!1,"all"),r({type:"PATCH",url:s.contextPath+"/rest_v2/diagnostic/collectors/",cache:!1,headers:{Accept:"application/json","Content-Type":"application/json; charset=UTF-8"},data:t}).always(function(){e.triggerButtons(!0,"all")}).done(function(){e.refreshListOfCollectors()}).fail(function(){e.showServerCommunicationError()})},confirmDeleteAll:function(){if(0!==this.views.length){var e=l["logCollectors.confirm.deleteAll"].replace("{newline}","<br><br>"),t=new d({title:l["logCollectors.confirm.title"],text:e});this.listenTo(t,"button:yes",this.deleteAll),t.open()}},deleteAll:function(){var e=this;e.triggerButtons(!1,"all"),r({type:"DELETE",url:s.contextPath+"/rest_v2/diagnostic/collectors",cache:!1,headers:{Accept:"application/json","Content-Type":"application/json; charset=UTF-8"}}).always(function(){e.triggerButtons(!0,"all")}).done(function(){e.removeCollectorsFromDOM(),e.views=[],e._reRenderAllButtons(),e._reRenderNothingToDisplay()}).fail(function(){e.showServerCommunicationError()})},removeCollectorsFromDOM:function(){n.each(this.views,function(e){e.$el.detach()})},onCollectorViewRemoved:function(e){this.views=n.filter(this.views,function(t){return t.model.get("id")!==e},this),this._reRenderAllButtons(),this._reRenderNothingToDisplay()},_reRenderNothingToDisplay:function(){this.$nothingToDisplay.addClass("hidden"),0===this.views.length&&this.$nothingToDisplay.removeClass("hidden")},_reRenderAllButtons:function(){var e=!1,t=!1;this.ui.stopAllButton.attr("disabled","true"),this.ui.deleteAllButton.attr("disabled","true"),n.each(this.views,function(o){o.model.isInRunningMode()&&(e=!0),o.model.isInShuttingDownMode()&&(t=!0)}),e&&!t&&this.ui.stopAllButton.removeAttr("disabled"),this.views.length>0&&!t&&this.ui.deleteAllButton.removeAttr("disabled")}})});