/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,i){var a=e("bundle!DomainDesignerBundle"),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),t=s.create(a);i.exports={create:function(e){var n=e.fieldName,i=e.dataIslandName,a=e.tableReferenceName;return{message:t("domain.designer.joinsDesigner.create.join.attentionDialog.validationMessage"),details:t("domain.designer.joinsDesigner.create.join.attentionDialog.validationMessageDetails",n,a,i)}}}});