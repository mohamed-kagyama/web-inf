/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../../../../../../model/schema/util/entityUtil","../enum/menuOptionsEventsEnum"],function(e,n,t){var i=e("bundle!DomainDesignerBundle"),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),r=e("../../../../../../../model/schema/util/entityUtil"),u=e("../enum/menuOptionsEventsEnum"),o=s.create(i);t.exports={create:function(){return function(e){return{label:o("domain.designer.joinsDesigner.tree.contextMenu.generateJoins"),action:u.GENERATE_JOINS.event,value:!1,triggerEvent:"generate:joins",test:function(){return r.isDataSource(e.resource.type)}}}}}});