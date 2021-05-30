/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","./enum/validationStateNameEnum"],function(e,i,s){var n=e("underscore"),o=e("backbone"),t=e("./enum/validationStateNameEnum"),a=function(e){this.initialize(e)};n.extend(a.prototype,o.Events,{initialize:function(e){this.saveDialog=e.saveDialog},enter:function(e,i){this._subscribeToDialogEvents(e,i),e.useSaveMethod?(delete e.useSaveMethod,this.saveDialog[e.saveMethod]()):this.saveDialog.saveModelOnServer()},_subscribeToDialogEvents:function(e,i){this.listenTo(this.saveDialog,"save:validation:error",n.bind(this._onSaveValidationError,this,e,i)),this.listenTo(this.saveDialog,"save",n.bind(this._onSuccessfullySavedOnServer,this,e,i))},_closeDialogAnUnsubscribe:function(){this.saveDialog.close(),this.stopListening(this.saveDialog,"save:validation:error"),this.stopListening(this.saveDialog,"save")},_onSaveValidationError:function(e,i,s,n){this._closeDialogAnUnsubscribe(),e.xhr=s,e.saveDialogProperties=n,i.enter(t.SAVE_DOMAIN_VALIDATION_ERROR_STATE,e)},_onSuccessfullySavedOnServer:function(e,i,s,n){this._closeDialogAnUnsubscribe(),e.response=n,i.enter(t.SAVE_DOMAIN_IS_SUCCESSFUL_STATE,e)}}),s.exports=a});