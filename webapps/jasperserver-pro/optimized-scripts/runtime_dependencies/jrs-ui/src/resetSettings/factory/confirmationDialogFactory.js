/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!EditSettingsBundle","../../serverSettingsCommon/enum/confirmDialogTypesEnum","runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog"],function(e,n,t){var i=e("bundle!EditSettingsBundle"),o=e("../../serverSettingsCommon/enum/confirmDialogTypesEnum"),m=e("runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog"),d={},r={title:i["editSettings.confirm.dialog.title"]};d[o.DELETE_CONFIRM]=r,d[o.CANCEL_CONFIRM]={title:i["editSettings.confirm.dialog.title"],text:i["editSettings.confirm.cancel.dialog.text.custom"]},t.exports=function(e){return d[e]&&new m(d[e])}});