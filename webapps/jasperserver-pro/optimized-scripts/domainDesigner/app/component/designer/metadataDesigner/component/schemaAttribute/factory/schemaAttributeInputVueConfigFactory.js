/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../common/vue/computed/i18nComputed","text!../template/schemaAttributeInputTemplate.htm"],function(t,e,u){var n=t("underscore"),r=t("../../../../../../common/vue/computed/i18nComputed"),i=t("text!../template/schemaAttributeInputTemplate.htm");u.exports={create:function(t){var e=t.metadataDesignerEventBus;return{template:i,computed:n.extend({isEditMode:function(){return Boolean(this.schemaAttributeInput.dataSourceGroupId)}},r),props:["schemaAttributeInput"],methods:{onInput:function(t){var u=t.target.value;e.trigger("input:attribute",u)},add:function(){e.trigger("add:attribute")},update:function(){e.trigger("update:attribute")},cancel:function(){e.trigger("cancel:attribute")},onEnter:function(){this.isEditMode?this.update():this.add()}}}}}});