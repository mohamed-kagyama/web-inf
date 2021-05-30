/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","underscore.string"],function(e,t,r){var n=e("underscore"),o=e("underscore.string"),i=function(e){e=e||{},this.type=e.type,this.name=e.name};i.prototype=Object.create({get name(){return this._name},set name(e){if(!n.isString(e))throw new TypeError("'name' should be a string");if(0===e.length)throw new Error("'name' shouldn't be an empty string");var t=o.chars(e);t[0]=t[0].toUpperCase(),this._name=t.join("")},get type(){return this._type},set type(e){if(!n.isString(e))throw new TypeError("'type' should be a string");if(0===e.length)throw new Error("'type' shouldn't be an empty string");if(!Object.keys(i.TYPES).some(function(t){return i.TYPES[t]===e}))throw new Error("'type' should be one of available types");this._type=e},toString:function(){return i.MAIN_PREFIX+"-"+i.TYPE_PEFIXES[this.type]+this.name}}),i.TYPES={MODULE:"module",LAYOUT:"layout",UTIL:"util",STATE:"state",JSHOOK:"jshook"},i.TYPE_PEFIXES={module:"m",layout:"l",state:"is",util:"u",jshook:"j"},i.MAIN_PREFIX="jr",r.exports=i});