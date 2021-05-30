/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,n){var t=e("underscore"),r=function(e){this.initialize(e)};t.extend(r.prototype,{initialize:function(e){this.referenceNotFoundErrorOnDomainSchemaValidationSpecification=e.referenceNotFoundErrorOnDomainSchemaValidationSpecification},isSatisfiedBy:function(e){var i=this;return t.some(e,function(e){return i.referenceNotFoundErrorOnDomainSchemaValidationSpecification.isSatisfiedBy(e)&&i._containsDataSourceAttribute(e.parameters)})},_containsDataSourceAttribute:function(e){return"dataSource"===e[1]}}),n.exports=r});