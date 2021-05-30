/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","runtime_dependencies/js-sdk/src/common/component/dialog/Dialog","text!./template/devToolsDialogTemplate.htm"],function(t,e,o){var i=t("underscore"),n=t("runtime_dependencies/js-sdk/src/common/component/dialog/Dialog"),l=t("text!./template/devToolsDialogTemplate.htm");o.exports=n.extend({constructor:function(){n.prototype.constructor.call(this,{modal:!1,resizable:!0,minWidth:350,minHeight:400,title:"Dev Tools",content:i.template(l)(),buttons:[{label:"Set state",action:"update",primary:!0},{label:"Cancel",action:"cancel",primary:!1}]}),this.editorTextArea=this.$el.find(".jr-jDevTools-editor-textArea")},initialize:function(t){this.listenTo(this,"button:cancel",this._onCancelButtonClick),n.prototype.initialize.apply(this,arguments)},open:function(t){this.editorTextArea.val(JSON.stringify(t)),n.prototype.open.call(this)},getState:function(){return JSON.parse(this.editorTextArea.val())},close:function(){this.editorTextArea.val(""),n.prototype.close.call(this)},_onCancelButtonClick:function(){this.close()}})});