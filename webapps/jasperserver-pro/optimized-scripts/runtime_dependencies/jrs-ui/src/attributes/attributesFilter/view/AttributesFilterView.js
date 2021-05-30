/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","text!../../../attributes/attributesFilter/template/attributesFilterViewTemplate.htm","backbone.marionette"],function(e,t,i){var r=e("underscore"),n=e("text!../../../attributes/attributesFilter/template/attributesFilterViewTemplate.htm"),a=e("backbone.marionette"),l=a.ItemView.extend({template:function(e){return r.template(n)({model:e})},onRender:function(){this.$el=this.$el.children(),this.$el.unwrap(),this.setElement(this.$el)}});i.exports=l});