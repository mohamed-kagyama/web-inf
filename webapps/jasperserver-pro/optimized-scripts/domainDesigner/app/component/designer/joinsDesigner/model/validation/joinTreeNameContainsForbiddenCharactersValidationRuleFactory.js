/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,r){var i=e("bundle!DomainDesignerBundle"),a=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),o=a.create(i);r.exports={create:function(e){var n=e.domainSchemaGranularSpecs;return{validate:function(e){var r=e.value;if(!n.resourceNameShouldNotContainForbiddenCharacters(r))return o("domain.validation.joinTree.name.forbiddenCharacters")}}}}});