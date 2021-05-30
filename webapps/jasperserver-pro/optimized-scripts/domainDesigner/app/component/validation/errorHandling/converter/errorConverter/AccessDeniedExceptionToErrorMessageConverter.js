/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(r,e,o){var t=r("underscore"),s=function(r){this.initialize(r)};t.extend(s.prototype,{initialize:function(r){this.parametersFullErrorToErrorMessageConverter=r.parametersFullErrorToErrorMessageConverter,this.parametersLessErrorToErrorMessageConverter=r.parametersLessErrorToErrorMessageConverter},convert:function(r,e){var o=r.filter(function(r){return Boolean(r.parameters)&&!t.isEmpty(r.parameters)});return o.length>0?this.parametersFullErrorToErrorMessageConverter.convert(o,e):this.parametersLessErrorToErrorMessageConverter.convert([r[0]],e)}}),o.exports=s});