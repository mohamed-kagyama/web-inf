/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","runtime_dependencies/js-sdk/src/common/util/classUtil"],function(t,s,e){var i=t("underscore"),n=t("runtime_dependencies/js-sdk/src/common/util/classUtil"),r=n.extend({constructor:function(t,s){i.isFunction(this.defaults)&&(this.defaults=i.partial(this.defaults,s)),t=i.defaults(t||{},i.result(this,"defaults")||{}),this.attributes={},this.set(t)},set:function(t){var s,e;i.isString(arguments[0])?(s=arguments[0],e=arguments[1]):i.isObject(arguments[0])&&(e=arguments[0]),s?this.attributes[s]=e:e&&i.each(e,function(t,s){this.attributes[s]=t},this)},get:function(t){return this.attributes[t]},toJSON:function(){return JSON.parse(JSON.stringify(this.attributes))}});e.exports=r});