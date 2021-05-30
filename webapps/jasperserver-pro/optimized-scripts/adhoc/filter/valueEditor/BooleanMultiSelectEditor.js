/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BooleanSelectEditor","underscore","../enum/filterOperators"],function(e,t,o){var i=e("./BooleanSelectEditor"),l=e("underscore"),r=e("../enum/filterOperators");o.exports=i.extend({isMultiple:!0,serializeModel:function(){var e=this.getDefaultViewModel(),t=this.model.get("isAnyValue")&&this.model.get("operatorName")===r.IN,o={true:t,false:t};if(!t){var i=this.getValue();l.each(i,function(e){o[e]=!0})}return l.each(e.options,function(e){e.selected=o[e.value]||!1}),e},setValue:function(e){this.model.get("operatorName")===r.IN&&(this.model.attributes.isAnyValue=e&&2===e.length,this.model.get("isAnyValue")&&(e=[])),i.prototype.setValue.call(this,e||[])}})});