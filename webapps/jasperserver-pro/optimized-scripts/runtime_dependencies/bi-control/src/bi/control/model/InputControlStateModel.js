/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","runtime_dependencies/js-sdk/src/common/model/BaseModel","../enum/substitutionConstants","runtime_dependencies/js-sdk/src/common/util/parse/date","runtime_dependencies/js-sdk/src/common/util/parse/time","settings!decimalFormatSymbols","runtime_dependencies/js-sdk/src/common/util/parse/NumberUtils","bundle!InputControlsValidation","../collection/InputControlOptionCollection","runtime_dependencies/js-sdk/src/common/logging/logger"],function(e,r,i){var t=e("underscore"),a=e("runtime_dependencies/js-sdk/src/common/model/BaseModel"),s=e("../enum/substitutionConstants"),n=e("runtime_dependencies/js-sdk/src/common/util/parse/date"),l=e("runtime_dependencies/js-sdk/src/common/util/parse/time"),o=e("settings!decimalFormatSymbols"),m=e("runtime_dependencies/js-sdk/src/common/util/parse/NumberUtils"),u=e("bundle!InputControlsValidation"),d=e("../collection/InputControlOptionCollection"),c=e("runtime_dependencies/js-sdk/src/common/logging/logger"),f=c.register("InputControlStateModel"),p=new m(o);i.exports=a.extend({defaults:{id:void 0,value:void 0,options:void 0,uri:void 0,error:void 0},initialize:function(){a.prototype.initialize.apply(this,arguments),this.isValue=t.isUndefined(this.get("options")),this.options=new d(this.get("options")||[]),this.on("change:options",t.bind(function(){this.options.reset(this.get("options")||[])},this)),this.on("all",f.debug,f)},validation:function(){var e,r=this.get("value"),i=this.dataType;if(!this.isValue)return this.mandatory&&!this.getData().length?u["fillParameters.error.mandatoryField"]:null;if(this.mandatory&&(""===r||t.isUndefined(r)||r===s.NULL_SUBSTITUTION_VALUE))return u["fillParameters.error.mandatoryField"];if(!i||""===r)return null;if("text"===i.type&&i.pattern&&!RegExp("^"+i.pattern+"$").test(r))return u["fillParameters.error.invalidPattern"];if("number"===i.type){if(r=p.parseNumber(r),!t.isNumber(r)||t.isNaN(r))return u["fillParameters.error.invalidValueForType"].replace("{0}","number");if(i.minValue){if(i.strictMin&&i.minValue>=r)return u["fillParameters.error.smallerThan"];if(!i.strictMin&&i.minValue>r)return u["fillParameters.error.smallerOrEqual"]}if(i.maxValue){if(i.strictMax&&i.maxValue<=r)return u["fillParameters.error.greaterThan"];if(!i.strictMax&&i.maxValue<r)return u["fillParameters.error.greaterOrEqual"]}}if("date"===i.type){var a=n.isoDateToLocalizedDate(r);if(!n.isDate(a)&&!n.isRelativeDate(r))return u["fillParameters.error.invalidValueForType"].replace("{0}","Date");if(i.minValue)if(e=n.compareDates(n.isoDateToLocalizedDate(i.minValue.substr(0,10)),a),i.strictMin){if(-1!==e)return u["fillParameters.error.smallerThan"]}else if(-1!==e&&0!==e)return u["fillParameters.error.smallerOrEqual"];if(i.maxValue)if(e=n.compareDates(n.isoDateToLocalizedDate(i.maxValue.substr(0,10)),a),i.strictMax){if(1!==e)return u["fillParameters.error.greaterThan"]}else if(1!==e&&0!==e)return u["fillParameters.error.greaterOrEqual"]}if("time"===i.type){var o=n.isoTimeToLocalizedTime(r);if(!l.isTime(o))return u["fillParameters.error.invalidValueForType"].replace("{0}","Time");if(i.minValue)if(e=l.compareTimes(n.isoTimeToLocalizedTime(i.minValue),o),i.strictMin){if(-1!==e)return u["fillParameters.error.smallerThan"]}else if(-1!==e&&0!==e)return u["fillParameters.error.smallerOrEqual"];if(i.maxValue)if(e=l.compareTimes(n.isoTimeToLocalizedTime(i.maxValue),o),i.strictMax){if(1!==e)return u["fillParameters.error.greaterThan"]}else if(1!==e&&0!==e)return u["fillParameters.error.greaterOrEqual"]}if("datetime"===i.type){var m=n.isoTimestampToLocalizedTimestamp(r);if(!n.isTimestamp(m)&&!n.isRelativeTimestamp(r))return u["fillParameters.error.invalidValueForType"].replace("{0}","DateTime");if(i.minValue)if(e=n.compareTimestamps(n.isoTimestampToLocalizedTimestamp(i.minValue),m),i.strictMin){if(-1!==e)return u["fillParameters.error.smallerThan"]}else if(-1!==e&&0!==e)return u["fillParameters.error.smallerOrEqual"];if(i.maxValue)if(e=n.compareTimestamps(n.isoTimestampToLocalizedTimestamp(i.maxValue),m),i.strictMax){if(1!==e)return u["fillParameters.error.greaterThan"]}else if(1!==e&&0!==e)return u["fillParameters.error.greaterOrEqual"]}return null},changeState:function(e){this.isValue?this.set("value",e):(e=t.isArray(e)?e:[e],this.options.each(function(r){r.set("selected",t.contains(e,r.get("value")),{silent:!0})}),this.options.trigger("change:selected"),this.options.trigger("change"));var r=this.validation();return this.set("error",r),r},getData:function(){return this.isValue?[this.get("value")]:this.options.reduce(function(e,r){return r.get("selected")&&e.push(r.get("value")),e},[])}})});