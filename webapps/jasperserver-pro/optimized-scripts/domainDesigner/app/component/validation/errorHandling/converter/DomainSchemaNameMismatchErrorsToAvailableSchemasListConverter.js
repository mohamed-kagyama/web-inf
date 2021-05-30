/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/errorParametersKeysEnum","../util/extractPropertyByKeyUtil","underscore"],function(e,r,t){var i=e("../enum/errorParametersKeysEnum"),a=e("../util/extractPropertyByKeyUtil"),n=e("underscore"),o=function(e){this.initialize(e)};n.extend(o.prototype,{initialize:function(e){this.dataSourceSchemaNameMismatchValidationErrorSpecification=e.dataSourceSchemaNameMismatchValidationErrorSpecification},convert:function(e){var r=[],t=n.find(e,function(e){return this.dataSourceSchemaNameMismatchValidationErrorSpecification.isSatisfiedBy(e)},this);return t&&(r=a.extract(t.parameters,i.AVAILABLE_SCHEMA)),n.pluck(r,"value")}}),t.exports=o});