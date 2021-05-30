/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./AbstractValueEditor","underscore"],function(e,t,i){var n=e("./AbstractValueEditor"),l=e("underscore");i.exports=n.extend({inputSelector:"select",isMultiple:!1,getDefaultViewModel:function(){return{multiple:this.isMultiple,options:[{value:"false",label:"false"},{value:"true",label:"true"}]}},serializeModel:function(){var e,t=this.getDefaultViewModel(),i=this.getValue()||"";return e=l.find(t.options,function(e){return e.value===i}),e&&(e.selected=!0),t},events:function(){var e={};return e["change "+this.inputSelector]="onChange",e},onChange:function(){var e=this.$(this.inputSelector).val(),t=this.convert(e);this.setValue(t)}})});