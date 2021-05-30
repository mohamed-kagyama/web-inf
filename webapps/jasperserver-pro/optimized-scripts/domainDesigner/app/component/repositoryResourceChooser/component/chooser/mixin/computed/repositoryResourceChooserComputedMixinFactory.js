/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../util/repositoryResourceChooserDialogUtil"],function(e,o,r){function s(e){return t.some(e,function(e){return e.invalid})}function i(e){var o=e.store;return{computed:{isRepositoryChooserSelectionEmptyInCurrentMode:function(){var e=o.searchResultMode,r=o.repositoryTree.selection,s=o.resourcesList.selection;return n.isRepositoryTreeMode(e)?t.isEmpty(r):n.isResourcesListMode(e)?t.isEmpty(s):void 0},isAnyInvalidRepositoryChooserResourcesInCurrentMode:function(){var e=o.searchResultMode,r=o.repositoryTree.nodes,i=o.resourcesList.nodes;return n.isRepositoryTreeMode(e)?s(r):n.isResourcesListMode(e)?s(i):void 0}}}}var t=e("underscore"),n=e("../../util/repositoryResourceChooserDialogUtil");r.exports={create:i}});