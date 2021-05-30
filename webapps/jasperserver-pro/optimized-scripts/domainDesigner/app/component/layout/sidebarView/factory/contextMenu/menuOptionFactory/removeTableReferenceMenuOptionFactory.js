/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../../../../../dispatcher/enum/applicationStateEventsEnum","../enum/menuOptionsEventsEnum"],function(e,n,t){var i=e("bundle!DomainDesignerBundle"),r=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),s=e("../../../../../../dispatcher/enum/applicationStateEventsEnum"),u=e("../enum/menuOptionsEventsEnum"),a=r.create(i);t.exports={create:function(e){var n=e.isItemJoinAliasOrTableReference;return function(e){return{label:a("domain.designer.joinsDesigner.tree.contextMenu.removeTable"),action:u.REMOVE_TABLE_REFERENCE.event,value:!1,triggerEvent:s.JOINS_DESIGNER_REMOVE_TABLE_REFERENCE,test:function(){var t=e.resource.canDeleteTableReference;return n(e)&&t}}}}}});