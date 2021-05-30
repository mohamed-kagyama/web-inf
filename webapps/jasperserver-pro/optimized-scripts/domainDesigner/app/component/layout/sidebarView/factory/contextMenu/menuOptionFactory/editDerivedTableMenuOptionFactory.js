/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../../../../../../model/schema/util/entityUtil","../enum/menuOptionsEventsEnum"],function(e,n,i){var t=e("bundle!DomainDesignerBundle"),r=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),s=e("../../../../../../../model/schema/util/entityUtil"),u=e("../enum/menuOptionsEventsEnum"),d=r.create(t);i.exports={create:function(e){var n=e.isItemJoinAliasOrTableReference;return function(e){return{label:d("domain.designer.derivedTables.editDerivedTables"),action:u.EDIT_DERIVED_TABLE.event,value:!1,triggerEvent:"sidebarTreeMenu:editDerivedTable",test:function(){return s.isDerivedTable(e.resource.type)||n(e)&&e.resource.isDerivedTable}}}}}});