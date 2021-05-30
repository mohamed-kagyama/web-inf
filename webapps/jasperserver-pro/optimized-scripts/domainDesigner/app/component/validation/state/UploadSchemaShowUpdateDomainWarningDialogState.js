/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","./enum/validationStateNameEnum"],function(i,t,a){var n=i("underscore"),e=i("backbone"),o=i("./enum/validationStateNameEnum"),r=function(i){this.initialize(i)};n.extend(r.prototype,e.Events,{initialize:function(i){this.validationEventBus=i.validationEventBus,this.validationWarningDialog=i.validationWarningDialog,this.validationWarningDialogStore=i.validationWarningDialogStore,this.updateSavedSchemaWarningDialogStateFactory=i.updateSavedSchemaWarningDialogStateFactory},enter:function(i,t){var a=this.updateSavedSchemaWarningDialogStateFactory.create();this.listenTo(this.validationEventBus,a.confirmEvent,n.bind(this._onConfirmSchemaUpdate,this,i,t)),this.listenTo(this.validationEventBus,a.rejectEvent,this._cleanUpAfterDialogShow),this.validationWarningDialogStore.set(a),this.validationWarningDialog.open()},_cleanUpAfterDialogShow:function(){this.stopListening(this.validationEventBus),this.validationWarningDialog.close()},_onConfirmSchemaUpdate:function(i,t){this._cleanUpAfterDialogShow(),t.enter(o.UPLOAD_SCHEMA_CHECK_SCHEMA_TYPE_STATE,i)}}),a.exports=r});