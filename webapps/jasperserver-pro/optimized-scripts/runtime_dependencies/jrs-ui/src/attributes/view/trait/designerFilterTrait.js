/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","../../../attributes/attributesFilter/AttributesFilterCollectionView","../../../attributes/attributesFilter/view/AttributesFilterView","text!../../../attributes/attributesFilter/template/attributesFilterCollectionViewTemplate.htm"],function(t,e,i){var r=t("underscore"),l=t("backbone"),s=t("../../../attributes/attributesFilter/AttributesFilterCollectionView"),n=t("../../../attributes/attributesFilter/view/AttributesFilterView"),o=t("text!../../../attributes/attributesFilter/template/attributesFilterCollectionViewTemplate.htm");i.exports={_initFilters:function(t){this.filters=new s({collection:new l.Collection(t.filters||[]),childView:n,childViewContainer:"select",template:r.template(o),model:new l.Model({currentFilter:null}),targetCollection:this.collection})},_renderFilters:function(t){var e=this.filters.render().el;return!t&&this.$el.prepend(e)},_resetFilters:function(){this.filters.reset()}}});