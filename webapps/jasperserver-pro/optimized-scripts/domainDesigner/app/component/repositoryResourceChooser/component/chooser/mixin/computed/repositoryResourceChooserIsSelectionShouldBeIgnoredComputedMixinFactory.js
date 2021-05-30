/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../util/repositoryResourceChooserDialogUtil"],function(e,o,r){function s(e){var o=e.store,r=e.test;return{computed:{isSelectionShouldBeIgnored:function(){var e,s,i=o.searchResultMode,u=o.repositoryTree.selection,n=o.resourcesList.selection,c=o.repositoryTree.nodes,l=o.resourcesList.nodes;return t.isRepositoryTreeMode(i)?(e=u,s=c):t.isResourcesListMode(i)&&(e=n,s=l),!!r&&r(e,s)}}}}var t=e("../../util/repositoryResourceChooserDialogUtil");r.exports={create:s}});