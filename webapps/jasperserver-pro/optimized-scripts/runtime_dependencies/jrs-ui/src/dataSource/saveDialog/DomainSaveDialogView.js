/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","bundle!all","runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryResourceModel","./BaseSaveDialogView","text!runtime_dependencies/js-sdk/src/common/templates/standardConfirm.htm","text!./template/domainSaveDialogTemplate.htm","../../components/components.dialogs"],function(e,o,t){var n=e("underscore"),a=e("jquery"),i=e("bundle!all"),s=e("runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryResourceModel"),r=e("./BaseSaveDialogView"),l=e("text!runtime_dependencies/js-sdk/src/common/templates/standardConfirm.htm"),c=e("text!./template/domainSaveDialogTemplate.htm"),d=e("../../components/components.dialogs");t.exports=r.extend({saveDialogTemplate:c,constructor:function(e){e||(e={}),this.options=e,r.prototype.constructor.call(this,e)},initialize:function(){this.preSelectedFolder=s.getParentFolderFromUri(this.options.dataSource.uri)||"/",r.prototype.initialize.apply(this,arguments),this.listenTo(this.model,"change:openInAdHocDesigner",this._onOpenInAdHocDesignerChange)},extendModel:function(e){var o,t,a,l=r.prototype.extendModel.call(this,e),c=this;return l.set("openInAdHocDesigner",!1),o=e.dataSource.label,t=o+" Domain",a=s.generateResourceName(t),l.set("label",t),l.set("name",a),l.validation=n.extend({},s.prototype.validation,{label:[{required:!0,msg:i["resource.datasource.saveDomainDialog.validation.not.empty.label"]},{maxLength:s.settings.LABEL_MAX_LENGTH,msg:i["resource.datasource.saveDomainDialog.validation.too.long.label"]}],name:[{required:!0,msg:i["resource.datasource.saveDomainDialog.validation.not.empty.name"]},{maxLength:s.settings.NAME_MAX_LENGTH,msg:i["resource.datasource.saveDomainDialog.validation.too.long.name"]},{doesNotContainCharacters:s.settings.NAME_NOT_SUPPORTED_SYMBOLS,msg:i["resource.datasource.saveDomainDialog.validation.invalid.chars.name"]}],description:[{required:!1},{maxLength:s.settings.DESCRIPTION_MAX_LENGTH,msg:i["resource.datasource.saveDomainDialog.validation.too.long.description"]}],parentFolderUri:[{fn:function(e){if(!c.options.skipLocation){if(n.isNull(e)||n.isUndefined(e)||n.isString(e)&&""===e)return i["resource.datasource.saveDomainDialog.validation.not.empty.parentFolderIsEmpty"];if("/"!==e.slice(0,1))return i["resource.datasource.saveDomainDialog.validation.folder.not.found"].replace("{0}",e)}}}]}),l},_onOpenInAdHocDesignerChange:function(){var e=this._getLabelForSaveButton();this.changeButtonLabel("save",i[e])},_getLabelForSaveButton:function(e){e=e||this.model;var o="resource.datasource.saveDialog.save";return e.get("openInAdHocDesigner")&&(o="resource.datasource.saveDomainDialog.saveAndOpenDesigner"),o},_onSaveDialogCancelButtonClick:function(){var e=this,o=a(l);o.find(".body").html("You are about to cancel the creation of a new domain.<br/>If You wish to create a domain in the future,<br/>You will need to go through the regular Domain Designer.<br/>The data source, however, has successfully been saved."),d.popupConfirm.show(o.get(0),!0,{okButtonSelector:"[name=buttonOK]",cancelButtonSelector:"[name=buttonCancel]"}).done(function(){e._closeDialog(),n.isFunction(e.options.success)&&e.options.success()})},performSave:function(){var e=this;this.model.save().done(function(){e._closeDialog(),n.isFunction(e.options.success)&&e.options.success()})}})});