/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!CommonBundle","bundle!ImportExportBundle","../../view/BaseWarningDialogView"],function(e,n,o){var t=e("underscore"),i=e("bundle!CommonBundle"),l=e("bundle!ImportExportBundle"),r=e("../../view/BaseWarningDialogView");o.exports=r.extend({constructor:function(e){e||(e={}),t.extend(e,{resizable:!0,title:l["import.dialog.warnings.title"],additionalCssClasses:"warnings-dialog",buttons:[{label:i["button.close"],action:"close",primary:!1}]}),r.prototype.constructor.call(this,e),this.on("button:close",t.bind(this.close,this))}})});