/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,i){var r=e("bundle!DomainDesignerBundle"),a=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),o=a.create(r);i.exports={create:function(e){var n=e.domainSchemaSpecification;return{validate:function(e){var i=e.joinTreeId;if(!n.canUseJoinTreeName(e.value,i))return o("domain.validation.joinTree.name.exists")}}}}});