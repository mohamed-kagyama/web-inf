/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./Dialog","text!./template/confirmDialogTemplate.htm","bundle!CommonBundle"],function(t,e,o){var i=t("underscore"),n=t("./Dialog"),l=t("text!./template/confirmDialogTemplate.htm"),a=t("bundle!CommonBundle");o.exports=n.extend({constructor:function(t){t||(t={}),this.confirmDialogTemplate=t.confirmDialogTemplate||i.template(l),n.prototype.constructor.call(this,{modal:!0,additionalCssClasses:t.additionalCssClasses||"confirmationDialog",title:t.title||a["dialog.confirm.title"],content:this.confirmDialogTemplate({text:t.text}),buttons:[{label:t.yesLabel||a["button.yes"],action:"yes",primary:!0},{label:t.noLabel||a["button.no"],action:"no",primary:!1}]})},initialize:function(){n.prototype.initialize.apply(this,arguments),this.on("button:yes",this.close),this.on("button:no",this.close)},setContent:function(t){n.prototype.setContent.call(this,this.confirmDialogTemplate({text:t}))}})});