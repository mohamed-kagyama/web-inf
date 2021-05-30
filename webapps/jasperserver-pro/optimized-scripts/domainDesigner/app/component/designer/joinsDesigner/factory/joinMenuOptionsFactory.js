/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,i){var o=e("underscore"),s=e("bundle!DomainDesignerBundle"),r=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),t=r.create(s);i.exports={create:function(e){return o.isUndefined(e.id)?[]:[{label:t("domain.designer.joinsDesigner.join.contextMenu.createCustomJoin"),value:!1,join:e,action:"createConstantJoinExpressionDialog",triggerEvent:"show:createConstantJoinExpressionDialog"}]}}});