/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,i){var o=e("bundle!DomainDesignerBundle"),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),t=s.create(o);i.exports={create:function(e){return[{label:t("domain.designer.joinsDesigner.join.contextMenu.editCustomJoin"),value:!1,action:"showEditConstantJoinExpressionDialog",triggerEvent:"show:editConstantJoinExpressionDialog",constantJoinExpression:e.constantJoinExpression}]}}});