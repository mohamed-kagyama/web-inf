/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../view/BaseDataSourceView","../model/VirtualDataSourceModel","../model/SubDataSourceModel","../../dynamicTree/dynamicTree.utils","../../components/components.dependent.dialog","bundle!jasperserver_messages","text!../template/virtualSpecificTemplate.htm","text!../template/dialog/dependenciesTemplate.htm","../view/SubDataSourcesListView"],function(e,t,s){var a=e("underscore"),r=e("../view/BaseDataSourceView"),o=e("../model/VirtualDataSourceModel"),i=e("../model/SubDataSourceModel"),u=e("../../dynamicTree/dynamicTree.utils"),d=e("../../components/components.dependent.dialog"),n=e("bundle!jasperserver_messages"),c=e("text!../template/virtualSpecificTemplate.htm"),l=e("text!../template/dialog/dependenciesTemplate.htm"),h=e("../view/SubDataSourcesListView");s.exports=r.extend({PAGE_TITLE_NEW_MESSAGE_CODE:"resource.datasource.virtual.page.title.new",PAGE_TITLE_EDIT_MESSAGE_CODE:"resource.datasource.virtual.page.title.edit",hasDependedResources:!1,modelConstructor:o,events:{"keyup input[type='text'][class!='dataSourceID'], textarea":"updateModelProperty","change input[type='text'][class!='dataSourceID'], textarea, select":"updateModelProperty","click [name=toRight]":"chooseTreeNodes","click [name=toLeft]":"removeSelectedSubDataSources","click [name=allToLeft]":"removeAllSubDataSources"},initialize:function(e){this.dependentResources=e.dependentResources,this._subDataSourcesHiddenNodes={},this.dependentResources&&this.dependentResources.length>0&&(this.hasDependedResources=!0),r.prototype.initialize.apply(this,arguments),this.showDependentResources(),this.listenTo(this.model.subDataSources,"reset",this.updateAllToLeftButtonState)},chooseTreeNodes:function(e){e.preventDefault(),this.$("[name=toRight]").attr("disabled","disabled").removeClass("over");var t=this.subDataSourcesTree.selectedNodes,s=a.compact(a.map(t,function(e){return e?new i({name:e.name,id:e.param.id,uri:e.param.uri,readOnly:!1}):null}));this.model.subDataSources.reset(this.model.subDataSources.models.concat(s));var r=a.map(t,function(e){return e.param.uri});this._hideAvailableSubDataSources(r)},removeAllSubDataSources:function(e){if(e.preventDefault(),!this.hasDependedResources){this.subDataSourcesTree._deselectAllNodes();var t=this;this.model.subDataSources.forEach(function(e){t._unhideAvailableSubDataSources(e.get("uri"))}),this.model.subDataSources.reset([]),this.updateRightButtonState()}},removeSelectedSubDataSources:function(e){e.preventDefault(),this.subDataSourcesTree._deselectAllNodes();var t=this.selectedSubDataSourcesList.getSelectedModels(),s=this,r=[];a.each(t,function(e){s._unhideAvailableSubDataSources(e.get("uri"))}),this.model.subDataSources.forEach(function(e){a.include(t,e)||r.push(e)}),this.model.subDataSources.reset(r),this.updateRightButtonState()},updateAllToLeftButtonState:function(){this.hasDependedResources||0===this.selectedSubDataSourcesList.getListLength()?this.$("[name=allToLeft]").attr("disabled","disabled").removeClass("over"):this.$("[name=allToLeft]").removeAttr("disabled")},updateRightButtonState:function(){for(var e=this.$("[name=toRight]"),t=this.subDataSourcesTree.selectedNodes,s=!1,a=!1,r=0;r<t.length;r++){if(t[r].isParent()||this.model.subDataSources.where({uri:t[r].param.uri}).length){a=!0;break}s=!0}s&&!a?e.removeAttr("disabled"):e.attr("disabled","disabled").removeClass("over")},updateLeftButtonState:function(){var e=this.selectedSubDataSourcesList.getSelectedModels(),t=this.$("[name=toLeft]");e.length>0?t.removeAttr("disabled"):t.attr("disabled","disabled").removeClass("over")},render:function(){return this.$el.empty(),this.renderVirtualSpecificSection(),this.updateAllToLeftButtonState(),this},showDependentResources:function(){this.hasDependedResources&&d.show(this.dependentResources,{},{canSave:!1,okOnly:!0,topMessage:n["resource.dataSource.virtual.dependencies.top.message"],bottomMessage:n["resource.dataSource.virtual.dependencies.bottom.message"]})},renderVirtualSpecificSection:function(){var e=this,t=function(){e._hideAvailableSubDataSources(e.model.subDataSources.map(function(e){return e.get("uri")}))};this.$el.append(a.template(c,this.templateData())),this.$el.append(a.template(l,this.templateData())),this.selectedSubDataSourcesList=new h({collection:this.model.subDataSources}),this.listenTo(this.selectedSubDataSourcesList,"item:unselected item:selected",a.bind(this.updateLeftButtonState,this)),this.selectedSubDataSourcesList.render(),this.subDataSourcesTree=u.createRepositoryTree("subDataSourcesTree",{treeId:"subDataSourcesTree",providerId:"joinableDsTreeDataProvider",selectLeavesOnly:!0,multiSelectEnabled:!0}),this.subDataSourcesTree.observe("leaf:dblclick",a.bind(this.chooseTreeNodes,this)),this.subDataSourcesTree.observe("node:selected",a.bind(this.updateRightButtonState,this)),this.subDataSourcesTree.observe("node:unselected",a.bind(this.updateRightButtonState,this)),this.subDataSourcesTree.observe("leaf:selected",a.bind(this.updateRightButtonState,this)),this.subDataSourcesTree.observe("leaf:unselected",a.bind(this.updateRightButtonState,this)),this.subDataSourcesTree.observe("children:loaded",t),this.subDataSourcesTree.showTreePrefetchNodes(this.model.subDataSources.map(function(e){return e.get("uri")}).join(","),t)},_hideAvailableSubDataSources:function(e){var t=this;if(a.isArray(e))a.each(e,function(e){t._hideAvailableSubDataSources(e)});else{var s=this.subDataSourcesTree.findLastLoadedNode(e);if(s&&s.param.uri===e){this._subDataSourcesHiddenNodes[e]={parent:s.parent,child:s};var r=s.parent;r.removeChild(s),r.resortChilds()}}},_unhideAvailableSubDataSources:function(e){function t(e,t){e.processNodePath(t,function(s){s.parent&&(e.rootNode!=s.parent&&e.getState(s.parent.id)==u.TreeNode.State.CLOSED&&s.parent.handleNode(),s.param.uri===t&&s.select())})}var s=this,r=[];a.each(a.isArray(e)?e:[e],function(e){var a=s._subDataSourcesHiddenNodes[e];a?(a.parent.addChild(a.child),a.parent.resortChilds(),a.parent.refreshNode(),t(s.subDataSourcesTree,e)):r.push(e)}),r.length&&this.subDataSourcesTree.showTreePrefetchNodes(r.join(","),function(){a.each(r,a.bind(t,this,s.subDataSourcesTree))})},remove:function(){this.selectedSubDataSourcesList&&this.selectedSubDataSourcesList.remove(),r.prototype.remove.apply(this,arguments)}})});