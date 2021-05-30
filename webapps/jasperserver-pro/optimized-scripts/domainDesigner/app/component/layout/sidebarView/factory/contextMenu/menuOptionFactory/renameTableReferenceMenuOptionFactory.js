/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../enum/menuOptionsEventsEnum"],function(e,n,r){var i=e("bundle!DomainDesignerBundle"),t=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),s=e("../enum/menuOptionsEventsEnum"),u=t.create(i);r.exports={create:function(e){var n=e.isItemJoinAliasOrTableReference;return function(e){return{label:u("domain.designer.joinsDesigner.tree.contextMenu.renameTable"),action:s.RENAME_TABLE_REFERENCE.event,value:!1,triggerEvent:"rename:tableReference",test:function(){return n(e)&&!e.resource.isDerivedTable}}}}}});