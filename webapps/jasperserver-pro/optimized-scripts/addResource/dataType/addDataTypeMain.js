/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define("runtime_dependencies/jrs-ui/src/resource/resource.dataType",["require","exports","module","prototype","./resource.base","../util/utils.common"],function(e,t,i){var n=e("prototype"),a=n.$,s=e("./resource.base"),r=e("../util/utils.common"),o=r.ValidationModule,d={PAGE_ID:"addResource_dataType",DATA_TYPE_ID:"dataType.dataTypeType",LABEL_ID:"dataType.label",RESOURCE_ID_ID:"dataType.name",DESCRIPTION_ID:"dataType.description",SAVE_BUTTON_ID:"done",CHANGE_TYPE_BUTTON_ID:"changeCombo",_canGenerateId:!0,initialize:function(e){this._form=a(this.PAGE_ID).select("form")[0],this._dataType=a(this.DATA_TYPE_ID),this._label=a(this.LABEL_ID),this._resourceId=a(this.RESOURCE_ID_ID),this._description=a(this.DESCRIPTION_ID),this._saveButton=a(this.SAVE_BUTTON_ID),this._changeTypeButton=a(this.CHANGE_TYPE_BUTTON_ID),this._isEditMode=e.isEditMode,this._label.validator=s.labelValidator.bind(this),this._resourceId.validator=s.resourceIdValidator.bind(this),this._description.validator=s.descriptionValidator.bind(this),this._initEvents()},_initEvents:function(){this._dataType.observe("change",function(){this._changeTypeButton.click()}.bindAsEventListener(this)),this._saveButton.observe("click",function(e){this._isDataValid()||e.stop()}.bindAsEventListener(this)),this._form.observe("keyup",function(e){var t=e.element();[this._label,this._resourceId,this._description].include(t)&&(o.validate(s.getValidationEntries([t])),t==this._resourceId&&this._resourceId.getValue()!=s.generateResourceId(this._label.getValue())&&(this._canGenerateId=!1),t==this._label&&!this._isEditMode&&this._canGenerateId&&(this._resourceId.setValue(s.generateResourceId(this._label.getValue())),o.validate(s.getValidationEntries([this._resourceId]))))}.bindAsEventListener(this))},_isDataValid:function(){var e=[this._label,this._resourceId,this._description];return o.validate(s.getValidationEntries(e))}};void 0===e&&document.observe("dom:loaded",function(){d.initialize(window.localContext.initOptions)}),i.exports=d}),define("runtime_dependencies/jrs-ui/src/components/components.calendarInput",["require","exports","module","jquery","underscore","settings!dateTimeSettings","../util/utils.common","../config/dateAndTimeSettings"],function(e,t,i){var n=e("jquery"),a=e("underscore"),s=e("settings!dateTimeSettings"),r=e("../util/utils.common"),o=r.cancelEventBubbling;e("../config/dateAndTimeSettings");var d=function(e){this.container=null,void 0!==e.container&&(this.container=void 0===e.container.jquery?n(e.container):e.container),this.name=e.name,this.id=e.name.replace(".","_"),this.value=e.value,this.onChange=e.onchange||null,this.isReadOnly=void 0!==e.readOnly&&e.readOnly,this.hasDate=void 0!==e.date&&""!==e.date&&"true"===e.date,this.hasTime=void 0!==e.time&&""!==e.time&&"true"===e.time,this.pickerOptions=a.extend({},this.defaultPickerOptions),this.hasDate&&a.extend(this.pickerOptions,s.datepicker),this.hasTime&&a.extend(this.pickerOptions,s.timepicker),void 0!==e.picker&&a.isObject(e.picker)&&a.extend(this.pickerOptions,e.picker),this.field=null};d.prototype.defaultPickerOptions={showOn:"button",buttonText:"",changeYear:!0,changeMonth:!0,showButtonPanel:!0,onChangeMonthYear:null,beforeShow:n.datepicker.movePickerRelativelyToTriggerIcon},d.prototype.create=function(){var e=n("<input type='text'/>").attr({name:this.name,id:this.id,value:this.value});if(e.on("mousedown",o),this.onChange&&e.on("change",this.onChange),this.isReadOnly&&e.attr("disabled","disabled"),this.field=e,this.container.append(this.field),!this.isReadOnly){var t=this.hasDate?"date":"";t+=this.hasTime?"time":"",t+="picker",n.fn[t].call(e,this.pickerOptions).next().addClass("button").addClass("picker"),e[0].getValue=function(){return n(this).val()}}},i.exports=d}),define("runtime_dependencies/jrs-ui/src/addResource/dataType/addDataTypeMain",["require","exports","module","requirejs-domready","../../resource/resource.dataType","underscore","jquery","../../components/components.calendarInput","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../util/utils.common"],function(e,t,i){function n(){return r.indexOf([3,4,5],c.addDataType.type)>-1}var a=e("requirejs-domready"),s=e("../../resource/resource.dataType"),r=e("underscore"),o=e("jquery"),d=e("../../components/components.calendarInput"),c=e("runtime_dependencies/js-sdk/src/jrs.configs"),u=e("../../resource/resource.base"),l=e("../../util/utils.common"),h=l.isIPad;a(function(){var e=c.addDataType.localContext.initOptions;if(r.extend(window.localContext,c.addDataType.localContext),r.extend(u.messages,c.addDataType.resource.messages),n()){var t=new d(c.addDataType.minValueText);t.container=o("label.minPicker"),t.create();var i=new d(c.addDataType.maxValueText);i.container=o("label.maxPicker"),i.create()}s.initialize(e),h()&&u.initSwipeScroll(),o("body").addClass("jr")})}),define("addResource/dataType/addDataTypeMain",["require","exports","module","runtime_dependencies/jrs-ui/src/addResource/dataType/addDataTypeMain"],function(e,t,i){e("runtime_dependencies/jrs-ui/src/addResource/dataType/addDataTypeMain")});