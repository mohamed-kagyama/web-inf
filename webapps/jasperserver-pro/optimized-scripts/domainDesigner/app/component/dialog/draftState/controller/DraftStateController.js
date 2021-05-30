/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","../enum/confirmationMessageByDraftStateTypeEnum","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(t,n,i){var e=t("underscore"),o=t("backbone"),s=t("../enum/confirmationMessageByDraftStateTypeEnum"),a=t("bundle!DomainDesignerBundle"),r=t("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),c=r.create(a),u=function(t){this._initialize(t)};e.extend(u.prototype,o.Events,{_initialize:function(t){this.draftStateEventBus=t.draftStateEventBus,this.confirmationDialog=t.confirmationDialog,this._initEvents()},_initEvents:function(){this.listenTo(this.draftStateEventBus,"dispatcherActionIntercepted",this._onDispatcherActionIntercepted)},_onDispatcherActionIntercepted:function(t){this.listenTo(this.confirmationDialog,"button:yes",e.bind(this._onConfirmationDialogYesButtonClick,this,t)),this.listenTo(this.confirmationDialog,"button:no",this._stopListeningToConfirmationDialog);var n=this._getInterceptedActionWarningMessage(t.draftStateTypes);this.confirmationDialog.setContent(n),this.confirmationDialog.open()},_getInterceptedActionWarningMessage:function(t){var n=s[e.first(t)];return c(n)},_onConfirmationDialogYesButtonClick:function(t){this._stopListeningToConfirmationDialog(),this.draftStateEventBus.trigger("allowActionExecution",t)},_stopListeningToConfirmationDialog:function(){this.stopListening(this.confirmationDialog)}}),i.exports=u});