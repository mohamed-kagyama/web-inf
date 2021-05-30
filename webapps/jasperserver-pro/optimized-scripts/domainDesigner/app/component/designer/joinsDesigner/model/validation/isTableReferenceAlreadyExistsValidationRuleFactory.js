/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,i){var a=e("bundle!DomainDesignerBundle"),r=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),t=r.create(a);i.exports={create:function(e){var n=e.domainSchemaSpecification;return{validate:function(e){var i=e.tableReferenceId;if(!n.canRenameTableReference(i,e.value))return t("domain.validation.tableReference.name.exists")}}}}});