/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define("runtime_dependencies/jrs-ui/src/resource/resource.analysisConnection",["require","exports","module","prototype","./resource.base","../util/utils.common","../components/components.pickers","../core/core.ajax","../core/core.ajax.utils","../components/components.dialogs","jquery"],function(e,t,i){var n=e("prototype"),s=n.$,o=e("./resource.base"),a=e("../util/utils.common"),r=a.ValidationModule,c=e("../components/components.pickers"),l=e("../core/core.ajax"),d=l.ajaxTargettedUpdate,_=e("../core/core.ajax.utils"),u=_.baseErrorHandler,h=e("../components/components.dialogs"),m=e("jquery"),I={TYPE_ID:"analysisConnection.type",LABEL_ID:"connectionLabel",RESOURCE_ID_ID:"connectionName",DESCRIPTION_ID:"connectionDescription",RESOURCE_INPUT_ID:"resourceUri",BROWSE_BUTTON_ID:"browser_button",TREE_ID:"folderTreeRepoLocation",FOLDERS_TREE_DATA_PROVIDER_ID:"repositoryExplorerTreeFoldersProvider",XMLA_CATALOG_ID:"xmlaCatalog",XMLA_DATA_SOURCE_ID:"xmlaDatasource",XMLA_CONNECTION_URI_ID:"xmlaConnectionUri",TEST_BUTTON_ID:"testXMLAConnection",NEXT_BUTTON_ID:"next",DONE_BUTTON_ID:"done",CHANGE_TYPE_BUTTON_ID:"changeCombo",_canGenerateId:!0,initialize:function(e){this._form=s(document.body).select("form")[0],this._type=s(this.TYPE_ID),this._label=s(this.LABEL_ID),this._resourceId=s(this.RESOURCE_ID_ID),this._description=s(this.DESCRIPTION_ID);var t=this._type.getValue();"olapXmlaCon"==t&&(this._xmlaCatalog=s(this.XMLA_CATALOG_ID),this._xmlaDataSource=s(this.XMLA_DATA_SOURCE_ID),this._xmlaConnectionUri=s(this.XMLA_CONNECTION_URI_ID)),this._nextButton=s(this.NEXT_BUTTON_ID),this._doneButton=s(this.DONE_BUTTON_ID),this._testButton=s(this.TEST_BUTTON_ID),this._changeTypeButton=s(this.CHANGE_TYPE_BUTTON_ID),this._isEditMode=e.isEditMode,this._label.validator=o.labelValidator.bind(this),this._resourceId.validator=o.resourceIdValidator.bind(this),this._description.validator=o.descriptionValidator.bind(this),"olapXmlaCon"==t&&(this._xmlaCatalog.validator=this._xmlaCatalogValidator.bind(this),this._xmlaDataSource.validator=this._xmlaDataSourceValidator.bind(this),this._xmlaConnectionUri.validator=this._xmlaConnectionUriValidator.bind(this)),this._initResourcePicker(),this._initEvents()},_initResourcePicker:function(){new c.FileSelector({treeId:this.TREE_ID,providerId:this.FOLDERS_TREE_DATA_PROVIDER_ID,uriTextboxId:this.RESOURCE_INPUT_ID,browseButtonId:this.BROWSE_BUTTON_ID,title:o.messages["resource.SaveToFolder.Title"]})},_initEvents:function(){this._type.observe("change",function(){this._changeTypeButton.click()}.bindAsEventListener(this));var e=function(e){this._isDataValid()||e.stop()}.bindAsEventListener(this),t=function(e){this._isDataValid()?this.testXMLAConnection():e.stop()}.bindAsEventListener(this);this._nextButton.observe("click",e),this._doneButton.observe("click",e),this._testButton&&this._testButton.observe("click",t),this._form.observe("keyup",function(e){var t=e.element();[this._label,this._resourceId,this._description,this._xmlaCatalog,this._xmlaDataSource,this._xmlaConnectionUri].include(t)&&(r.validate(o.getValidationEntries([t])),t==this._resourceId&&this._resourceId.getValue()!=o.generateResourceId(this._label.getValue())&&(this._canGenerateId=!1),t==this._label&&!this._isEditMode&&this._canGenerateId&&(this._resourceId.setValue(o.generateResourceId(this._label.getValue())),r.validate(o.getValidationEntries([this._resourceId]))))}.bindAsEventListener(this))},testXMLAConnection:function(){var e=this._testButton,t=m(this._form),i=t.serializeArray();i.push({name:"_eventId_testXMLAConnection",value:""}),d(t.attr("action"),{postData:m.param(i),fillLocation:"ajaxbuffer",callback:function(t){var i=m(t).text();try{var n=JSON.parse(i);"OK"==n.status?r.showSuccess(e,o.messages.connectionStatePassed):r.showError(e,n.message,n.details)}catch(e){h.systemConfirm.show(i)}},errorHandler:u,hideLoader:!1})},_isDataValid:function(){var e=[this._label,this._resourceId,this._description];return"olapXmlaCon"==this._type.getValue()&&(e.push(this._xmlaCatalog),e.push(this._xmlaDataSource),e.push(this._xmlaConnectionUri)),r.validate(o.getValidationEntries(e))},_xmlaCatalogValidator:function(e){var t=!0,i="";return e.blank()&&(i=o.messages.catalogIsEmpty,t=!1),{isValid:t,errorMessage:i}},_xmlaDataSourceValidator:function(e){var t=!0,i="";return e.blank()&&(i=o.messages.dataSourceIsEmpty,t=!1),{isValid:t,errorMessage:i}},_xmlaConnectionUriValidator:function(e){var t=!0,i="";return e.blank()&&(i=o.messages.uriIsEmpty,t=!1),{isValid:t,errorMessage:i}}};void 0===e&&document.observe("dom:loaded",function(){I.initialize(window.localContext.initOptions)}),i.exports=I}),define("runtime_dependencies/jrs-ui/src/addResource/analysisClientConnection/addAnalysisClientConnectionMain",["require","exports","module","requirejs-domready","../../resource/resource.analysisConnection","underscore","runtime_dependencies/js-sdk/src/jrs.configs","../../resource/resource.base","../../util/utils.common"],function(e,t,i){var n=e("requirejs-domready"),s=e("../../resource/resource.analysisConnection"),o=e("underscore"),a=e("runtime_dependencies/js-sdk/src/jrs.configs"),r=e("../../resource/resource.base"),c=e("../../util/utils.common"),l=c.isIPad;n(function(){var e=a.connectionType.localContext.initOptions;o.extend(window.localContext,a.connectionType.localContext),o.extend(r.messages,a.connectionType.resource.messages),s.initialize(e),l()&&r.initSwipeScroll()})}),define("addResource/analysisClientConnection/addAnalysisClientConnectionMain",["require","exports","module","runtime_dependencies/jrs-ui/src/addResource/analysisClientConnection/addAnalysisClientConnectionMain"],function(e,t,i){e("runtime_dependencies/jrs-ui/src/addResource/analysisClientConnection/addAnalysisClientConnectionMain")});