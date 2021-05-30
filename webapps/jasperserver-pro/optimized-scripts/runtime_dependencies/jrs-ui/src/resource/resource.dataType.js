/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","prototype","./resource.base","../util/utils.common"],function(e,t,i){var s=e("prototype"),a=s.$,n=e("./resource.base"),o=e("../util/utils.common"),d=o.ValidationModule,r={PAGE_ID:"addResource_dataType",DATA_TYPE_ID:"dataType.dataTypeType",LABEL_ID:"dataType.label",RESOURCE_ID_ID:"dataType.name",DESCRIPTION_ID:"dataType.description",SAVE_BUTTON_ID:"done",CHANGE_TYPE_BUTTON_ID:"changeCombo",_canGenerateId:!0,initialize:function(e){this._form=a(this.PAGE_ID).select("form")[0],this._dataType=a(this.DATA_TYPE_ID),this._label=a(this.LABEL_ID),this._resourceId=a(this.RESOURCE_ID_ID),this._description=a(this.DESCRIPTION_ID),this._saveButton=a(this.SAVE_BUTTON_ID),this._changeTypeButton=a(this.CHANGE_TYPE_BUTTON_ID),this._isEditMode=e.isEditMode,this._label.validator=n.labelValidator.bind(this),this._resourceId.validator=n.resourceIdValidator.bind(this),this._description.validator=n.descriptionValidator.bind(this),this._initEvents()},_initEvents:function(){this._dataType.observe("change",function(){this._changeTypeButton.click()}.bindAsEventListener(this)),this._saveButton.observe("click",function(e){this._isDataValid()||e.stop()}.bindAsEventListener(this)),this._form.observe("keyup",function(e){var t=e.element();[this._label,this._resourceId,this._description].include(t)&&(d.validate(n.getValidationEntries([t])),t==this._resourceId&&this._resourceId.getValue()!=n.generateResourceId(this._label.getValue())&&(this._canGenerateId=!1),t==this._label&&!this._isEditMode&&this._canGenerateId&&(this._resourceId.setValue(n.generateResourceId(this._label.getValue())),d.validate(n.getValidationEntries([this._resourceId]))))}.bindAsEventListener(this))},_isDataValid:function(){var e=[this._label,this._resourceId,this._description];return d.validate(n.getValidationEntries(e))}};void 0===e&&document.observe("dom:loaded",function(){r.initialize(window.localContext.initOptions)}),i.exports=r});