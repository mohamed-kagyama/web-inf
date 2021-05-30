/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./enum/validationStateNameEnum"],function(e,i,t){var o=e("underscore"),n=e("./enum/validationStateNameEnum"),a=function(e){this.initialize(e)};o.extend(a.prototype,{initialize:function(e){this.saveDialogModel=e.saveDialogModel},enter:function(e,i){this.saveDialogModel.set("saveDialogProperties",e.saveDialogProperties),i.enter(n.SAVE_DOMAIN_WITH_SAVE_DIALOG_STATE,e)}}),t.exports=a});