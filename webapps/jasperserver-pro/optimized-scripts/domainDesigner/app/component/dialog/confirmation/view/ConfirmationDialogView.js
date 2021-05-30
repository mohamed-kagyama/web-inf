/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog","text!../template/confirmDialogTemplate.htm"],function(t,e,o){var a=t("underscore"),n=t("runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog"),r=t("text!../template/confirmDialogTemplate.htm");o.exports=n.extend({constructor:function(t){t=t||{},this.dataNameAttrs=t.dataNameAttrs,t.confirmDialogTemplate=a.template(r),n.prototype.constructor.call(this,t)},render:function(){return n.prototype.render.apply(this,arguments),this.dataNameAttrs&&this.$el.attr("data-name",this.dataNameAttrs.dialogTitle),this}})});