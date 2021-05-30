/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","jquery","runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator","./FilterCollection","runtime_dependencies/jrs-ui/src/namespace/namespace","underscore","runtime_dependencies/jrs-ui/src/core/core.layout","runtime_dependencies/js-sdk/src/common/util/featureDetection","./enum/filterDataTypes","./factory/filterEditorFactory","bundle!AdHocFiltersBundle","jquery-ui-touch-punch","jquery-ui/ui/widgets/sortable","runtime_dependencies/jrs-ui/src/components/components.dialog"],function(e,t,i){var n=e("backbone"),r=e("jquery"),s=e("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator"),l=e("./FilterCollection"),o=e("runtime_dependencies/jrs-ui/src/namespace/namespace"),a=o.jaspersoft,c=e("underscore"),h=e("runtime_dependencies/jrs-ui/src/core/core.layout"),d=(e("runtime_dependencies/js-sdk/src/common/util/featureDetection"),e("./enum/filterDataTypes")),u=e("./factory/filterEditorFactory"),f=e("bundle!AdHocFiltersBundle");e("jquery-ui-touch-punch"),e("jquery-ui/ui/widgets/sortable"),e("runtime_dependencies/jrs-ui/src/components/components.dialog");var m=a.components.ConfirmDialog;i.exports=n.View.extend({collectionConstructor:l,events:function(){return{"click .button.action.primary":"applyFilters","click .button.minimize":"markPanelStateAsManuallyChanged","click #filterPanelMutton":"showFiltersMenu"}}(),initialize:function(e){this.onApply=e.onApply,this.onSlice=e.onSlice,this.onStateUpdate=e.onStateUpdate,this.onFilterAdd=e.onFilterAdd,this.onFilterRemove=e.onFilterRemove,this.resetFilterPanelState=e.resetFilterPanelState,this.service=e.service,this.clientKey=e.clientKey,this.collection=e.collection||new l([],{service:this.service,isOlap:this.isOlap}),this._filtersChanged=!1,this.confirmDialog=new m,c.bindAll(this,"addFilter","addSliceFilter","updateFilter","toggleFilter","minimizeAllFilters","maximizeAllFilters","deleteAllFilters","onMove"),this.filtersMenuActionModel=this.createFiltersMenuActionModel(),this.once("reset:panel",this.resetFilterPanelState),this.on("reset:panel",this.render),this.on("change:filters",this.toggleApplyButtonState),this.on("invalid:filters",this.showFilterServerError),this.listenTo(this.collection,"reset",this.recreateFilterEditors),this.listenTo(this.collection,"add",this.addFilterEditor),this.listenTo(this.collection,"remove",this.removeFilterEditor),this.listenTo(this.collection,"destroy",this.deleteFilter),this.listenTo(this.collection,"destroyConfirm",this.removeConfirm),this.listenTo(this.collection,"move",this.onMove),this.listenTo(this.collection,"toggle",this.toggleFilter),this.listenTo(this.collection,"operationChange",this.updateFilter),this.listenTo(this.collection,"validated",this.toggleApplyButtonState),this.listenTo(this.collection,"change:value change:isAnyValue add remove operationChange",c.partial(this.setFiltersChanged,!0)),this.sizerEl=this.$(".sizer:eq(0)")[0]},markPanelStateAsManuallyChanged:function(){h.manuallyChangePanelState("filters",this.clientKey,!0)},unmarkPanelStateAsManuallyChanged:function(){h.manuallyChangePanelState("filters",this.clientKey,!1)},onPanelResize:function(){this.filterEditors&&c.invoke(this.filterEditors,"resizeTitle")},hasNotAppliedFilters:function(){return this._filtersChanged},setFiltersChanged:function(e){this._filtersChanged=e,this.trigger("change:filters")},render:function(){this.$("#filter-container ul.filters").empty();var e=document.createDocumentFragment();return c.each(this.filterEditors,function(t){e.appendChild(t.el)}),this.$("#filter-container ul.filters").html(e),this.onFilterAdd(this.filterEditors),this.initSortable(),this.resizeFilterEditorTitles(),this},initSortable:function(){this.$el.sortable({delay:200,handle:".header",items:"#filter-container li.filter",axis:"y",start:function(e,t){t.item.data("oldIndex",t.item.index())},stop:c.bind(function(e,t){var i=t.item.data("oldIndex"),n=t.item.index();i!=n&&this.moveFilter(this.collection.at(i),i,n)},this)})},createFiltersMenuActionModel:function(){var e={};return e[this.cid]=[s.createMenuElement("simpleAction",{text:f.ADH_1220_DYNAMIC_FILTER_MINIMIZE_ALL,action:this.minimizeAllFilters}),s.createMenuElement("simpleAction",{text:f.ADH_1221_DYNAMIC_FILTER_MAXIMIZE_ALL,action:this.maximizeAllFilters}),s.createMenuElement("separator"),s.createMenuElement("simpleAction",{text:f.ADH_1219_DYNAMIC_FILTER_REMOVE_ALL,action:this.deleteAllFilters})],e},removeFilterEditor:function(e){var t=this._getFilterEditorByModel(e);t&&this.stopListening(t,"uiChange:filters",this.onFilterEditorUIChanged),t&&t.remove(),this.$el.sortable("refresh")},addFilterEditor:function(e,t,i){h.maximize(this.el,!0),this.unmarkPanelStateAsManuallyChanged();var n=this.createEditor(e);c.isArray(this.filterEditors)||(this.filterEditors=[]),this.filterEditors.push(n),this.$("#filter-container ul.filters").append(n.$el),this.onFilterAdd([n]),c.defer(c.bind(n.resizeTitle,n)),this.$el.sortable("refresh")},resizeFilterEditorTitles:function(){c.invoke(this.filterEditors||[],"resizeTitle")},onFilterEditorUIChanged:function(e){setTimeout(c.bind(this.resizeFilterEditorTitles,this),100),e.valueEditorUIChanged&&e.el===c.last(this.$(".leaf.filter"))&&setTimeout(c.bind(function(){this.$("> .content > .body").scrollTop(c.reduce(this.$(".leaf.filter"),function(e,t){return e+r(t).height()},0))},this),50),e.valueEditorUIChanged=!0},showFiltersMenu:function(e){var t=r("#filterPanelMutton");s.isMenuShowing()&&s.menuDom.hasClassName("openByFilterPanelMutton")?(s.hideMenu(),s.menuDom.removeClassName("openByFilterPanelMutton")):s.showDynamicMenu(this.cid,e.originalEvent,"menu vertical dropDown fitable openByFilterPanelMutton",null,this.filtersMenuActionModel);var i=t.offset();r("#menu").offset({top:i.top+t.height(),left:i.left-r("#menu").width()+t.width()}),e.stopPropagation()},recreateFilterEditors:function(){this.cleanUpEditors(),this.filterEditors=this.collection.map(function(e){return this.createEditor(e)},this),this.trigger("reset:panel")},cleanUpEditors:function(){var e=this;c.each(this.filterEditors,function(t){e.stopListening(t,"uiChange:filters",e.onFilterEditorUIChanged)}),c.invoke(this.filterEditors||[],"remove")},createEditor:function(e){var t=u(e.isReadOnly()?d.READ_ONLY:e.get("filterDataType"),this.isOlap),i=t(e);return this.listenTo(i,"uiChange:filters",this.onFilterEditorUIChanged),i},showFilterServerError:function(e,t){this.$("#filterMessage span").html(t)},onMove:function(e,t){var i=this._getFilterEditorByModel(e),n=i.$el.index(),r=t.direction;r<0&&0===n||r>0&&n===this.collection.length-1||(-1===r?i.$el.insertBefore(this.$("#filter-container li.filter:eq("+(n+r)+")")):i.$el.insertAfter(this.$("#filter-container li.filter:eq("+(n+r)+")")),this.$el.sortable("refreshPositions"),this.moveFilter(e,n,n+r))},removeConfirm:function(e){this.confirmDialog.show({ok:c.bind(function(){this._getFilterEditorByModel(e).removeFilter({force:!0})},this),messages:f.ADH_1230_DYNAMIC_FILTER_ADVANCED_CONFIRM_REMOVE})},_getFilterEditorByModel:function(e){return c.find(this.filterEditors,function(t){return e.cid===t.model.cid})},hasFilterForField:function(e){return!c.isEmpty(this.collection.where({name:e}))},toggleApplyButtonState:function(){this._filtersChanged&&this.collection.every(function(e){return e.get("filterDataType")===d.READ_ONLY||e.isValid()})?this.enableApplyButton():this.disableApplyButton()},disableApplyButton:function(){this.$("#applyFilter > button.action").attr("disabled","disabled").removeClass("over")},enableApplyButton:function(){this.$("#applyFilter > button.action").removeAttr("disabled")},setFilters:function(e,t){this.setFiltersChanged(e.isFiltersDraft);var i=t&&t.reset?"reset":"set";this.collection[i](e.existingFilters)},getFilters:function(){return this.service.get().done(c.bind(function(e){this.setFilters(e,{reset:!0})},this))},addFilter:function(e){var t=!c.isEmpty(e)&&e[0].fieldName?"fieldName":"name";return this.service.add(c.pluck(e,t)).done(c.bind(function(e){this.collection.set(e.existingFilters),this.onStateUpdate(e)},this))},addSliceFilter:function(e,t){var i=c(t).filter(function(e){return"true"!==e.isSummary}).map(function(e){return e.path}).uniq();return this.service.addSlice(t[0].axis,"true"===e,i).done(c.bind(function(e){this.onSlice(e),h.maximize(this.el,!0),this.setFilters(e,{reset:!0}),this.unmarkPanelStateAsManuallyChanged()},this))},updateFilter:function(e){if(e.isValid(!0))return e.saveValue().done(c.bind(function(t){var i=c.findWhere(t.existingFilters,{id:e.id});i&&e.set(i,{silent:!0}),this.onStateUpdate(t)},this))},_deleteFilterDoneCallback:function(e,t){this.collection.set(t.existingFilters),this.onStateUpdate(t),this.onFilterRemove([e])},deleteFilter:function(e){return this.service.remove(e.id).done(c.bind(this._deleteFilterDoneCallback,this,e.toJSON()))},_deleteAllFiltersDoneCallback:function(e,t){this.collection.reset(t.existingFilters),this.onStateUpdate(t),this.onFilterRemove(e),this.setFiltersChanged(!0)},deleteAllFilters:function(){return this.service.removeAll().done(c.bind(this._deleteAllFiltersDoneCallback,this,this.collection.toJSON()))},moveFilter:function(e,t,i){return this.service.reorder(t,i).done(c.bind(function(e){this.collection.set(e.existingFilters),this.onStateUpdate(e)},this))},toggleFilter:function(e){return this.service.toggleVisibility(e.get("id"))},minimizeAllFilters:function(){return this.collection.invoke("set","filterPodMinimized",!0),this.service.minimizeAll()},maximizeAllFilters:function(){return this.collection.invoke("set","filterPodMinimized",!1),this.service.maximizeAll()},applyFilters:function(){return this.$("#filterMessage span").empty(),this.setFiltersChanged(!1),this.service.applyFiltersAndExpression(this.collection.toExpression(),"").done(c.bind(function(e){this.setFilters(e),this.onApply(e)},this)).fail(c.bind(function(e){var t=JSON.parse(e.responseText);t.editFilterError&&this.collection.trigger("invalid:filters",this.collection,t.editFilterError)},this))}})});