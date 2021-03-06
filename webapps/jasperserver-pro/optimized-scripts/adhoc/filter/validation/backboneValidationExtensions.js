/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","underscore","settings!decimalFormatSymbols","runtime_dependencies/js-sdk/src/common/util/parse/NumberUtils","runtime_dependencies/js-sdk/src/common/util/parse/date","runtime_dependencies/js-sdk/src/common/util/parse/time","runtime_dependencies/js-sdk/src/jrs.configs","./ValidationError","./validationMessageCodes","runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension"],function(e,n,r){var i=e("backbone"),t=e("underscore"),a=e("settings!decimalFormatSymbols"),s=e("runtime_dependencies/js-sdk/src/common/util/parse/NumberUtils"),o=e("runtime_dependencies/js-sdk/src/common/util/parse/date"),u=e("runtime_dependencies/js-sdk/src/common/util/parse/time"),l=e("runtime_dependencies/js-sdk/src/jrs.configs"),d=e("./ValidationError"),m=e("./validationMessageCodes");e("runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension");var c=new s(a),A=d.ATTRIBUTE_INDEX_SEPARATOR,N=l.inputControlsConstants&&l.inputControlsConstants.NULL_SUBSTITUTION_VALUE?l.inputControlsConstants.NULL_SUBSTITUTION_VALUE.toLowerCase():"~null~",g=function(e){return!(t.isNull(e)||t.isUndefined(e)||t.isString(e)&&""===e)},I=function(e,n,r,a,s){for(var o,u=[],l=0;l<e.length;l++){o=void 0;for(var d in s)if(o=i.Validation.validators[d](e[l],n+A+(l+1),s[d],a),!t.isUndefined(o))break;u.push(o)}return t.reject(u,function(e){return t.isUndefined(e)})};t.extend(i.Validation.validators,{required:function(e,n,r,i,a){var s=t.isFunction(r)?r.call(i,e,n,a):r;return!(!s&&!g(e))&&(s&&!g(e)?new d(e,n,m.REQUIRED,"required"):void 0)},integer:function(e,n,r,i){if(!c.isInt(e))return new d(e,n,m.INVALID_INTEGER,"integer")},integerRange:function(e,n,r,i){if(!t.isArray(e)||2!==e.length)return new d(e,n,m.INVALID_RANGE,"integerRange");var a=I(e,n,0,i,{required:!0,nullable:!1,integer:!0});return a.length?a:c.parseNumber(e[0])>c.parseNumber(e[1])?new d(e,n,m.START_BIGGER_THAN_END,"integerRange"):void 0},listWithTrueAll:function(e,n,r,i,a){if(!(t.isArray(e)&&e.length>0||!0===a.isAnyValue))return new d(e,n,m.INVALID_TRUE_ALL_LIST,"listWithTrueAll")},list:function(e,n,r,i,a){if(!t.isArray(e))return new d(e,n,m.INVALID_LIST,"list")},decimal:function(e,n,r,i){var t=c.parseNumber(e);return c.isDecimal(e)?t||0===t?void 0:new d(e,n,m.INVALID_NUMBER_RANGE,"decimal"):new d(e,n,m.INVALID_DECIMAL,"decimal")},numberRange:function(e,n,r,i){var t=c.parseNumber(e);if(!t&&0!==t)return new d(e,n,m.INVALID_NUMBER_RANGE,"decimal")},decimalRange:function(e,n,r,i){if(!t.isArray(e)||2!==e.length)return new d(e,n,m.INVALID_RANGE,"decimalRange");var a=I(e,n,0,i,{required:!0,nullable:!1,decimal:!0,numberRange:!0});return a.length?a:c.parseNumber(e[0])>c.parseNumber(e[1])?new d(e,n,m.START_BIGGER_THAN_END,"decimalRange"):void 0},long:function(e,n,r,i){if(!c.isInt(e))return new d(e,n,m.INVALID_LONG,"long")},longRange:function(e,n,r,i){if(!t.isArray(e)||2!==e.length)return new d(e,n,m.INVALID_RANGE,"longRange");var a=I(e,n,0,i,{required:!0,nullable:!1,long:!0});if(a.length)return a;var s=c.parseNumber(e[0]),o=c.parseNumber(e[1]);if(!1!==s&&!1!==o)return s>o?new d(e,n,m.START_BIGGER_THAN_END,"longRange"):void 0},string:function(e,n,r,i){if(!t.isString(e))return new d(e,n,m.INVALID_STRING,"string")},nullable:function(e,n,r,i){return(!0!==r||!t.isString(e)||N!==e.toLowerCase())&&(!1===r&&t.isString(e)&&N===e.toLowerCase()?new d(e,n,m.NOT_NULLABLE,"nullable"):void 0)},stringRange:function(e,n,r,i){if(!t.isArray(e)||2!==e.length)return new d(e,n,m.INVALID_RANGE,"stringRange");var a=I(e,n,0,i,{required:!0,string:!0,nullable:!1});return a.length?a:void 0},date:function(e,n,r,i){if(!o.isDate(e)&&!o.isRelativeDate(e))return new d(e,n,m.INVALID_DATE,"date")},dateRange:function(e,n,r,i){if(!t.isArray(e)||2!==e.length)return new d(e,n,m.INVALID_RANGE,"dateRange");var a=I(e,n,0,i,{required:!0,nullable:!1,date:!0});if(a.length)return a;var s=o.compareDates(e[0],e[1]);return void 0!==s&&s>0?new d(e,n,m.START_DATE_LATER_THAN_FINISH,"dateRange"):void 0},timestamp:function(e,n,r,i){if(!o.isTimestamp(e)&&!o.isRelativeTimestamp(e))return new d(e,n,m.INVALID_TIMESTAMP,"timestamp")},timestampRange:function(e,n,r,i){if(!t.isArray(e)||2!==e.length)return new d(e,n,m.INVALID_RANGE,"timestampRange");var a=I(e,n,0,i,{required:!0,nullable:!1,timestamp:!0});if(a.length)return a;var s=o.compareTimestamps(e[0],e[1]);return void 0!==s&&s>0?new d(e,n,m.START_DATE_LATER_THAN_FINISH,"timestampRange"):void 0},time:function(e,n,r,i){if(!u.isTime(e))return new d(e,n,m.INVALID_TIME,"time")},timeRange:function(e,n,r,i){if(!t.isArray(e)||2!==e.length)return new d(e,n,m.INVALID_RANGE,"timeRange");var a=I(e,n,0,i,{required:!0,nullable:!1,time:!0});if(a.length)return a;var s=u.compareTimes(e[0],e[1]);return void 0!==s&&s>0?new d(e,n,m.START_TIME_LATER_THAN_FINISH,"timeRange"):void 0},boolean:function(e,n,r,i){if(!(t.isBoolean(e)||t.isString(e)&&t.include(["true","false"],e.toLowerCase())))return new d(e,n,m.INVALID_BOOLEAN,"boolean")},blank:function(e,n,r,i){return(!0!==r||"~BLANK~"!==e)&&(!1===r&&"~BLANK~"===e?new d(e,n,m.NOT_BLANK,"blank"):void 0)}}),r.exports=i.Validation});