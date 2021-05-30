/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!AttributesBundle","../../serverSettingsCommon/enum/confirmDialogTypesEnum","runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog"],function(t,e,i){var n=t("underscore"),o=t("bundle!AttributesBundle"),r=t("../../serverSettingsCommon/enum/confirmDialogTypesEnum"),m=t("runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog"),s={},u={title:o["attributes.confirm.dialog.title"]};s[r.DELETE_CONFIRM]=u,s[r.NAME_CONFIRM]={title:o["attributes.confirm.dialog.title"],text:o["attributes.confirm.name.dialog.text"]},s[r.CANCEL_CONFIRM]={title:o["attributes.confirm.dialog.title"],text:o["attributes.confirm.cancel.dialog.text.custom"]},s[r.PERMISSION_CONFIRM]=u,s[r.EDIT_CONFIRM]=n.extend({},{text:o["attributes.confirm.edit.dialog.text"]},u),i.exports=function(t){return s[t]&&new m(s[t])}});