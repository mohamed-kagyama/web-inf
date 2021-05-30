/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/js-sdk/src/common/view/mixin/epoxyViewMixin","underscore","jquery","runtime_dependencies/js-sdk/src/common/component/panel/Panel","bundle!DashboardBundle","bundle!CommonBundle","runtime_dependencies/bi-report/src/bi/report/enum/scaleStrategies","../../../../enum/dashboardComponentTypes","runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog","../../../../factory/propertiesDialogTabsFactory","text!../../../../template/properties/propertiesPanelTemplate.htm","text!../../../../template/properties/propertiesPanelTabButtonTemplate.htm","text!../../../../template/properties/controls/availableParametersTemplate.htm","text!../../../../template/tooltip/sideBarTreeLeafTooltipTemplate.htm","runtime_dependencies/js-sdk/src/common/component/panel/trait/tabbedPanelTrait","runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes","../../../../view/mixin/parameterExpressionAutocompletionMixin","../../../../hyperlink/parameters/view/HyperlinkParametersSectionView","runtime_dependencies/bi-repository/src/bi/repository/dialog/resourceChooser/RepositoryChooserDialogFactory","settings!treeComponent"],function(e,t,o){function i(e,t,o,r,s){var n=e.indexOf(o,t);return n<0?s.push(e.substr(t)):(s.push(e.substring(t,n)),s.push(o),i(e,o.length+n,r,o,s)),s}function r(e,t,o,i){for(var r,n,a=2;a<e.length;a+=4){r=s(e[a]),n=!1;for(var p=0;!n&&p<t.length;p++)for(var h=0;!n&&h<r.length;h++)l.trim(r[h])===t[p][o]&&(r[h]=r[h].replace(t[p][o],t[p][i]),n=!0);e[a]=r.join("")}return e.join("")}function s(e){for(var t=[],o=[],i=!1,r=0;r<e.length;r++)'"'!==e[r]||e[r-1]&&"\\"===e[r-1]||(i=!i),i||","!==e[r]&&"?"!==e[r]?o.push(e[r]):(t.push(o.join("")),t.push(e[r]),o=[]);return t.push(o.join("")),t}var n=e("runtime_dependencies/js-sdk/src/common/view/mixin/epoxyViewMixin"),a=e("underscore"),l=e("jquery"),p=e("runtime_dependencies/js-sdk/src/common/component/panel/Panel"),h=e("bundle!DashboardBundle"),c=e("bundle!CommonBundle"),d=e("runtime_dependencies/bi-report/src/bi/report/enum/scaleStrategies"),m=e("../../../../enum/dashboardComponentTypes"),u=e("runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog"),g=e("../../../../factory/propertiesDialogTabsFactory"),y=e("text!../../../../template/properties/propertiesPanelTemplate.htm"),C=e("text!../../../../template/properties/propertiesPanelTabButtonTemplate.htm"),f=e("text!../../../../template/properties/controls/availableParametersTemplate.htm"),T=e("text!../../../../template/tooltip/sideBarTreeLeafTooltipTemplate.htm"),b=e("runtime_dependencies/js-sdk/src/common/component/panel/trait/tabbedPanelTrait"),D=e("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes"),v=e("../../../../view/mixin/parameterExpressionAutocompletionMixin"),x=e("../../../../hyperlink/parameters/view/HyperlinkParametersSectionView"),w=e("runtime_dependencies/bi-repository/src/bi/repository/dialog/resourceChooser/RepositoryChooserDialogFactory"),P=e("settings!treeComponent"),k=function(){a.size(this.tabs)>1?(this.$contentContainer.addClass("bordered"),this.$("> .header").show()):(this.$contentContainer.removeClass("bordered"),this.$("> .header").hide())},F=p.extend({events:{"click button.showGoToFilterManagerConfirmationDialog":"showGoToFilterManagerConfirmationDialog","click button.showRepositoryChooserDialog":"showRepositoryChooserDialog","click button.showRepositoryChooserFileDialog":"showRepositoryChooserFileDialog"},bindingFilters:{scaleStrategy:function(e){var t=Number(e);return isNaN(t)?e:t}},computeds:{fitToDashlet:{deps:["scaleToFit"],get:function(e){return a.contains(a.values(d),e)}},parameters:{deps:["dashletHyperlinkUrl"],get:function(e){if(!a.isUndefined(e)){return r(i(e,0,"$P{","}",[]),this.getBinding("outputParameters")||[],"id","label")}return""},set:function(e){var t,o={},s=this.model;a.isUndefined(e)?o.dashletHyperlinkUrl=e:(t=i(e,0,"$P{","}",[]),o.dashletHyperlinkUrl=r(t,this.getBinding("outputParameters")||[],"label","id")),this.setBinding("dashletHyperlinkUrl",o),s.validate&&s.validate(o)}},dashletHyperlinkUrlVisible:{deps:["exposeOutputsToFilterManager","dashletHyperlinkTarget"],get:function(e,t){var o=e&&""!==t;return o&&this.model.validate({dashletHyperlinkUrl:this.model.get("dashletHyperlinkUrl")}),o}},adHocView:{get:function(){return a.contains([m.ADHOC_VIEW,m.CHART,m.TABLE,m.CROSSTAB],this.model.get("type"))}}},constructor:function(e){e||(e={}),p.call(this,a.extend({},e,{traits:[b],template:y,optionTemplate:C,tabHeaderContainerSelector:"> .header > .tabSet",toggleClass:"selected",tabs:g(e.model)}))},initialize:function(e){this.original=this.model,this.model=this.original.clone(),this.originalState=this.model.clone(),this.epoxifyView(),p.prototype.initialize.apply(this,arguments),this.listenTo(this.original,"change",this._onOriginalModelChange),this.listenTo(this.model,"change:outputParameters",this.renderAvailableParameters),this.renderAvailableParameters(),k.call(this),this.applyParameterExpressionAutocompletionMixin()},_onOriginalModelChange:function(){var e=this.original.changedAttributes();e&&(this.model.set(e),this.model.validate(e),"isAdhocChart"in e&&k.call(this))},open:function(){p.prototype.open.apply(this,arguments),this.applyEpoxyBindings()},renderAvailableParameters:function(){var e=this,t=this.model.get("type");t===m.FREE_TEXT||t===m.IMAGE?(this.hyperlinkParametersSectionView||(this.hyperlinkParametersSectionView=new x,this.$(".hyperlinkParametersContainer").html(this.hyperlinkParametersSectionView.render().$el),this.listenTo(this.hyperlinkParametersSectionView.collection,"add change remove",function(){e.model.set("outputParameters",e.hyperlinkParametersSectionView.toJSON(),{silent:!0})})),this.hyperlinkParametersSectionView.reset(this.model.get("outputParameters"))):this.$(".availableParametersList").html(a.template(f,{outputParameters:this.model.get("outputParameters")}))},showGoToFilterManagerConfirmationDialog:function(){this._goToFilterManagerConfirmationDialog||(this._goToFilterManagerConfirmationDialog=new u({text:h["dashboard.component.dialog.properties.hyperlinks.go.to.filter.manager.confirmation"]}),this.listenTo(this._goToFilterManagerConfirmationDialog,"button:yes",function(){this.trigger("saveAndGoToFilterManager",this)},this)),this._goToFilterManagerConfirmationDialog.open()},showRepositoryChooserDialog:function(){var e;this.repositoryChooserDialog||(e=w.getDialog("item"),this.repositoryChooserDialog=new e({treeBufferSize:parseInt(P.treeLevelLimit,10),title:h["dashboard.dialog.properties.repository.chooser.title"],resourcesTypeToSelect:[D.DASHBOARD,D.REPORT_UNIT,D.ADHOC_DATA_VIEW],tooltipTemplate:T,tooltipi18n:c,cssClassItemProcessor:function(e){switch(e.value.resourceType){case D.REPORT_UNIT:e.cssClass="dashboard-existingContent-report";break;case D.ADHOC_DATA_VIEW:e.cssClass="dashboard-existingContent-adhoc-wide";break;case D.DASHBOARD:e.cssClass="dashboard-existingContent-dashboard"}return e}}),this.listenTo(this.repositoryChooserDialog,"close",function(){if(this.repositoryChooserDialog.selectedResource&&this.repositoryChooserDialog.selectedResource.resourceUri){var e={dashletHyperlinkUrl:"repo:"+this.repositoryChooserDialog.selectedResource.resourceUri};this.model.set(e),this.model.validate(e)}},this)),this.repositoryChooserDialog.open()},showRepositoryChooserFileDialog:function(){if(!this.repositoryChooserFileDialog){var e=w.getDialog("item"),t=[".pdf",".docx",".html",".ods",".odt",".csv",".pptx",".rtf",".xls",".xlsx",".svg",".xml",".jar",".jrxml",".cur",".jrtx",".properties",".css",".eot",".ttf",".woff"];this.repositoryChooserFileDialog=new e({title:h["dashboard.dialog.properties.repository.chooser.title"],treeBufferSize:parseInt(P.treeLevelLimit,10),resourcesTypeToSelect:["img"],resourcesTypeToSelectTree:["file"],tooltipTemplate:T,tooltipi18n:c,cssClassItemProcessor:function(e){return e.value.resourceType!==D.FILE||a.find(t,function(t){return e.value.label.toLowerCase().endsWith(t)})||(e.cssClass="dashboard-newContent-image"),e}}),this.listenTo(this.repositoryChooserFileDialog,"close",function(){if(this.repositoryChooserFileDialog.selectedResource&&this.repositoryChooserFileDialog.selectedResource.resourceUri){var e={url:"repo:"+this.repositoryChooserFileDialog.selectedResource.resourceUri};this.model.set(e),this.model.validate(e)}},this)}this.repositoryChooserFileDialog.open()},remove:function(){this.removeEpoxyBindings(),this._goToFilterManagerConfirmationDialog&&this._goToFilterManagerConfirmationDialog.remove(),this.repositoryChooserDialog&&this.repositoryChooserDialog.remove(),this.repositoryChooserFileDialog&&this.repositoryChooserFileDialog.remove(),p.prototype.remove.apply(this,arguments)}});a.extend(F.prototype,n,v),o.exports=F});