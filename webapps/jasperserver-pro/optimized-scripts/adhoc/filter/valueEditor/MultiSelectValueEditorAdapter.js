/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./ListValueEditorAdapter","runtime_dependencies/js-sdk/src/components/multiSelect/view/MultiSelect","runtime_dependencies/js-sdk/src/components/multiSelect/dataprovider/selectedItemsDataProviderSorterFactory","runtime_dependencies/js-sdk/src/jrs.configs","../format/OlapFilterValueFormatter","../format/filterValueFormatter"],function(e,t,r){var i=e("underscore"),s=e("./ListValueEditorAdapter"),n=e("runtime_dependencies/js-sdk/src/components/multiSelect/view/MultiSelect"),o=e("runtime_dependencies/js-sdk/src/components/multiSelect/dataprovider/selectedItemsDataProviderSorterFactory"),a=e("runtime_dependencies/js-sdk/src/jrs.configs"),d=e("../format/OlapFilterValueFormatter"),l=e("../format/filterValueFormatter");r.exports=s.extend({createList:function(){return new n({getData:i.bind(this.model.dataProvider.getData,this.model),selectedListOptions:{formatLabel:this.model.isOlap?new d(this.model.get("isFirstLevelInHierarchyAll")).format:l,sortFunc:o.create(a.inputControlsConstants.NULL_SUBSTITUTION_LABEL)},resizable:!0})},render:function(){return s.prototype.render.apply(this,arguments),this._moveSizer(),this},_moveSizer:function(){var e=this.list.$el.find(".jr-mSizer");e.length&&e.detach().insertAfter(this.$(".warning"))}})});