/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,r){var i=e("underscore"),n=function(e){function t(e){return"."===e?e="\\.":" "===e&&(e="\\s"),e}e=e||{},this.DECIMAL_SEPARATOR=e.decimalSeparator||".",this.GROUPING_SEPARATOR=e.groupingSeparator||",",this.decimalSeparator=t(this.DECIMAL_SEPARATOR),this.groupingSeparator=t(this.GROUPING_SEPARATOR),this.DECIMAL_NUMBER_PATTERN=new RegExp("^-?([1-9]{1}[0-9]{0,2}("+this.groupingSeparator+"[0-9]{3})*("+this.decimalSeparator+"[0-9]+)?|[1-9]{1}[0-9]{0,}("+this.decimalSeparator+"[0-9]+)?|0("+this.decimalSeparator+"[0-9]+)?)$"),this.INTEGER_NUMBER_PATTERN=new RegExp("^-?([1-9]{1}[0-9]{0,2}("+this.groupingSeparator+"[0-9]{3})*|[1-9]{1}[0-9]{0,}|0)$")},o=Number.MAX_SAFE_INTEGER?Number.MAX_SAFE_INTEGER+1:9007199254740992,s=Number.MIN_SAFE_INTEGER?Number.MIN_SAFE_INTEGER-1:-9007199254740992;n.prototype.number_format=function(e,t,r,i){e=(e+"").replace(/[^0-9+\-Ee.]/g,"");var n=isFinite(+e)?+e:0,o=isFinite(+t)?Math.abs(t):0,s=void 0===i?",":i,a=void 0===r?".":r,u=(o?function(e,t){var r=Math.pow(10,t);return""+(Math.round(e*r)/r).toFixed(t)}(n,o):""+Math.round(n)).split(".");return u[0].length>3&&(u[0]=u[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,s)),(u[1]||"").length<o&&(u[1]=u[1]||"",u[1]+=new Array(o-u[1].length+1).join("0")),u.join(a)},n.prototype.isInt=function(e){return this.isNumberInt(e)||this.isStringInt(e)},n.prototype.isNumberInt=function(e){return i.isNumber(e)&&!isNaN(e)&&e!==Number.POSITIVE_INFINITY&&e!==Number.NEGATIVE_INFINITY&&(e===+e&&e===(0|e)||e%1==0)},n.prototype.isStringInt=function(e){return i.isString(e)&&this.INTEGER_NUMBER_PATTERN.test(e)},n.prototype.isInt32=function(e){return this.isInt(e)&&this.parseNumber(e)>=-2147483648&&this.parseNumber(e)<=2147483647},n.prototype.isDecimal=function(e){return i.isNumber(e)&&!isNaN(e)&&e!==Number.POSITIVE_INFINITY&&e!==Number.NEGATIVE_INFINITY||i.isString(e)&&this.DECIMAL_NUMBER_PATTERN.test(e)},n.prototype.parseNumber=function(e){if(i.isNumber(e))return e;if(i.isString(e)&&this.DECIMAL_NUMBER_PATTERN.test(e)){e=e.replace(new RegExp(this.groupingSeparator,"g"),"").replace(new RegExp(this.decimalSeparator,"g"),".");var t=1*e;return t>=o||t<=s?(window.console&&window.console.warn(e+" is out of the ["+(s+1)+", "+(o-1)+"] bounds. Parsing results may be corrupted. Use string representation instead. For more details see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number."),!1):t}},n.prototype.formatNumber=function(e,t){t=t||{};var r=e.toString().split(".")[1],n=r?r.length:0;i.isUndefined(t.decimalPlacesAmount)||(n=t.decimalPlacesAmount);try{return this.number_format(e,n,t.decimalSeparator||this.DECIMAL_SEPARATOR,t.groupingSeparator||this.GROUPING_SEPARATOR)}catch(t){return e.toString()}},n.prototype.MaxRange=Number.MAX_SAFE_INTEGER?Number.MAX_SAFE_INTEGER+1:9007199254740992,n.prototype.MinRange=Number.MIN_SAFE_INTEGER?Number.MIN_SAFE_INTEGER-1:-9007199254740992,r.exports=n});