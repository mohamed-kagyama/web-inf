/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","prototype","underscore","./domain.chooser","./domain.filters","runtime_dependencies/jrs-ui/src/util/utils.common","runtime_dependencies/jrs-ui/src/util/touch.controller"],function(e,t,r){var i=e("prototype"),o=i.$,l=e("underscore"),n=e("./domain.chooser"),d=e("./domain.filters"),s=e("runtime_dependencies/jrs-ui/src/util/utils.common"),c=s.isSupportsTouch,a=s.disableSelectionWithoutCursorStyle,u=s.isIPad,p=s.deepClone,m=e("runtime_dependencies/jrs-ui/src/util/touch.controller");n.preFilters={init:function(){var e=n.preFilters;n.submitFormId="preFiltersForm";var t=new d.FilterModelController("filtersListId",d.FilterEditor,window.localContext.rsInitOptions);if(e.fields.init(t,function(){t.init(),t.initDropContainer(["draggable"])}),c()){var r=document.getElementById("stepDisplayScrollWrapper"),i=document.getElementById("fieldsTreeRoot"),l=document.getElementById("filtersListId");new m(r,r.parentNode,{absolute:!0,scrollbars:!0}),new m(i,i.parentNode),new m(l,l.parentNode)}d.resetTreeSelectionHandler.init(["#"+e.fields.ITEMS_TREE_DOM_ID],function(){return[e.fields.itemsTree]}),a(o(document.body))}},n.preFilters.fields={ITEMS_TREE_DOM_ID:"fieldsTreeRoot",TREE_DATA_PROVIDER:"semantic-layer-query-tree-data-provider",itemsTree:null,init:function(e,t){var r=n.preFilters.fields;r.filterModel=e,r.itemsTree=d.createItemsTree({treeId:r.ITEMS_TREE_DOM_ID,providerId:r.TREE_DATA_PROVIDER,templateDomId:"list_responsive_collapsible_fields",selectOnMousedown:!u(),dragPattern:".leaf .draggable"}),r.itemsTree.showTree(10,function(){r.initTreeEvents(),t()})},initTreeEvents:function(){l.each(this.filterModel.treeEventFactory,function(e,t){this.itemsTree.observe(t,l.bind(e,this.filterModel))},this)}};n.preFilters;d.chooser.FilterEditor=p(d.FilterEditor.prototype),d.chooser.FilterEditorPrototype={initTemplate:function(){d.chooser.FilterEditor.initTemplate.call(this),this.lockStatusElement=this.editorTemplate.down(".editable")},fillinTemplate:function(){this.lockStatusElement.setValue(!!this.getOriginalValue().locked),d.chooser.FilterEditor.fillinTemplate.call(this)},getValue:function(){var e=d.chooser.FilterEditor.getValue.call(this);return e.locked=!!this.lockStatusElement.getValue(),e}},Object.extend(d.FilterEditor.prototype,d.chooser.FilterEditorPrototype),Object.extend(d.NumberFilterEditor.prototype,d.chooser.FilterEditorPrototype),Object.extend(d.StringFilterEditor.prototype,d.chooser.FilterEditorPrototype),Object.extend(d.DateFilterEditor.prototype,d.chooser.FilterEditorPrototype),Object.extend(d.BooleanFilterEditor.prototype,d.chooser.FilterEditorPrototype),d.FilterModelController.addMethod("addFieldFilter",function(e){var t=e.collect(function(e){return new d.FilterItem({node:e})}),r=t.first();r.type===t[1].type&&(r.initFieldFilterItem(t[1]),this.addFilter(r))}),void 0===e&&document.observe("dom:loaded",n.initialize.bind(n)),r.exports=d});