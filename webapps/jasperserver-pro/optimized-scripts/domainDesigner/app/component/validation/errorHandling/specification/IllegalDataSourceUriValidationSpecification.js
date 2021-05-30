/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,r){var a=e("underscore"),n=function(e){this.initialize(e)};a.extend(n.prototype,{initialize:function(e){this.illegalParameterValueErrorErrorOnDomainSchemaValidationSpecification=e.illegalParameterValueErrorErrorOnDomainSchemaValidationSpecification},isSatisfiedBy:function(e){return this.illegalParameterValueErrorErrorOnDomainSchemaValidationSpecification.isSatisfiedBy(e)&&"resourceReference.uri"===e.parameters[0]}}),r.exports=n});