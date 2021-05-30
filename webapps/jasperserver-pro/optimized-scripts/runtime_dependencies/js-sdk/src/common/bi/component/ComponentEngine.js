/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","backbone","../error/biComponentErrorFactory","./util/biComponentUtil"],function(e,t,n){function r(e,t,n){return function(r,o,s){var u=new a.Deferred;r&&i.isFunction(r)&&u.done(r),o&&i.isFunction(o)&&u.fail(o),s&&i.isFunction(s)&&u.always(s);try{var p=e.validate();p?u.reject(c.validationError(p)):n(t,u)}catch(e){u.reject(c.javaScriptException(e))}return u}}var i=e("underscore"),a=e("jquery"),o=e("backbone"),c=e("../error/biComponentErrorFactory"),s=e("./util/biComponentUtil"),u=function(e,t){this.instanceData={properties:i.extend({},t),data:null},this.schema=i.isString(e)?JSON.parse(e):e};u.prototype.decorateComponent=function(e,t){s.createInstancePropertiesAndFields(e,this.instanceData,i.keys(this.schema.properties),["properties"],["data"],new o.Model),i.extend(e,{validate:s.createValidateAction(this.instanceData,this.schema),run:r(e,this.instanceData,t)})},n.exports={newInstance:function(e,t){return new u(e,t)}}});