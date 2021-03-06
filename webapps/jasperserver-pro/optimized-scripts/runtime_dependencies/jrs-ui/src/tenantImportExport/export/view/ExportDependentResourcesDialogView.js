/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!CommonBundle","bundle!ImportExportBundle","../../view/BaseWarningDialogView"],function(e,n,o){var t=e("underscore"),i=e("bundle!CommonBundle"),r=e("bundle!ImportExportBundle"),l=e("../../view/BaseWarningDialogView");o.exports=l.extend({constructor:function(e){e||(e={}),t.extend(e,{resizable:!0,buttons:[{label:r["export.button.continue"],action:"export",primary:!0},{label:i["button.cancel"],action:"cancel",primary:!1}]}),l.prototype.constructor.call(this,e),this.on("button:export",t.bind(this.close,this)),this.on("button:cancel",t.bind(this.close,this))},open:function(e){t.extend(e,{message:r["export.dialog.broken.dependencies.intro"]}),l.prototype.open.call(this,e)}})});