/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/js-sdk/src/common/component/dialog/Dialog","underscore","bundle!CommonBundle","text!../template/loadingDialogTemplate.htm"],function(e,o,t){var n=e("runtime_dependencies/js-sdk/src/common/component/dialog/Dialog"),l=e("underscore"),d=e("bundle!CommonBundle"),a=e("text!../template/loadingDialogTemplate.htm");t.exports=n.extend({defaultTemplate:a,constructor:function(e){l.defaults(e,{contentContainer:".body > .message",title:d["dialog.overlay.title"],modal:!0}),n.call(this,e)}})});