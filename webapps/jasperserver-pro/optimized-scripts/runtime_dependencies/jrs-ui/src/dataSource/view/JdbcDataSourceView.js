/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../view/BaseDataSourceView","../model/JdbcDataSourceModel","../model/JdbcDriverModel","../view/dialog/UploadJdbcDriverDialog","text!../template/jdbcSpecificTemplate.htm","text!../template/jdbcCustomFieldTemplate.htm","../../core/core.events.bis","bundle!jasperserver_messages","text!../template/jdbcfileLocationTemplate.htm","../../resource/resource.locate","text!runtime_dependencies/js-sdk/src/common/templates/components.pickers.htm","jquery"],function(e,t,r){var i=e("underscore"),a=e("../view/BaseDataSourceView"),o=e("../model/JdbcDataSourceModel"),s=e("../model/JdbcDriverModel"),d=e("../view/dialog/UploadJdbcDriverDialog"),l=e("text!../template/jdbcSpecificTemplate.htm"),n=e("text!../template/jdbcCustomFieldTemplate.htm"),c=e("../../core/core.events.bis"),v=e("bundle!jasperserver_messages"),u=e("text!../template/jdbcfileLocationTemplate.htm"),h=e("../../resource/resource.locate"),p=e("text!runtime_dependencies/js-sdk/src/common/templates/components.pickers.htm"),m=e("jquery");r.exports=a.extend({PAGE_TITLE_NEW_MESSAGE_CODE:"resource.datasource.jdbc.page.title.new",PAGE_TITLE_EDIT_MESSAGE_CODE:"resource.datasource.jdbc.page.title.edit",modelConstructor:o,events:function(){var e={};return i.extend(e,a.prototype.events,{"keyup input[type='text'][name!='driverClass'], input[type='password'], textarea":"updateModelProperty","change input[type='text'][name!='driverClass'], input[type='password'], textarea, select":"updateModelProperty","keyup input[type='text'][name='driverClass']":"manuallySetDriverClass","change input[type='text'][name='driverClass']":"manuallySetDriverClass","click #driverUploadButton":"uploadDriver"}),e}(),initialize:function(e){a.prototype.initialize.apply(this,arguments),this.listenTo(this.model,"connectionUrlUpdate",this.updateConnectionUrl),this.listenTo(this.model,"customAttributesUpdate",this.updateCustomAttributes),this.listenTo(this.model,"driverClassChange",this.changeDriver),this.listenTo(this.model.drivers,"change",this.updateDriverOption),this.listenTo(this.model.drivers,"add",this.addDriverOption)},updateDriverOption:function(e){var t=this.$("select[name='selectedDriverClass'] option[value='"+e.get("jdbcDriverClass")+"']"),r=e.get("label")+" ("+e.get("jdbcDriverClass")+")";e.get("available")||(r=v["resource.dataSource.jdbc.driverMissing"]+" "+r),t.text(r),this.model.getCurrentDriver()===e&&this.changeUploadDriverButtonState()},addDriverOption:function(e){if(!e.isOtherDriver){var t=this.$("select[name='selectedDriverClass'] option[value='"+s.OTHER_DRIVER+"']"),r=e.get("jdbcDriverClass"),a=this;e.get("available")||(r=v["resource.dataSource.jdbc.driverMissing"]+" "+r),t.before("<option value='"+e.get("jdbcDriverClass")+"'>"+r+"</option>"),i.defer(function(){a.$("select[name='selectedDriverClass']").val(e.get("jdbcDriverClass")),a.model.trigger("change:driverClass")})}},manuallySetDriverClass:function(){var e=this.$("input[type='text'][name='driverClass']").val(),t={driverClass:e};this.model.set(t,{silent:!0}),this.model.validate(t),this.changeUploadDriverButtonState()},updateConnectionUrl:function(){this.$("input[name='connectionUrl']").val(this.model.get("connectionUrl"));var e=this.model.getCurrentDriver();e.isOtherDriver()||e.isUploadedDriver()||this.model.validate({connectionUrl:this.model.get("connectionUrl")})},updateCustomAttributes:function(){var e=this,t=this.model.getCurrentDriver().getCustomAttributes();i.each(t,function(t){e.$("input[name='"+t+"']").val(e.model.get(t))});var r=this.model.pick(t);this.model.validate(r)},changeDriver:function(){this.renderDriverCustomAttributeFields(),this.changeUploadDriverButtonState()},changeUploadDriverButtonState:function(){var e=this.model.getCurrentDriver(),t=this.$("#driverUploadButton");c.enable(t[0]);var r=e.get("available")?v["resource.dataSource.jdbc.upload.editDriverButton"]:v["resource.dataSource.jdbc.upload.addDriverButton"];t.find(".wrap").text(r)},uploadDriver:function(){this.model.drivers.driverUploadEnabled&&this.model.get("driverClass")?(this.fieldIsValid(this,"driverClass","name"),this.driverUploadDialog&&this.stopListening(this.driverUploadDialog),delete this.driverUploadDialog,this.initDriverUploadDialog(),this.driverUploadDialog.show()):this.fieldIsInvalid(this,"driverClass",v["ReportDataSourceValidator.error.not.empty.reportDataSource.driverClass"],"name")},initDriverUploadDialog:function(){this.driverUploadDialog=new d({driverAvailable:this.model.getCurrentDriver().get("available"),driverClass:this.model.get("isOtherDriver")?this.model.get("driverClass"):this.model.getCurrentDriver().get("jdbcDriverClass")}),this.listenTo(this.driverUploadDialog,"driverUpload",this._onDriverUploadFinished)},_onDriverUploadFinished:function(e){var t=this;this.model.fetchDrivers().then(function(){t.model.drivers.markDriverAsAvailable(e.jdbcDriverClass),i.defer(function(){t.model.validate(),t.render()})})},render:function(){return this.$el.empty(),this.renderJdbcSpecificSection(),this.renderTimezoneSection(),this.renderTestConnectionSection(),this},templateData:function(){var e=a.prototype.templateData.apply(this,arguments);return i.extend(e,{drivers:this.model.drivers.toJSON(),otherDriverValue:s.OTHER_DRIVER,driverUploadEnabled:this.model.drivers.driverUploadEnabled}),e},renderJdbcSpecificSection:function(){this.$el.append(i.template(l,this.templateData())),this.renderDriverCustomAttributeFields(),this.changeUploadDriverButtonState()},renderDriverCustomAttributeFields:function(){var e=this,t="";if(this.model.get("isOtherDriver"))t+=i.template(n,{hint:v["resource.dataSource.jdbc.hint1"],label:v["resource.dataSource.jdbc.driver"],name:"driverClass",title:v["resource.analysisConnection.driver"],value:this.model.get("driverClass"),i18n:v});else{var r=this.model.getCurrentDriver().getCustomAttributes();i.each(r,function(r){t+=i.template(n,{hint:"",label:v["resource.dataSource.jdbc."+r],name:r,title:v["resource.dataSource.jdbc.requiredTitle"].replace("{0}",v["resource.dataSource.jdbc."+r].toLowerCase()),value:e.model.get(r),i18n:v})})}this.$("[name=jdbcSpecificFieldsContainer]").html(t);var a=this.isEditMode&&!this.model.changed.selectedDriverClass?this.options.dataSource.driverClass:this.model.changed.selectedDriverClass;a&&-1!==a.indexOf("GoogleBigQueryDriver")&&this.renderFileLocationSection()},remove:function(){this.driverUploadDialog&&this.driverUploadDialog.remove(),a.prototype.remove.apply(this,arguments)},renderFileLocationSection:function(){m(i.template(u,{i18n:v})).insertAfter("[name='oAuthPvtKeyPath']"),this.browseButton=h.initialize({i18n:v,template:p,resourceInput:this.$el.find("[name=oAuthPvtKeyPath]")[0],browseButton:this.$el.find("[name=oathPrivateKeyBrowserButton]")[0],providerId:"fileResourceBaseTreeDataProvider",dialogTitle:v["resource.Add.Files.Title"],selectLeavesOnly:!0,onChange:i.bind(function(e){this.model.set("oAuthPvtKeyPath",e),this.model.validate({oAuthPvtKeyPath:e})},this)})}})});