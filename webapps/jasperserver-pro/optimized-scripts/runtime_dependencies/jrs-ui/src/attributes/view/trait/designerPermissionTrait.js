/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../serverSettingsCommon/enum/confirmDialogTypesEnum"],function(i,e,n){var o=i("../../../serverSettingsCommon/enum/confirmDialogTypesEnum");n.exports={_initPermissionConfirmEvents:function(){this.listenTo(this.confirmationDialogs[o.PERMISSION_CONFIRM],"button:yes",this._onPermissionConfirm),this.listenTo(this.confirmationDialogs[o.PERMISSION_CONFIRM],"button:no",this._onPermissionCancel)},_onPermissionConfirm:function(){var i;this.currentChildView?this.currentChildView.triggerModelValidation({dfd:this.validateDfD}):(i=this.model.get("changedChildView").model,i.setState("confirmedState"),i.hasChanged("inherited")&&this._resetFilters&&this._resetFilters())},_onPermissionCancel:function(){this._revertChangedModelProperty("_embedded")},_showPermissionConfirm:function(i){i._showPermissionConfirm(!1)}}});