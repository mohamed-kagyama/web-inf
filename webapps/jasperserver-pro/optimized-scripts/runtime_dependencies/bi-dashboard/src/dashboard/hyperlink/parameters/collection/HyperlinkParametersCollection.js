/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../model/HyperlinkParameterModel","backbone"],function(i,e,t){var n=i("underscore"),a=i("../model/HyperlinkParameterModel"),r=i("backbone"),d=r.Collection.extend({model:a,validationMessages:{DUPLICATE_MODEL_ADD:"DUPLICATE_MODEL_ADD",DUPLICATE_MODEL_EDIT:"DUPLICATE_MODEL_EDIT"},add:function(i,e){if(this._validateSingleModelAddition(i,e))return r.Collection.prototype.add.apply(this,arguments)},_validateSingleModelAddition:function(i,e){var t=!0;if(!n.isArray(i)){var a=this.find(function(e){return e===i}),r=this.filter(function(e){return e.id===i.id});a||!(r.length>0)||e&&e.silent?!(a&&r.length>1)||e&&e.silent||(t=!1,this.trigger("validation:invalid",this,i,{message:this.validationMessages.DUPLICATE_MODEL_EDIT})):(t=!1,this.trigger("validation:invalid",this,i,{message:this.validationMessages.DUPLICATE_MODEL_ADD})),!t||e&&e.silent||this.trigger("validation:valid",this,i)}return t}});t.exports=d});