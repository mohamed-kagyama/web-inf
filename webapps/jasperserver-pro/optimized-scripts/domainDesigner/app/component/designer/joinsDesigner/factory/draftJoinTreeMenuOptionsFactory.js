/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,i){var s=e("bundle!DomainDesignerBundle"),a=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),o=a.create(s);i.exports={create:function(e){return[{label:o("domain.designer.joinsDesigner.joinTree.contextMenu.rename"),value:!1,joinTree:{name:e.name},action:"renameJoinTree",triggerEvent:"show:renameDraftJoinTreeDialog"},{label:"",value:!1,cssClass:"separator"},{label:o("domain.designer.joinsDesigner.joinTree.contextMenu.useMinimumPathJoins"),value:e.useMinimumPathJoins,joinTree:{useMinimumPathJoins:e.useMinimumPathJoins},action:"toggleUseMinimumPathJoins",triggerEvent:"draftJoinTree:toggle:useMinimumPathJoins"},{label:o("domain.designer.joinsDesigner.joinTree.contextMenu.useAllDataIslandJoins"),value:e.useAllDataIslandJoins,joinTree:{useAllDataIslandJoins:e.useAllDataIslandJoins},action:"toggleUseAllDataIslandJoins",triggerEvent:"draftJoinTree:toggle:useAllDataIslandJoins"}]}}});